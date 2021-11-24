import React, { useState } from 'react';
import { connect } from 'react-redux';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Box } from '@material-ui/core';
import { Icon } from '@iconify/react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import toastr from 'toastr';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation } from 'react-i18next';

import { makeStyles, withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Spinner from '../Spinner';

import { getPreferencesRequest, savePreferencesRequest } from '../../actions/preferencesActions';

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
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  formControl: {
    width: '100%',
    marginTop: '1rem'
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}
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

function MetricPreference(props) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [langError, setLangError] = useState(false);
  const [isEmailNotificationEnabledError, setIsEmailNotificationEnabledError] = useState(false);

  const [values, setValues] = useState({
    lang: 'es',
    isEmailNotificationEnabled: true
  });

  const handleClose = () => {
    props.handleCloseDialog();
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = async () => {
    setOpen(true);

    if (!props.preferences) {
      getPreferencesRequest();
    } else {
      setValues({
        lang: props.preferences.lang ? props.preferences.lang : 'es',
        isEmailNotificationEnabled: props.preferences.isEmailNotificationEnabled
          ? props.preferences.isEmailNotificationEnabled
          : false
      });
    }
  };

  const getPreferencesRequest = async () => {
    let status;
    await props.getPreferencesRequest().then((r) => (status = r));
    if (status.status && status.status === 'SUCCESS') {
      setValues({
        lang: status.preferences.lang ? status.preferences.lang : 'es',
        isEmailNotificationEnabled: status.preferences.isEmailNotificationEnabled
          ? status.preferences.isEmailNotificationEnabled
          : false
      });
      return;
    }

    if (status.error) {
      toastr.error(
        t(
          'admin.user-panel-message-error-save-import',
          'It has happened when integrating the information'
        )
      );
    }
  };

  const onFormSubmit = async () => {
    setLangError(false);
    setIsEmailNotificationEnabledError(false);

    if (values.lang === '') {
      setLangError(true);
      toastr.error(t('admin.header-dropdown-dialog-lang-message', 'The language is required'));
      return;
    }

    if (!props.type) {
      if (values.isEmailNotificationEnabled === '') {
        setIsEmailNotificationEnabledError(true);
        toastr.error(
          t('admin.header-dropdown-dialog-notification-message', 'The notification is required')
        );
        return;
      }
    }

    let json;
    let status;

    if (!props.type) {
      json = {
        lang: values.lang,
        isEmailNotificationEnabled: values.isEmailNotificationEnabled
      };
    } else {
      json = {
        lang: values.lang
      };
    }

    await props.savePreferencesRequest(json).then((r) => (status = r));

    if (status === 'ERROR') {
      toastr.error(
        t(
          'admin.header-dropdown-dialog-preference-error',
          'An error occurred while trying to save the preferences'
        )
      );
    } else {
      i18n.changeLanguage(status.preferences.lang ? status.preferences.lang : 'es');
      toastr.success(
        t('admin.header-dropdown-dialog-preference-success', 'Preferences saved successfully')
      );
      handleClose();
    }
  };

  return (
    <div>
      <div
        onClick={handleClickOpen}
        onKeyDown={() => {}}
        role="presentation"
        className="margin-custom-popover d-flex"
      >
        <Box
          component={Icon}
          icon={settings2Fill}
          sx={{
            mr: 2,
            width: 24,
            height: 24
          }}
        />{' '}
        {t('admin.header-dropdown-dialog-preference-title', 'Preferences')}
      </div>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('admin.header-dropdown-dialog-preference-title', 'Preferences')}
        </DialogTitle>
        <DialogContent dividers>
          {props.preferences_charging && (
            <div className="div-spinner-modal">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                  <Spinner />
                </Grid>
              </Container>
            </div>
          )}

          {!props.preferences_charging && (
            <>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="lang-select-outlined-label">
                  {t('admin.header-dropdown-dialog-lang-input', 'Language')}
                </InputLabel>
                <Select
                  labelId="group-mutiple-name-label"
                  error={langError}
                  id="lang"
                  name="lang"
                  label={t('admin.header-dropdown-dialog-lang-input', 'Language')}
                  value={values.lang}
                  onChange={handleChange('lang')}
                >
                  <MenuItem value="es">
                    {t('admin.header-dropdown-dialog-lang-input-item-spanish', 'Spanish')}
                  </MenuItem>
                  <MenuItem value="en">
                    {t('admin.header-dropdown-dialog-lang-input-item-english', 'English')}
                  </MenuItem>

                  <MenuItem value="po">
                    {t('admin.header-dropdown-dialog-lang-input-item-portuguese', 'Portuguese')}
                  </MenuItem>

                  <MenuItem value="fr">
                    {t('admin.header-dropdown-dialog-lang-input-item-french', 'French')}
                  </MenuItem>

                  <MenuItem value="it">
                    {t('admin.header-dropdown-dialog-lang-input-item-italian', 'Italian')}
                  </MenuItem>
                </Select>
              </FormControl>

              {!props.type && (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="isEmailNotificationEnabled-select-outlined-label">
                    {t('admin.header-dropdown-dialog-notifications-input', 'Enable notifications')}
                  </InputLabel>
                  <Select
                    labelId="group-mutiple-name-label"
                    error={isEmailNotificationEnabledError}
                    id="isEmailNotificationEnabled"
                    name="isEmailNotificationEnabled"
                    label={t(
                      'admin.header-dropdown-dialog-notifications-input',
                      'Enable notifications'
                    )}
                    value={values.isEmailNotificationEnabled}
                    onChange={handleChange('isEmailNotificationEnabled')}
                  >
                    <MenuItem value>
                      {t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')}
                    </MenuItem>
                    <MenuItem value={false}>
                      {t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            {t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
          </Button>
          <Button autoFocus color="primary" onClick={onFormSubmit}>
            {t('admin.header-dropdown-dialog-actions-save', 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = ({ preferencesReducer }) => preferencesReducer;

const mapDispatchToProps = {
  getPreferencesRequest,
  savePreferencesRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricPreference);
