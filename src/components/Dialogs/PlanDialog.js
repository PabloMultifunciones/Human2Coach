import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

import { updatePlanRequest } from '../../actions/plansActions';
import 'toastr/build/toastr.min.css';

/** *****Services******* */

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}{' '}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon className="color-white" />
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

function PlanDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [{ date }, setState] = useState({
    date: format(new Date(props.plan.reminderDate), 'yyyy-MM-dd')
  });

  const handleChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (date === '' || !date) {
      toastr.error(t('commitment-date-required', 'La fecha es requerida'));
      return;
    }

    let status;

    await props
      .updatePlanRequest({
        id: props.plan.id,
        reminderDate: `${date}T00:00:00`
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error(t('plans-error-saved', 'Se produjo un error al intentar guardar el plan'));
    } else {
      toastr.success(t('plans-successfully', 'Plan guardado con éxito'));
      handleClose();
    }
  };

  /** *********Data Binding Form******* */

  return (
    <>
      <Tooltip title="Edit engagement date">
        <EditIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className="custom-bg-FA0050 color-white"
        >
          {t('plan', 'Plan')}
        </DialogTitle>

        {props.plans_save_charging ? (
          <Spinner />
        ) : (
          <>
            <DialogContent dividers>
              <Container maxWidth="lg">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      className="w-100"
                      fullWidth
                      id="outlined-date"
                      label={t('commitment-date', 'Fecha de compromiso')}
                      type="date"
                      value={date}
                      variant="outlined"
                      name="date"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                {t('menu.trivia-panel-dialog-add-test-button-close', 'Close')}
              </Button>

              <Button onClick={handleSave} color="primary">
                {t('admin.header-dropdown-dialog-actions-save', 'Save')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ plansReducer }) => plansReducer;

const mapDispatchToProps = {
  updatePlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanDialog);
