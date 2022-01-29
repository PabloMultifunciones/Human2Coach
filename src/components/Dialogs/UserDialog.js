import React, { useState } from 'react';
import toastr from 'toastr';

import { connect } from 'react-redux';
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
import FormControl from '@material-ui/core/FormControl';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {
  teamsRequest,
  usersManagersRequest,
  usersLeadersRequest
} from '../../actions/generalActions';
import { updateUserRequest, saveUserRequest } from '../../actions/usersActions';

import Spinner from '../Spinner';
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

function UserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [roleError, setRoleError] = useState(false);
  const [isActiveError, setIsActiveError] = useState(false);

  const [{ id, username, name, email, team, userManager, userLeader, role, isActive }, setState] =
    useState({
      id: props.id ? props.id : null,
      username: props.username ? props.username : '',
      name: props.name ? props.name : '',
      email: props.email ? props.email : '',
      team: props.team ? props.team.id : '',
      userManager: props.teamManager ? props.teamManager.id : '',

      userLeader: props.teamLeader ? props.teamLeader.id : '',
      role: props.role ? props.role : '1',
      isActive: props.isActive || false
    });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleClickOpen = () => {
    setOpen(true);
    if (!props.generalReducer.teams) {
      props.teamsRequest();
    }

    if (!props.generalReducer.usersManagers) {
      props.usersManagersRequest();
    }

    if (!props.generalReducer.usersLeaders) {
      props.usersLeadersRequest();
    }
    setOriginalState();
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function onFormSubmit() {
    setUsernameError(false);
    setNameError(false);
    setTeamError(false);
    setUserError(false);

    setRoleError(false);
    setIsActiveError(false);

    if (username === '') {
      setUsernameError(true);
      toastr.error(
        t('admin.user-panel-user-dialog-username-input-error', '"El nombre de usuario es requerido')
      );
      return;
    }

    if (name === '') {
      setNameError(true);
      toastr.error(
        t('menu.trivia-panel-dialog-add-test-message-error-name', 'El nombre es requerido')
      );
      return;
    }

    if (team === '') {
      setTeamError(true);
      toastr.error(
        t('admin.user-panel-user-dialog-message-select-group', 'Debes seleccionar un grupo')
      );
      return;
    }

    if (role === '' || role.length === 0) {
      setRoleError(true);
      toastr.error(t('admin.user-panel-user-dialog-role-input-error', 'El rol es requerido'));
      return;
    }

    if (role === 2) {
      if (userManager === '') {
        setUserError(true);
        toastr.error(
          t('menu.badge-panel-dialog-delivery-message-error-user', 'Debe seleccionar un usuario')
        );
        return;
      }
    }

    if (role === 2) {
      if (userManager === '') {
        setUserError(true);
        toastr.error(
          t('menu.badge-panel-dialog-delivery-message-error-user', 'Debe seleccionar un usuario')
        );
        return;
      }
      if (userLeader === '') {
        setUserError(true);
        toastr.error(
          t('menu.badge-panel-dialog-delivery-message-error-user', 'Debe seleccionar un usuario')
        );
        return;
      }
    }

    let status;

    if (id) {
      await props
        .updateUserRequest({
          id,
          name,
          email,
          username,
          team: { id: team },
          role,
          position: role,
          teamManager:
            role === 2 || role === 3 ? (userManager !== '' ? { id: userManager } : null) : null,
          teamLeader: role === 3 ? (userLeader !== '' ? { id: userLeader } : null) : null,
          isActive
        })
        .then((r) => (status = r));
    } else {
      await props
        .saveUserRequest({
          name,
          email,
          username,
          team: { id: team },
          role,
          position: role,
          teamManager:
            role === 2 || role === 3 ? (userManager !== '' ? { id: userManager } : null) : null,
          teamLeader: role === 3 ? (userLeader !== '' ? { id: userLeader } : null) : null,
          isActive
        })
        .then((r) => (status = r));
    }

    if (status.status === 'SUCCESS') {
      toastr.success(
        t('admin.user-panel-user-dialog-message-success-user-save', 'Usuario guardado con éxito')
      );
      handleClose();
      return;
    }

    if (status.error && status.error.status === 422) {
      toastr.error(t('user-name-exists', 'Un usuario con este nombre de usuario ya existe'));
    } else {
      toastr.error(
        t(
          'admin.user-panel-user-dialog-message-error-user-save',
          'Ha ocurrido un error al intentar guardar el usuario'
        )
      );
    }
  }

  function setOriginalState() {
    setState((prevState) => ({
      ...prevState,
      id: props.id ? props.id : null,
      username: props.username ? props.username : '',
      name: props.name ? props.name : '',
      email: props.email ? props.email : '',
      team: props.team ? props.team.id : '',
      role: props.role ? props.role : '',
      isActive: props.isActive || false
    }));
  }

  /** *********Data Binding Form******* */

  return (
    <>
      {props.type === 'EDIT' ? (
        <Tooltip title={t('edit-user', 'Editar usuario')}>
          <EditIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
        </Tooltip>
      ) : (
        <Button
          color="error"
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<Icon icon={plusFill} />}
        >
          {t('new-user', 'Nuevo usuario')}
        </Button>
      )}

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
          {t('user.label', 'Usuario')}
        </DialogTitle>
        <>
          <form>
            <DialogContent dividers>
              {props.generalReducer.teams_charging ||
              props.generalReducer.users_charging ||
              props.usersReducer.users_save_charging ? (
                <Spinner />
              ) : (
                props.type !== 'BOOLEAN' && (
                  <>
                    <Container maxWidth="lg">
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <TextField
                            fullWidth
                            id="outlined-username"
                            variant="outlined"
                            label={t(
                              'admin.user-panel-user-dialog-input-username',
                              'Nombre de usuario'
                            )}
                            name="username"
                            value={username}
                            error={usernameError}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <TextField
                            fullWidth
                            id="outlined-name"
                            variant="outlined"
                            label={t('admin.user-panel-user-dialog-input-name', 'Nombre')}
                            name="name"
                            value={name}
                            error={nameError}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <TextField
                            fullWidth
                            id="outlined-email"
                            variant="outlined"
                            label={t('email.label', 'Correo')}
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />
                        </Grid>
                        {props.generalReducer.teams && (
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl variant="outlined" className="w-100">
                              <InputLabel id="frequency-select-outlined-label">
                                {t('team.label', 'Equipo')}
                              </InputLabel>
                              <Select
                                labelId="team"
                                id="team"
                                name="team"
                                value={team}
                                error={teamError}
                                label={t('team.label', 'Equipo')}
                                fullWidth
                                onChange={handleChange}
                              >
                                <MenuItem value="">{t('choose-team', 'Choose a team')}</MenuItem>

                                {props.generalReducer.teams.content.map((team) => (
                                  <MenuItem key={team.id} value={team.id}>
                                    {team.name
                                      ? team.name
                                      : t(
                                          'admin.user-panel-user-dialog-input-select-without-name',
                                          'Without name'
                                        )}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <FormControl variant="outlined" className="w-100">
                            <InputLabel id="frequency-select-outlined-label">
                              {t('admin.header-dropdown-view-conditions-table-role', 'Rol')}
                            </InputLabel>
                            <Select
                              labelId="role"
                              id="role"
                              name="role"
                              value={role}
                              error={roleError}
                              label="Rol"
                              fullWidth
                              onChange={handleChange}
                            >
                              <MenuItem value={3}>{t('collaborator', 'Colaborador')}</MenuItem>
                              <MenuItem value={2}>{t('team-leader', 'Lider del equipo')} </MenuItem>
                              <MenuItem value={1}>
                                {t('team-manager', 'Gerente del equipo')}{' '}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {role && role !== 1 && (
                          <>
                            {props.generalReducer.usersManagers && role === 2 && (
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl variant="outlined" className="w-100">
                                  <InputLabel id="frequency-select-outlined-label">
                                    {t('team-manager', 'Gerente del equipo')}
                                  </InputLabel>
                                  <Select
                                    labelId="userManager"
                                    id="userManager"
                                    name="userManager"
                                    value={userManager}
                                    error={userError}
                                    label={t('team-manager', 'Gerente del equipo')}
                                    fullWidth
                                    onChange={handleChange}
                                  >
                                    <MenuItem value="">
                                      {t('choose', 'Elije un ')}{' '}
                                      {t('team-manager', 'Gerente del equipo')}
                                    </MenuItem>

                                    {props.generalReducer.usersManagers.content.map((user) => (
                                      <MenuItem key={user.id} value={parseInt(user.id, 10)}>
                                        {user.name
                                          ? `${user.name} ${user.lastName}`
                                          : t(
                                              'admin.user-panel-user-dialog-input-select-without-name',
                                              'Without name'
                                            )}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            )}

                            {props.generalReducer.usersManagers &&
                              props.generalReducer.usersLeaders &&
                              role === 3 && (
                                <>
                                  <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl variant="outlined" className="w-100">
                                      <InputLabel id="frequency-select-outlined-label">
                                        {t('team-manager', 'Gerente del equipo')}
                                      </InputLabel>
                                      <Select
                                        labelId="userManager"
                                        id="userManager"
                                        name="userManager"
                                        value={userManager}
                                        error={userError}
                                        label={t('team-manager', 'Gerente del equipo')}
                                        fullWidth
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          {t('choose', 'Elije un ')}{' '}
                                          {t('team-manager', 'Gerente del equipo')}
                                        </MenuItem>

                                        {props.generalReducer.usersManagers.content.map((user) => (
                                          <MenuItem key={user.id} value={parseInt(user.id, 10)}>
                                            {user.name
                                              ? `${user.name} ${user.lastName}`
                                              : t(
                                                  'admin.user-panel-user-dialog-input-select-without-name',
                                                  'Without name'
                                                )}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>

                                  <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl variant="outlined" className="w-100">
                                      <InputLabel id="frequency-select-outlined-label">
                                        {t('team-leader', 'Lider del equipo')}
                                      </InputLabel>
                                      <Select
                                        labelId="userLeader"
                                        id="userLeader"
                                        name="userLeader"
                                        value={userLeader}
                                        error={userError}
                                        label={t('team-leader', 'Lider del equipo')}
                                        fullWidth
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          {t('choose', 'Elije un ')}{' '}
                                          {t('team-leader', 'Lider del equipo')}
                                        </MenuItem>

                                        {props.generalReducer.usersLeaders.content.map((user) => (
                                          <MenuItem key={user.id} value={parseInt(user.id, 10)}>
                                            {user.name
                                              ? `${user.name} ${user.lastName}`
                                              : t(
                                                  'admin.user-panel-user-dialog-input-select-without-name',
                                                  'Without name'
                                                )}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </>
                              )}
                          </>
                        )}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <FormControl variant="outlined" className="w-100">
                            <InputLabel id="frequency-select-outlined-label">
                              {t('status.label', 'Estado')}
                            </InputLabel>
                            <Select
                              labelId="isActive"
                              id="isActive"
                              name="isActive"
                              value={isActive}
                              error={isActiveError}
                              label={t('status.label', 'Estado')}
                              defaultValue
                              fullWidth
                              onChange={handleChange}
                            >
                              <MenuItem value>
                                {t(
                                  'admin.header-dropdown-view-conditions-table-active-state',
                                  'Activo'
                                )}
                              </MenuItem>
                              <MenuItem value={false}>
                                {t('menu.trivia-panel-table-inactive', 'Inactivo')}{' '}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Container>
                  </>
                )
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                {t('menu.trivia-panel-dialog-add-test-button-close', 'Close')}
              </Button>

              <Button color="primary" type="button" onClick={() => onFormSubmit()}>
                {t('admin.header-dropdown-dialog-actions-save', 'Save')}
              </Button>
            </DialogActions>
          </form>
        </>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ generalReducer, usersReducer }) => ({ generalReducer, usersReducer });
const mapDispatchToProps = {
  teamsRequest,
  usersManagersRequest,
  usersLeadersRequest,
  updateUserRequest,
  saveUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
