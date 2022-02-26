import React, { useState } from 'react';
import { connect } from 'react-redux';
import lockFill from '@iconify/icons-eva/lock-fill';
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

import { useTranslation } from 'react-i18next';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles, withStyles } from '@material-ui/styles';
import Spinner from '../Spinner';

import { getPermissionsRequest, savePermissionsRequest } from '../../actions/permissionsActions';

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

function Permissions(props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const [permissions, setPermissions] = useState({
    isCreateToTeamLeader: false,
    isTeamLeaderOneOnOne: false,
    isTeamLeaderPDS: false,
    isTeamLeaderPIP: false,
    isCreateToColaborator: false,
    isColaboratorOneOnOne: false,
    isColaboratorPDS: false,
    isColaboratorPIP: false
  });

  const handleClose = () => {
    props.handleCloseDialog();
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    if (prop === 'isCreateToTeamLeader') {
      if (event.target.checked) {
        setPermissions({
          ...permissions,
          isCreateToColaborator: false,
          isColaboratorOneOnOne: false,
          isColaboratorPDS: false,
          isColaboratorPIP: false,
          isTeamLeaderOneOnOne: true,

          [prop]:
            permissions.isTeamLeaderOneOnOne ||
            permissions.isTeamLeaderPDS ||
            permissions.isTeamLeaderPIP
              ? true
              : event.target.checked
        });

        return;
      }

      setPermissions({
        ...permissions,
        [prop]:
          permissions.isTeamLeaderOneOnOne ||
          permissions.isTeamLeaderPDS ||
          permissions.isTeamLeaderPIP
            ? true
            : event.target.checked
      });
    }

    if (prop === 'isCreateToColaborator') {
      if (event.target.checked) {
        setPermissions({
          ...permissions,
          isCreateToTeamLeader: false,
          isTeamLeaderOneOnOne: false,
          isTeamLeaderPDS: false,
          isTeamLeaderPIP: false,
          isColaboratorOneOnOne: true,

          [prop]:
            permissions.isColaboratorOneOnOne ||
            permissions.isColaboratorPDS ||
            permissions.isColaboratorPIP
              ? true
              : event.target.checked
        });

        return;
      }

      setPermissions({
        ...permissions,
        [prop]:
          permissions.isColaboratorOneOnOne ||
          permissions.isColaboratorPDS ||
          permissions.isColaboratorPIP
            ? true
            : event.target.checked
      });
    }

    setPermissions({ ...permissions, [prop]: event.target.checked });
  };

  const handleClickOpen = async () => {
    setOpen(true);

    if (!props.permissions) {
      getPermissionsRequest();
    } else {
      setPermissions({
        isCreateToTeamLeader: props.permissions ? props.permissions.isCreateToTeamLeader : false,
        isTeamLeaderOneOnOne: props.permissions ? props.permissions.isTeamLeaderOneOnOne : false,
        isTeamLeaderPDS: props.permissions ? props.permissions.isTeamLeaderPDS : false,
        isTeamLeaderPIP: props.permissions ? props.permissions.isTeamLeaderPIP : false,
        isCreateToColaborator: props.permissions ? props.permissions.isCreateToColaborator : false,
        isColaboratorOneOnOne: props.permissions ? props.permissions.isColaboratorOneOnOne : false,
        isColaboratorPDS: props.permissions ? props.permissions.isColaboratorPDS : false,
        isColaboratorPIP: props.permissions ? props.permissions.isColaboratorPIP : false
      });
    }
  };

  // savePermissionsRequest

  const getPermissionsRequest = async () => {
    let status;
    await props.getPermissionsRequest().then((r) => (status = r));
    if (status.status && status.status === 'SUCCESS') {
      setPermissions({
        isCreateToTeamLeader: status.permissions ? status.permissions.isCreateToTeamLeader : false,
        isTeamLeaderOneOnOne: status.permissions ? status.permissions.isTeamLeaderOneOnOne : false,
        isTeamLeaderPDS: status.permissions ? status.permissions.isTeamLeaderPDS : false,
        isTeamLeaderPIP: status.permissions ? status.permissions.isTeamLeaderPIP : false,
        isCreateToColaborator: status.permissions
          ? status.permissions.isCreateToColaborator
          : false,
        isColaboratorOneOnOne: status.permissions
          ? status.permissions.isColaboratorOneOnOne
          : false,
        isColaboratorPDS: status.permissions ? status.permissions.isColaboratorPDS : false,
        isColaboratorPIP: status.permissions ? status.permissions.isColaboratorPIP : false
      });
      return;
    }

    if (status.error) {
      toastr.error(
        t('message-error-getting-permissions', 'Ha ocurrido un error obteniendo los permisos')
      );
    }
  };

  const onFormSubmit = async () => {
    const json = {
      isCreateToTeamLeader: permissions.isCreateToTeamLeader,
      isTeamLeaderOneOnOne: permissions.isTeamLeaderOneOnOne,
      isTeamLeaderPDS: permissions.isTeamLeaderPDS,
      isTeamLeaderPIP: permissions.isTeamLeaderPIP,
      isCreateToColaborator: permissions.isCreateToColaborator,
      isColaboratorOneOnOne: permissions.isColaboratorOneOnOne,
      isColaboratorPDS: permissions.isColaboratorPDS,
      isColaboratorPIP: permissions.isColaboratorPIP
    };
    let status;

    await props.savePermissionsRequest(json).then((r) => (status = r));

    if (status === 'ERROR') {
      toastr.error(
        t('message-error-saving-permissions', 'Ha ocurrido un error guardando los permisos')
      );
    } else {
      toastr.success(
        t('message-success-saving-permissions', 'Permisos guardados satisfactoriamente')
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
          icon={lockFill}
          sx={{
            mr: 2,
            width: 24,
            height: 24
          }}
        />{' '}
        {t('permissions', 'Permisos')}
      </div>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('permissions', 'Permisos')}
        </DialogTitle>
        <DialogContent dividers>
          {props.permissions_charging && (
            <div className="div-spinner-modal">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                  <Spinner />
                </Grid>
              </Container>
            </div>
          )}

          {!props.permissions_charging && (
            <>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isCreateToTeamLeader}
                        onChange={handleChange('isCreateToTeamLeader')}
                        name="isCreateToTeamLeader"
                      />
                    }
                    label={t('create-to-team-leader', 'Crear para el líder de equipo')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isCreateToColaborator}
                        onChange={handleChange('isCreateToColaborator')}
                        name="isCreateToColaborator"
                      />
                    }
                    label={t('create-to-collaborator', 'Crear para el colaborador')}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isTeamLeaderOneOnOne}
                        onChange={handleChange('isTeamLeaderOneOnOne')}
                        name="isTeamLeaderOneOnOne"
                      />
                    }
                    label={t(
                      'create-to-team-leader-one-to-one',
                      'Crear para el líder de equipo OneonOne'
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isTeamLeaderPDS}
                        onChange={handleChange('isTeamLeaderPDS')}
                        name="isTeamLeaderPDS"
                      />
                    }
                    label={t('create-to-team-leader-pds', 'Crear para el líder de equipo PDS')}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isTeamLeaderPIP}
                        onChange={handleChange('isTeamLeaderPIP')}
                        name="isTeamLeaderPIP"
                      />
                    }
                    label={t('create-to-team-leader-pip', 'Crear para el líder de equipo PIP')}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isColaboratorOneOnOne}
                        onChange={handleChange('isColaboratorOneOnOne')}
                        name="isColaboratorOneOnOne"
                      />
                    }
                    label={t(
                      'create-to-collaborator-one-to-one',
                      'Crear para el colaborador OneonOne'
                    )}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isColaboratorPDS}
                        onChange={handleChange('isColaboratorPDS')}
                        name="isColaboratorPDS"
                      />
                    }
                    label={t('create-to-collaborator-pds', 'Crear para el colaborador pds')}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions.isColaboratorPIP}
                        onChange={handleChange('isColaboratorPIP')}
                        name="isColaboratorPIP"
                      />
                    }
                    label={t('create-to-collaborator-pip', 'Crear para el colaborador pip')}
                  />
                </FormGroup>
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

const mapStateToProps = ({ permissionsReducer }) => permissionsReducer;

const mapDispatchToProps = {
  getPermissionsRequest,
  savePermissionsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
