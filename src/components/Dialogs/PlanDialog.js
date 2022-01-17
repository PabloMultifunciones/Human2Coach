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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import LetterCounter from '../Globals/LetterCounter';

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

const findByIndex = (exceptions, name) => {
  const findByName = (exception) => exception.name === name;
  const index = exceptions.findIndex(findByName);

  if (index === -1) {
    return false;
  }

  return index;
};

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

  const [{ commitmentDate, sick, vacations, disciplinaryProcess, others }, setState] = useState({
    commitmentDate: format(new Date(props.plan.commitmentDate), 'yyyy-MM-dd'),
    sick: findByIndex(props.plan.exceptions, 'Sick leave')
      ? props.plan.exceptions[findByIndex(props.plan.exceptions, 'Sick leave')].isChecked
      : false,
    vacations: findByIndex(props.plan.exceptions, 'Vacations')
      ? props.plan.exceptions[findByIndex(props.plan.exceptions, 'Vacations')].isChecked
      : false,
    disciplinaryProcess: findByIndex(props.plan.exceptions, 'Disciplinary process')
      ? props.plan.exceptions[findByIndex(props.plan.exceptions, 'Disciplinary process')].isChecked
      : false,

    others: props.plan.others ? props.plan.others : ''
  });

  const handleChange = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleChangeCheckbox = (event) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.checked }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (commitmentDate === '' || !commitmentDate) {
      toastr.error(t('commitment-date-required', 'La fecha es requerida'));
      return;
    }

    let status;

    await props
      .updatePlanRequest({
        id: props.plan.id,
        others,
        reminderDate: `${commitmentDate}T00:00:00`,
        isException: sick === true || vacations === true || disciplinaryProcess === true,
        exceptions: [
          {
            name: 'Sick leave',
            isChecked: sick
          },
          {
            name: 'Vacations',
            isChecked: vacations
          },
          {
            name: 'Disciplinary process',
            isChecked: disciplinaryProcess
          }
        ]
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
                      id="outlined-commitmentDate"
                      label={t('commitment-date', 'Fecha de compromiso')}
                      type="date"
                      value={commitmentDate}
                      variant="outlined"
                      name="commitmentDate"
                      onChange={handleChange}
                      inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="sick"
                          checked={sick}
                          onChange={handleChangeCheckbox}
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label={t('sick-leave', 'Baja por enfermedad')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="vacations"
                          checked={vacations}
                          onChange={handleChangeCheckbox}
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label={t('vacations', 'Vacaciones')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="disciplinaryProcess"
                          checked={disciplinaryProcess}
                          onChange={handleChangeCheckbox}
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label={t('disciplinary-process', 'Proceso Disciplinario')}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      className="w-100"
                      id="outlined-multiline-static"
                      label={t('menu.badge-panel-dialog-delivery-comments', 'Comentarios')}
                      multiline
                      rows={8}
                      variant="outlined"
                      value={others}
                      name="others"
                      inputProps={{ maxLength: 255 }}
                      onChange={(event) => {
                        handleChange(event, event.target.value);
                      }}
                    />

                    <LetterCounter letters={others} />
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
