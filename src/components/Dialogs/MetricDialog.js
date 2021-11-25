import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import toastr from 'toastr';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { teamsRequest, usersRequest } from '../../actions/generalActions';
import { updateMetricRequest, saveMetricRequest, resetState } from '../../actions/metricsActions';

import FindRegistersDialog from './FindRegistersDialog';
import YesNoOption from '../Metrics/YesNoOption';

import Spinner from '../Spinner';
import GeneralFunctions from '../../libs/GeneralFunctions';

import 'toastr/build/toastr.min.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  formControl: {
    width: '100%',
    marginTop: '1rem'
  },
  container: {
    paddingTop: theme.spacing(4)
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  }
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function MetricDialog(props) {
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

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [frequencyError, setFrequencyErrorError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [teamsError, setTeamsError] = useState(false);
  const [usersError, setUsersError] = useState(false);
  const [isApplyToSupervisorError, setIsApplyToSupervisorError] = useState(false);
  const [supervisorCalculationTypeError, setSupervisorCalculationTypeError] = useState(false);
  const [isActiveError, setIsActiveError] = useState(false);
  const [targetValueError, setTargetValueError] = useState(false);

  const [
    {
      id,
      name,
      description,
      frequency,
      type,
      teams,
      users,
      isApplyToSupervisor,
      supervisorCalculationType,
      targetValue,
      isActive,
      color1,
      color2,
      color3,
      points1,
      points2,
      points3,
      rangeFrom1,
      rangeFrom2,
      rangeFrom3,
      rangeto1,
      rangeto2,
      rangeto3
    },
    setState
  ] = useState({
    id: props.id ? props.id : null,
    color1: props.color1 ? props.color1 : '#FF0000',
    color2: props.color2 ? props.color2 : '#FFFF00',
    color3: props.color3 ? props.color3 : '#00D800',
    points1: props.points1 ? props.points1 : 0,
    points2: props.points2 ? props.points2 : 0,
    points3: props.points3 ? props.points3 : 0,
    rangeFrom1: props.rangeFrom1 ? props.rangeFrom1 : 0,
    rangeFrom2: props.rangeFrom2 ? props.rangeFrom2 : 0,
    rangeFrom3: props.rangeFrom3 ? props.rangeFrom3 : 0,
    rangeto1: props.rangeTo1 ? props.rangeTo1 : 0,
    rangeto2: props.rangeTo2 ? props.rangeTo2 : 0,
    rangeto3: props.rangeTo3 ? props.rangeTo3 : 0,
    name: props.name ? props.name : '',
    type: props.type ? props.type : '',
    description: props.description ? props.description : '',
    frequency: props.frequency ? props.frequency : '',
    isActive: props.isActive ? props.isActive : true,
    isApplyToSupervisor: props.isApplyToSupervisor ? String(props.isApplyToSupervisor) : 'false',
    supervisorCalculationType: props.supervisorCalculationType
      ? props.supervisorCalculationType
      : 'ADITION',

    targetValue: props.targetValue
      ? props.type !== 'TIME'
        ? props.type === 'BOOLEAN'
          ? props.targetValue
          : parseFloat(props.targetValue)
        : new Date(`0000-01-01T${props.targetValue ? props.targetValue : '00:00:00'}`)
      : '',

    teams: GeneralFunctions.formatPropsEdit(props.teams ? props.teams : []),
    users: GeneralFunctions.formatPropsEdit(props.users ? props.users : [])
  });

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

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'type') {
      setState((prevState) => ({
        ...prevState,
        color1: props.color1 ? props.color1 : '#FF0000',
        color2: props.color2 ? props.color2 : '#FFFF00',
        color3: props.color3 ? props.color3 : '#00D800',
        points1: props.points1 ? props.points1 : 0,
        points2: props.points2 ? props.points2 : 0,
        points3: props.points3 ? props.points3 : 0,
        rangeFrom1: props.rangeFrom1 ? props.rangeFrom1 : 0,
        rangeFrom2: props.rangeFrom2 ? props.rangeFrom2 : 0,
        rangeFrom3: props.rangeFrom3 ? props.rangeFrom3 : 0,
        rangeto1: props.rangeTo1 ? props.rangeTo1 : 0,
        rangeto2: props.rangeTo2 ? props.rangeTo2 : 0,
        rangeto3: props.rangeTo3 ? props.rangeTo3 : 0
      }));

      if (name === 'type' && value === 'TIME') {
        setState((prevState) => ({
          ...prevState,
          targetValue: new Date('0000-01-01T00:00:00')
        }));
      } else if (name === 'type' && value === 'BOOLEAN') {
        setState((prevState) => ({
          ...prevState,
          targetValue: true
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          targetValue: ''
        }));
      }
    }
  }

  function setValue(name, value) {
    let valueArray;
    const n = valueArray.includes(value);

    if (name === 'teams') {
      valueArray = [...teams];
    } else {
      valueArray = [...users];
    }

    if (!n) {
      valueArray.push(value);
      setState((prevState) => ({ ...prevState, [name]: valueArray }));
    }
  }

  function handleClickSelectAll(type) {
    if (type === 'teams') {
      setState((prevState) => ({
        ...prevState,
        teams: props.rowTeams
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        users: props.rowsUsers
      }));
    }
  }

  function handleChangeTime(e) {
    setState((prevState) => ({
      ...prevState,
      targetValue: e
    }));
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleData(data) {
    setState((prevState) => ({ ...prevState, [data.name]: data.value }));
  }

  function setOriginalState() {
    setState((prevState) => ({
      ...prevState,
      id: props.id ? props.id : null,
      color1: props.color1 ? props.color1 : '#fff',
      color2: props.color1 ? props.color1 : 'yellow',
      color3: props.color1 ? props.color1 : 'green',
      points1: props.points1 ? parseFloat(props.points1) : 0,
      points2: props.points2 ? parseFloat(props.points2) : 0,
      points3: props.points3 ? parseFloat(props.points3) : 0,
      rangeFrom1: props.rangeFrom1 ? parseFloat(props.rangeFrom1) : 0,
      rangeFrom2: props.rangeFrom2 ? parseFloat(props.rangeFrom2) : 0,
      rangeFrom3: props.rangeFrom3 ? parseFloat(props.rangeFrom3) : 0,
      rangeto1: props.rangeTo1 ? parseFloat(props.rangeTo1) : 0,
      rangeto2: props.rangeTo2 ? parseFloat(props.rangeTo2) : 0,
      rangeto3: props.rangeTo3 ? parseFloat(props.rangeTo3) : 0,
      teams: GeneralFunctions.formatPropsEdit(props.teams ? props.teams : []),
      users: GeneralFunctions.formatPropsEdit(props.users ? props.teams : []),
      type: props.type ? props.type : '',
      isActive: props.isActive ? props.isActive : true,
      description: props.description ? props.description : '',
      frequency: props.frequency ? props.frequency : '',
      isApplyToSupervisor: props.isApplyToSupervisor ? String(props.isApplyToSupervisor) : 'false',
      supervisorCalculationType: props.supervisorCalculationType
        ? props.supervisorCalculationType
        : 'ADITION',
      targetValue: props.targetValue
        ? props.type !== 'TIME'
          ? props.type === 'BOOLEAN'
            ? props.targetValue
            : parseFloat(props.targetValue)
          : new Date(props.targetValue ? props.targetValue : '00:00:00')
        : ''
    }));
  }

  async function onFormSubmit() {
    setNameError(false);
    setDescriptionError(false);
    setFrequencyErrorError(false);
    setTypeError(false);
    setTeamsError(false);
    setUsersError(false);
    setIsApplyToSupervisorError(false);
    setSupervisorCalculationTypeError(false);
    setIsActiveError(false);

    if (name === '') {
      setNameError(true);
      toastr.error(
        t('menu.trivia-panel-dialog-add-test-message-error-name', 'The name is required')
      );
      return;
    }

    if (description === '') {
      setDescriptionError(true);
      toastr.error(
        t('menu.trivia-panel-dialog-add-test-message-error-description', 'Description is required')
      );
      return;
    }

    if (frequency === '') {
      setFrequencyErrorError(true);
      toastr.error(t('menu.metric-panel-dialog-message-error-frequency', 'Frequency is required'));
      return;
    }

    if (type === '') {
      setTypeError(true);
      toastr.error(t('menu.metric-panel-dialog-message-error-type', 'The type is required'));
      return;
    }

    if (
      (teams === '' || teams.length === 0 || !teams) &&
      (users === '' || users.length === 0 || !users)
    ) {
      setTeamsError(true);
      setUsersError(true);

      toastr.error(
        t(
          'menu.trivia-panel-dialog-add-test-message-error-add-group',
          'You must add groups or players'
        )
      );
      return;
    }

    if (isApplyToSupervisor === '') {
      setIsApplyToSupervisorError(true);
      toastr.error(
        t(
          'menu.metric-panel-dialog-message-error-supervisor',
          'You must choose whether or not to impact the supervisor'
        )
      );
      return;
    }

    if (isApplyToSupervisor === true) {
      if (supervisorCalculationType === '') {
        setSupervisorCalculationTypeError(true);
        toastr.error(
          t(
            'menu.metric-panel-dialog-message-error-calculation',
            'You must choose the type of calculation'
          )
        );
        return;
      }
    }

    if (targetValue === '') {
      setTargetValueError(true);
      toastr.error(t('menu.metric-panel-dialog-message-error-goal', 'You must enter a goal'));
      return;
    }

    if (isActive === '') {
      setIsActiveError(true);
      toastr.error(
        t(
          'menu.trivia-panel-dialog-add-test-message-error-active',
          'You must choose if it is active or not'
        )
      );
      return;
    }

    if (type === 'BOOLEAN') {
      if (points1 === '' || rangeFrom1 === '') {
        toastr.error(
          t(
            'menu.metric-panel-dialog-message-error-rank-information',
            'Rank and point information is missing, please check and try again'
          )
        );
      }
    }

    if (type === 'TIME') {
      if (
        points1 === '' ||
        points2 === '' ||
        points3 === '' ||
        color1 === '' ||
        color2 === '' ||
        color3 === ''
      ) {
        toastr.error(
          t(
            'menu.metric-panel-dialog-message-error-rank-information',
            'Rank and point information is missing, please check and try again'
          )
        );
      }
    }

    if (type !== 'BOOLEAN' && type !== 'TIME') {
      if (
        points1 === '' ||
        points2 === '' ||
        points3 === '' ||
        rangeFrom1 === '' ||
        rangeFrom2 === '' ||
        rangeFrom3 === '' ||
        rangeto1 === '' ||
        rangeto2 === '' ||
        rangeto3 === '' ||
        color1 === '' ||
        color2 === '' ||
        color3 === ''
      ) {
        toastr.error(
          t(
            'menu.metric-panel-dialog-message-error-rank-information',
            'Rank and point information is missing, please check and try again'
          )
        );
      }
    }

    const teamsFormatted = [];
    teams.forEach((element) => {
      teamsFormatted.push({
        id: element
      });
    });

    const usersFormatted = [];
    users.forEach((element) => {
      usersFormatted.push({
        id: element
      });
    });

    const json = {
      id: props.id ? props.id : null,
      color1: color1 || 'red',
      color2: color2 || 'yellow',
      color3: color3 || 'green',
      points1: points1 && points1 !== '' ? parseFloat(points1) : '',
      points2: points2 && points2 !== '' ? parseFloat(points2) : '',
      points3: points3 && points3 !== '' ? parseFloat(points3) : '',
      rangeFrom1: type === 'TIME' ? (rangeFrom1 === '' ? '00:00:00' : rangeFrom1) : rangeFrom1,
      rangeFrom2:
        type === 'TIME' ? (rangeFrom2 === '' ? '00:00:00' : rangeFrom2) : parseFloat(rangeFrom2),
      rangeFrom3:
        type === 'TIME' ? (rangeFrom3 === '' ? '00:00:00' : rangeFrom3) : parseFloat(rangeFrom3),
      rangeTo1: type === 'TIME' ? (rangeto1 === '' ? '00:00:00' : rangeto1) : parseFloat(rangeto1),

      rangeTo2: type === 'TIME' ? (rangeto2 === '' ? '00:00:00' : rangeto2) : parseFloat(rangeto2),
      rangeTo3: type === 'TIME' ? (rangeto3 === '' ? '00:00:00' : rangeto3) : parseFloat(rangeto3),
      name,
      teams: teamsFormatted,
      users: usersFormatted,
      type,
      isActive,
      description,
      frequency,
      isApplyToSupervisor,
      supervisorCalculationType,
      targetValue:
        type !== 'TIME'
          ? type === 'BOOLEAN'
            ? targetValue
            : parseFloat(targetValue)
          : GeneralFunctions.formatDate(targetValue)
    };

    let status;

    if (id) {
      await props.updateMetricRequest(json).then((r) => (status = r));
    } else {
      await props.saveMetricRequest(json).then((r) => (status = r));
    }

    if (status === 'ERROR') {
      toastr.error(
        t(
          'menu.metric-panel-dialog-message-error-save-metric-two',
          'An error occurred while trying to save the metric'
        )
      );
    } else {
      toastr.success(
        t('menu.metric-panel-dialog-message-success-save-metric', 'Metric saved successfully')
      );
      handleClose();
    }
  }
  return (
    <>
      {props.typeModal === 'EDIT' ? (
        <Tooltip title={t('admin.actions-edit', 'Edit')}>
          <EditIcon className="cursor-pointer" fontSize="small" onClick={handleClickOpen} />
        </Tooltip>
      ) : (
        <Button
          className="button-table mr-1"
          variant="contained"
          color="error"
          onClick={handleClickOpen}
        >
          <AddIcon />
          {t('menu.metric-panel-title', 'Metric')}
        </Button>
      )}

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <IconButton edge="start" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              Métrica
            </Typography>
          </Toolbar>
        </AppBar>
        {props.generalReducer.teams_charging ||
        props.generalReducer.users_charging ||
        props.metricsReducer.metrics_save_charging ? (
          <Spinner />
        ) : (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  onChange={handleChange}
                  error={nameError}
                  value={name}
                  name="name"
                  id="name"
                  label={t('menu.metric-panel-dialog-metric-name', 'Metric name')}
                  variant="outlined"
                  className="mt-2"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  onChange={handleChange}
                  error={descriptionError}
                  value={description}
                  name="description"
                  id="description"
                  label={t('menu.metric-panel-dialog-metric-description', 'Metric description')}
                  variant="outlined"
                  className="mt-2"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="frequency-select-outlined-label">
                    {t('menu.metric-panel-table-frequency', 'Frequency')}
                  </InputLabel>
                  <Select
                    onChange={handleChange}
                    error={frequencyError}
                    value={frequency}
                    labelId="frequency"
                    id="frequency"
                    name="frequency"
                    label={t('menu.metric-panel-table-frequency', 'Frequency')}
                  >
                    <MenuItem value="HOURLY">{t('menu.metric-panel-table-hour', 'Hour')} </MenuItem>
                    <MenuItem value="DAILY">
                      {t('menu.metric-panel-table-daily', 'Daily')}{' '}
                    </MenuItem>
                    <MenuItem value="WEEKLY">
                      {t('menu.metric-panel-table-weekly', 'Weekly')}
                    </MenuItem>
                    <MenuItem value="MONTHLY">
                      {t('menu.metric-panel-table-mothly', 'Mothly')}
                    </MenuItem>
                    <MenuItem value="EVENTUAL">
                      {t('menu.metric-panel-table-eventual', 'Eventual')}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="type-select-outlined-label">{t('type.label', 'Type')}</InputLabel>
                  <Select
                    onChange={handleChange}
                    error={typeError}
                    value={type}
                    labelId="type"
                    id="type"
                    name="type"
                    label={t('type.label', 'Type')}
                  >
                    <MenuItem value="BOOLEAN">
                      {t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')}/
                      {t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')}{' '}
                    </MenuItem>
                    <MenuItem value="NUMBER">
                      {t('menu.trivia-panel-dialog-add-test-select-questions-number', 'Number')}{' '}
                    </MenuItem>
                    <MenuItem value="TIME">
                      {t('menu.trivia-panel-dialog-test-analytic-time', 'Time')}
                    </MenuItem>
                    <MenuItem value="MULTIPLIER">
                      {t('menu.metric-panel-dialog-Multiplier', 'Multiplier')}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              {props.generalReducer.teams && (
                <Grid item xs={12} md={6} lg={6} className="d-flex">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="teams-select-outlined-label">
                      {t('admin.user-panel-user-dialog-input-groups', 'Groups')}
                    </InputLabel>
                    <Select
                      labelId="group-mutiple-name-label"
                      id="teams"
                      name="teams"
                      label={t('admin.user-panel-user-dialog-input-groups', 'Groups')}
                      multiple
                      value={teams}
                      error={teamsError}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
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

                  <FindRegistersDialog
                    setValue={(t, v) => setValue(t, v)}
                    type="teams"
                    rows={props.generalReducer.teams.content}
                  />

                  <Tooltip title={t('add-all.label', 'Add all')}>
                    <Button
                      className="button-table ml-1 mt-1"
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickSelectAll('teams')}
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              )}

              {props.generalReducer.users && (
                <Grid item xs={12} md={6} lg={6} className="d-flex">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="users-select-outlined-label">
                      {t('menu.trivia-panel-dialog-add-test-select-players', 'Players')}
                    </InputLabel>
                    <Select
                      labelId="users-mutiple-name-label"
                      id="users"
                      name="users"
                      multiple
                      label={t('menu.trivia-panel-dialog-add-test-select-players', 'Players')}
                      value={users}
                      error={usersError}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      {props.generalReducer.users.content.map((rowUser) => (
                        <MenuItem key={rowUser.id} value={rowUser.id}>
                          {rowUser.name
                            ? `${rowUser.name} ${rowUser.lastName}`
                            : t(
                                'admin.user-panel-user-dialog-input-select-without-name',
                                'Without name'
                              )}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FindRegistersDialog
                    setValue={(t, v) => setValue(t, v)}
                    type="users"
                    rows={props.generalReducer.teams.content}
                  />

                  <Tooltip title={t('add-all.label', 'Add all')}>
                    <Button
                      className="button-table ml-1 mt-1"
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickSelectAll('users')}
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="isApplyToSupervisor-select-outlined-label">
                    {t('menu.metric-panel-table-impact-supervisor', 'Impacta/Supervisor')}
                  </InputLabel>
                  <Select
                    onChange={handleChange}
                    error={isApplyToSupervisorError}
                    value={isApplyToSupervisor}
                    labelId="isApplyToSupervisor"
                    id="isApplyToSupervisor"
                    name="isApplyToSupervisor"
                    label={t('menu.metric-panel-table-impact-supervisor', 'Impacta/Supervisor')}
                  >
                    <MenuItem value>
                      {t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')}{' '}
                    </MenuItem>
                    <MenuItem value={false}>
                      {t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {type === 'BOOLEAN' && (
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="targetValue-select-outlined-label">
                      {t('menu.metric-panel-dialog-objective', 'Objective')}
                    </InputLabel>
                    <Select
                      onChange={handleChange}
                      error={targetValueError}
                      value={targetValue}
                      labelId="targetValue"
                      id="targetValue"
                      name="targetValue"
                      label="targetValue"
                    >
                      <MenuItem value>
                        {t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')}{' '}
                      </MenuItem>
                      <MenuItem value={false}>
                        {t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {(type === 'NUMBER' || type === 'PERCENT' || type === 'MULTIPLIER') && (
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    onChange={handleChange}
                    error={targetValueError}
                    value={targetValue}
                    name="targetValue"
                    id="targetValue"
                    type="number"
                    label={t('menu.metric-panel-dialog-objective', 'Objective')}
                    variant="outlined"
                    className="mt-1"
                    fullWidth
                  />
                </Grid>
              )}

              {type === 'TIME' && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={12} md={6} lg={6}>
                    <TimePicker
                      ampm={false}
                      okLabel={t('accept.label', 'Accept')}
                      cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
                      clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
                      openTo="hours"
                      inputVariant="outlined"
                      views={['hours', 'minutes', 'seconds']}
                      format="HH:mm:ss"
                      label={t('menu.metric-panel-dialog-objective', 'Objective')}
                      value={targetValue}
                      error={targetValueError}
                      fullWidth
                      onChange={handleChangeTime}
                      name="targetValue"
                      id="targetValue"
                      renderInput={(params) => <TextField className="mt-1" fullWidth {...params} />}
                    />
                  </Grid>
                </LocalizationProvider>
              )}
            </Grid>

            <Grid container spacing={1}>
              {isApplyToSupervisor === true && (
                <Grid item xs={12} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="supervisorCalculationType-select-outlined-label">
                      {t('menu.metric-panel-dialog-calculation-type', 'Calculation type')}
                    </InputLabel>
                    <Select
                      onChange={handleChange}
                      value={supervisorCalculationType}
                      error={supervisorCalculationTypeError}
                      labelId="supervisorCalculationType"
                      id="supervisorCalculationType"
                      name="supervisorCalculationType"
                      label={t('menu.metric-panel-dialog-calculation-type', 'Calculation type')}
                    >
                      <MenuItem value="ADITION">
                        {t('menu.metric-panel-dialog-add', 'Addition')}{' '}
                      </MenuItem>
                      <MenuItem value="AVERAGE">
                        {t('menu.metric-panel-dialog-average', 'Average')}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="isActive-select-outlined-label">
                    {t('admin.header-dropdown-view-conditions-table-state', 'State')}
                  </InputLabel>
                  <Select
                    onChange={handleChange}
                    error={isActiveError}
                    value={isActive}
                    labelId="isActive"
                    id="isActive"
                    name="isActive"
                    label={t('admin.header-dropdown-view-conditions-table-state', 'State')}
                  >
                    <MenuItem value>
                      {t('admin.header-dropdown-view-conditions-table-active-state', 'Active')}{' '}
                    </MenuItem>
                    <MenuItem value={false}>
                      {t('admin.header-dropdown-view-conditions-table-blocked-state', 'Blocked')}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              {type === 'BOOLEAN' && (
                <>
                  <hr className="w-100 mt-2" />{' '}
                  <YesNoOption
                    points1={points1}
                    rangeFrom1={rangeFrom1}
                    setData={(data) => handleData(data)}
                  />
                </>
              )}
            </Grid>

            <div className="mt-2 mb-2">
              <Button
                className="button-table mr-1"
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Cerrar
              </Button>

              <Button
                className="button-table"
                variant="contained"
                color="primary"
                onClick={() => onFormSubmit()}
              >
                Guardar
              </Button>
            </div>
          </Container>
        )}
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ generalReducer, metricsReducer }) => ({
  generalReducer,
  metricsReducer
});
const mapDispatchToProps = {
  teamsRequest,
  usersRequest,
  updateMetricRequest,
  saveMetricRequest,
  resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricDialog);
