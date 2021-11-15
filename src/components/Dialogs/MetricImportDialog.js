import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import toastr from 'toastr';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { savePreImportMetricRequest } from '../../actions/metricsActions';
import Spinner from '../Spinner';
import { useFormatArray } from '../../hooks/useFormatArray';

import 'toastr/build/toastr.min.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginTop: '1rem'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  textField: {
    width: '50ch',
    marginBottom: '5px'
  }
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}{' '}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function MetricImportDialog(props) {
  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const [arrayColumnsFormatted, fileCode, firstRow, prevew] = useFormatArray(props.metricImports);
  const [arrayVariables, setArrayVariables] = useState([]);

  const handleClose = () => {
    setOpen(false);
    props.backViewAndReload();
  };

  function handleChangeSelect(e, index) {
    const vals = arrayVariables;
    const contain = e.target.value.includes('NOIMPORT');

    if (contain) {
      vals[index] = null;
      setArrayVariables(vals);
    } else {
      vals[index] = e.target.value;
      setArrayVariables(vals);
    }
  }

  async function onFormSubmit() {
    /** ****Verify array*** */
    let columnsEmpty = false;
    arrayVariables.forEach((variable) => {
      if (variable === '') {
        columnsEmpty = true;
      }
    });

    if (columnsEmpty) {
      toastr.error(
        t(
          'menu.metric-panel-dialog-message-error-variable-type',
          'All columns must have their variable type, check on try again'
        )
      );
      return;
    }

    let status;
    await props
      .savePreImportMetricRequest({
        columns: arrayVariables,
        fileCode,
        firstRow
      })
      .then((r) => (status = r));

    if (status === 'SUCCESS') {
      toastr.success(
        t(
          'menu.metric-panel-dialog-message-success-save',
          'The metrics are being imported, when it is ready we will notify you. Thanks'
        )
      );
      handleClose();
      props.backViewAndReload();
      return;
    }

    if (status.error && status.error.status === 422) {
      toastr.error(status.data.message);
    } else {
      toastr.error(
        t('menu.metric-panel-dialog-message-error-save', 'Happened while importing metrics')
      );
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('menu.metric-panel-dialog-title', 'Metric management')}
        </DialogTitle>

        {props.metrics_import_charging && <Spinner />}

        {!props.metrics_import_charging && (
          <>
            <DialogContent dividers>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} lg={12}>
                    {prevew.map((prevew, index) => (
                      <FormControl variant="outlined" className={classes.formControl} key={index}>
                        <InputLabel id="team-select-outlined-label">
                          {`${
                            prevew[0]
                              ? prevew[0]
                              : t('menu.metric-panel-dialog-import-without-title', 'Without title')
                          }`}
                        </InputLabel>
                        <Select
                          labelId={`Columna ${index + 1}`}
                          MenuProps={MenuProps}
                          label={`${
                            prevew[0]
                              ? prevew[0]
                              : t('menu.metric-panel-dialog-import-without-title', 'Without title')
                          }`}
                          onChange={(e) => handleChangeSelect(e, index)}
                          defaultValue={[]}
                          multiple
                          fullWidth
                        >
                          <MenuItem value="NOIMPORT">
                            {t('menu.metric-panel-dialog-import-do-not-import', 'Do not import')}
                          </MenuItem>
                          {arrayColumnsFormatted.map((column, index) => (
                            <MenuItem key={index} value={column}>
                              {column.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {prevew[1] && `${t('values.label', 'Values')} `}
                          {prevew[1] ? `${prevew[1]} ` : ''}
                          {prevew[2] ? `','${prevew[2]} ' '` : ''}
                          {prevew[3] ? prevew[3] : ''}
                        </FormHelperText>
                      </FormControl>
                    ))}
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>

            <DialogActions>
              <Button autoFocus onClick={handleClose} color="secondary">
                {t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
              </Button>

              <Button autoFocus onClick={onFormSubmit} color="primary">
                {t('admin.header-dropdown-dialog-actions-save', 'Save')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ metricsReducer }) => metricsReducer;

const mapDispatchToProps = {
  savePreImportMetricRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricImportDialog);
