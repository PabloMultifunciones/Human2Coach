import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui//styles';
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
import lockFill from '@iconify/icons-eva/lock-fill';
import { Box } from '@material-ui/core';
import { Icon } from '@iconify/react';

import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTranslation } from 'react-i18next';
import Spinner from '../Spinner';

import GeneralService from '../../Services/GeneralService';

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
  textField: {
    width: '100%'
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

export default function MetricPassword(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    passwordRepeat: '',
    showPasswordRepeat: false
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.handleCloseDialog();
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordRepeat = () => {
    setValues({ ...values, showPasswordRepeat: !values.showPasswordRepeat });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onFormSubmit = () => {
    setPasswordError(false);
    setPasswordRepeat(false);

    if (values.password === '') {
      setPasswordError(true);
      toastr.error(t('admin.header-dropdown-dialog-password-message', 'The password is required'));
      return;
    }

    if (values.passwordRepeat === '') {
      setPasswordRepeat(true);
      toastr.error(t('admin.header-dropdown-dialog-repeat-password-message', 'Must repeat key'));
      return;
    }

    if (values.password !== values.passwordRepeat) {
      setPasswordError(true);
      toastr.error(
        t('admin.header-dropdown-dialog-passwords-equals-message', 'Keys must be the same')
      );
      return;
    }

    setLoading(true);
    const json = { value: btoa(values.password) };
    GeneralService.savePassword({ ...json })
      .then(() => {
        toastr.success(t('admin.header-dropdown-dialog-success', 'Password changed successfully'));
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        toastr.error(
          t('admin.header-dropdown-dialog-error', 'An error occurred while trying to save the key')
        );
        setLoading(false);
      });
  };

  return (
    <div>
      <p
        onClick={handleClickOpen}
        onKeyDown={() => {}}
        role="presentation"
        className="margin-custom-popover d-flex"
      >
        <Box
          component={Icon}
          icon={lockFill}
          sx={{
            mr: 2,
            width: 24,
            height: 24
          }}
        />{' '}
        {t('admin.header-dropdown-dialog-password-title', 'Change password')}
      </p>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('admin.header-dropdown-dialog-password-title', 'Change password')}
        </DialogTitle>
        <DialogContent dividers>
          {loading && (
            <div className="div-spinner-modal">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                  <Spinner />
                </Grid>
              </Container>
            </div>
          )}

          {!loading && (
            <>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('admin.header-dropdown-dialog-password-input', 'Password')}
                </InputLabel>
                <OutlinedInput
                  error={passwordError}
                  label={t('admin.header-dropdown-dialog-password-input', 'Password')}
                  id="outlined-adornment-password"
                  autoComplete="new-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('admin.header-dropdown-dialog-repeat-password-input', 'Repeat password')}
                </InputLabel>
                <OutlinedInput
                  error={passwordRepeatError}
                  label={t('admin.header-dropdown-dialog-repeat-password-input', 'Repeat password')}
                  id="outlined-adornment-repeat-password"
                  type={values.showPasswordRepeat ? 'text' : 'password'}
                  value={values.passwordRepeat}
                  onChange={handleChange('passwordRepeat')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordRepeat}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
