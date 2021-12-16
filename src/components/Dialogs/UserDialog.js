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
import { teamsRequest, usersRequest } from '../../actions/generalActions';
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

  const [{ id, username, name, team, user, role, isActive }, setState] = useState({
    id: props.id ? props.id : null,
    username: props.username ? props.username : '',
    name: props.name ? props.name : '',
    team: props.team ? props.team.id : '',
    user:
      props.role === 3
        ? props.teamLeader
          ? props.teamLeader.id
          : ''
        : props.teamManager
        ? props.teamManager.id
        : '',
    role: props.role ? props.role : '1',
    isActive: props.isActive || false
  });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleClickOpen = async () => {
    setOpen(true);
    if (!props.generalReducer.teams) {
      await props.teamsRequest();
    }

    if (!props.generalReducer.users) {
      await props.usersRequest();
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
      toastr.error(t('admin.user-panel-user-dialog-username-input-error', 'Username is required'));
      return;
    }

    if (name === '') {
      setNameError(true);
      toastr.error(
        t('menu.trivia-panel-dialog-add-test-message-error-name', 'The name is required')
      );
      return;
    }

    if (team === '') {
      setTeamError(true);
      toastr.error(
        t('admin.user-panel-user-dialog-message-select-group', 'You must select a group')
      );
      return;
    }

    if (role === '' || role.length === 0) {
      setRoleError(true);
      toastr.error(t('admin.user-panel-user-dialog-role-input-error', 'The role is required'));
      return;
    }

    if (role !== 1) {
      if (user === '') {
        setUserError(true);
        toastr.error(
          t('menu.badge-panel-dialog-delivery-message-error-user', 'You must select a user')
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
          username,
          team: { id: team },
          role,
          position: role,
          teamManager: role === 2 ? { id: user } : null,
          teamLeader: role === 3 ? { id: user } : null,
          isActive
        })
        .then((r) => (status = r));
    } else {
      await props
        .saveUserRequest({
          name,
          username,
          team: { id: team },
          role,
          position: role,
          teamManager: role === 2 ? { id: user } : null,
          teamLeader: role === 3 ? { id: user } : null,
          isActive
        })
        .then((r) => (status = r));
    }

    if (status.status === 'SUCCESS') {
      toastr.success(
        t('admin.user-panel-user-dialog-message-success-user-save', 'User saved successfully')
      );
      handleClose();
      return;
    }

    if (status.error && status.error.status === 422) {
      toastr.error('A user with this username already exists.');
    } else {
      toastr.error(
        t(
          'admin.user-panel-user-dialog-message-error-user-save',
          'An error occurred while trying to save the user'
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
      team: props.team ? props.team.id : '',
      role: props.role ? props.role : '',
      isActive: props.isActive || false
    }));
  }

  /** *********Data Binding Form******* */

  return (
    <>
      {props.type === 'EDIT' ? (
        <Tooltip title="Edit user">
          <EditIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
        </Tooltip>
      ) : (
        <Button
          color="error"
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<Icon icon={plusFill} />}
        >
          New user
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
          User
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
                            label="Username"
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
                            label="Name"
                            name="name"
                            value={name}
                            error={nameError}
                            onChange={handleChange}
                          />
                        </Grid>

                        {props.generalReducer.teams && (
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl variant="outlined" className="w-100">
                              <InputLabel id="frequency-select-outlined-label">Team</InputLabel>
                              <Select
                                labelId="team"
                                id="team"
                                name="team"
                                value={team}
                                error={teamError}
                                label="Team"
                                fullWidth
                                onChange={handleChange}
                              >
                                <MenuItem value="">Choose a team</MenuItem>

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
                            <InputLabel id="frequency-select-outlined-label">Rol</InputLabel>
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
                              <MenuItem value={3}>Colaborador</MenuItem>
                              <MenuItem value={2}>Team Leader </MenuItem>
                              <MenuItem value={1}>Team Manager </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {props.generalReducer.users && role && role !== 1 && (
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl variant="outlined" className="w-100">
                              <InputLabel id="frequency-select-outlined-label">
                                {role === 2 ? 'Team Manager' : 'Team Leader'}
                              </InputLabel>
                              <Select
                                labelId="user"
                                id="user"
                                name="user"
                                value={user}
                                error={userError}
                                label={role === 2 ? 'Team Manager' : 'Team Leader'}
                                fullWidth
                                onChange={handleChange}
                              >
                                <MenuItem value="">
                                  Choose a {role === 2 ? 'Team Manager' : 'Team Leader'}
                                </MenuItem>

                                {props.generalReducer.users.content.map((user) => (
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

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <FormControl variant="outlined" className="w-100">
                            <InputLabel id="frequency-select-outlined-label">Estado</InputLabel>
                            <Select
                              labelId="isActive"
                              id="isActive"
                              name="isActive"
                              value={isActive}
                              error={isActiveError}
                              label="Estado"
                              defaultValue
                              fullWidth
                              onChange={handleChange}
                            >
                              <MenuItem value>Activo</MenuItem>
                              <MenuItem value={false}>Inactivo </MenuItem>
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
  usersRequest,
  updateUserRequest,
  saveUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
