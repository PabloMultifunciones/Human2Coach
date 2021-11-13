import React from 'react';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { useFormik, Form, FormikProvider, ErrorMessage } from 'formik';

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
import { teamsRequest } from '../../actions/generalActions';
import { updateUserRequest } from '../../actions/usersActions';

import Spinner from '../Spinner';

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

function UserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    team: Yup.string().required('The team is required'),
    role: Yup.string().required('The role is required'),
    isActive: Yup.boolean().required('The state is required')
  });

  const formik = useFormik({
    initialValues: {
      id: props.id ? props.id : null,
      name: props.name ? props.name : '',
      team: props.team ? props.team.id : '',
      role: props.role ? props.role : '1',
      isActive: props.isActive
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      if (values.id) {
        props.updateUserRequest({
          id: values.id,
          name: values.name,
          team: { id: values.team },
          role: values.role,
          isActive: values.isActive
        });
      }
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    if (!props.teams) {
      props.teamsRequest();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik; // values

  /** *********Data Binding Form******* */

  return (
    <>
      {props.type === 'EDIT' ? (
        <Tooltip title="Edit user">
          <EditIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
        </Tooltip>
      ) : (
        <Button variant="contained" onClick={handleClickOpen} startIcon={<Icon icon={plusFill} />}>
          Nuevo usuario
        </Button>
      )}

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Usuario
        </DialogTitle>
        <>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <DialogContent dividers>
                {props.teams_charging || props.users_charging ? (
                  <Spinner />
                ) : (
                  props.type !== 'BOOLEAN' && (
                    <>
                      <Container maxWidth="lg">
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                              fullWidth
                              id="outlined-name"
                              variant="outlined"
                              label="Name"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Grid>

                          {props.teams && (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <FormControl variant="outlined" className="w-100">
                                <InputLabel id="frequency-select-outlined-label">Team</InputLabel>
                                <Select
                                  labelId="team"
                                  id="team"
                                  name="team"
                                  label="Team"
                                  fullWidth
                                  {...getFieldProps('team')}
                                  error={Boolean(touched.team && errors.team)}
                                  helpertext={touched.team && errors.team}
                                >
                                  <MenuItem value="">Choose a team</MenuItem>

                                  {props.teams.content.map((team) => (
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

                              <ErrorMessage name="team">
                                {(msg) => (
                                  <p
                                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-16d5wub-MuiFormHelperText-root"
                                    id="outlined-name-helper-text"
                                  >
                                    {msg}
                                  </p>
                                )}
                              </ErrorMessage>
                            </Grid>
                          )}

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl variant="outlined" className="w-100">
                              <InputLabel id="frequency-select-outlined-label">Rol</InputLabel>
                              <Select
                                labelId="role"
                                id="role"
                                name="role"
                                label="Rol"
                                fullWidth
                                {...getFieldProps('role')}
                                error={Boolean(touched.role && errors.role)}
                                helpertext={touched.role && errors.role}
                              >
                                <MenuItem value="1">Colaborador</MenuItem>
                                <MenuItem value="2">Team Leader </MenuItem>
                                <MenuItem value="3">Team Manager </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl variant="outlined" className="w-100">
                              <InputLabel id="frequency-select-outlined-label">Estado</InputLabel>
                              <Select
                                labelId="state"
                                id="state"
                                name="state"
                                label="Estado"
                                defaultValue
                                fullWidth
                                {...getFieldProps('isActive')}
                                error={Boolean(touched.isActive && errors.isActive)}
                                helpertext={touched.isActive && errors.isActive}
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

                <Button color="primary" type="submit">
                  {t('admin.header-dropdown-dialog-actions-save', 'Save')}
                </Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ generalReducer }) => generalReducer;

const mapDispatchToProps = {
  teamsRequest,
  updateUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
