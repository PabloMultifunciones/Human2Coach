import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useNavigate } from 'react-router-dom';

import { add, format } from 'date-fns';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import FeedbackDialog from './Dialogs/FeedbackDialog';
import TimeEntryFollowDialog from './Dialogs/TimeEntryFollowDialog';

import LetterCounter from './Globals/LetterCounter';
import UploadFile from './UploadFile';

import 'toastr/build/toastr.min.css';

import { TableFeedback, TableFeedbackDone } from './_dashboard/app';
import {
  usersRequest,
  getCollaboratorsRequest,
  getCollaboratorsLeadersRequest
} from '../actions/generalActions';

import {
  getPlanRequest,
  savePlanRequest,
  updateStatePlanRequest,
  setMetricsSelected,
  resetState
} from '../actions/plansActions';
import GeneralFunctions from '../libs/GeneralFunctions';

const findByIndex = (exceptions, name) => {
  const findByName = (exception) => exception.name === name;
  const index = exceptions.findIndex(findByName);

  if (index === -1) {
    return false;
  }

  return index;
};

function EditPlanForm(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [
    {
      collaborator,
      feedback,
      dashboard,
      comments,
      notes,
      sick,
      vacations,
      disciplinaryProcess,
      date,
      dateCommitment,
      addReminder,
      notReminder,
      openDialog,
      file
    },
    setState
  ] = useState({
    collaborator: '',
    feedback: '',
    dashboard: 'oneonone',
    comments: '',
    notes: '',
    sick: false,
    vacations: false,
    disciplinaryProcess: false,
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd'),
    notReminder: false,
    openDialog: false,
    file: null
  });

  useEffect(() => {
    async function setData() {
      if (!props.generalReducer.collaborators) {
        if (props.loginReducer.userLogged && props.loginReducer.userLogged.user.position === 1) {
          if (props.loginReducer.userLogged.permissions.isCreateToTeamLeader) {
            props.getCollaboratorsLeadersRequest(999);
            return;
          }
          if (props.loginReducer.userLogged.permissions.isCreateToColaborator) {
            props.getCollaboratorsRequest(999);
          }
        } else {
          await props.getCollaboratorsRequest(999);
        }
      }

      props.getPlanRequest(props.id).then((plan) => {
        setState((prevState) => ({
          ...prevState,
          collaborator: plan.user,
          feedback: plan.isObjetive ? 'objective' : 'general',
          dashboard: plan.isPDS ? 'pds' : plan.isPIP ? 'pip' : plan.isOneOnOne ? 'oneonone' : '',
          notes: plan.supervisorNote,
          comments: plan.supervisorComment,
          date: format(new Date(plan.sendedDate), 'yyyy-MM-dd'),
          dateCommitment: plan.commitmentDate
            ? format(new Date(plan.commitmentDate), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd'),
          addReminder: plan.reminderDate
            ? format(new Date(plan.reminderDate), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd'),
          notReminder: plan.reminderDate === null,
          sick: findByIndex(plan.exceptions, 'Sick leave')
            ? plan.exceptions[findByIndex(plan.exceptions, 'Sick leave')].isChecked
            : false,
          vacations: findByIndex(plan.exceptions, 'Vacations')
            ? plan.exceptions[findByIndex(plan.exceptions, 'Vacations')].isChecked
            : false,
          disciplinaryProcess: findByIndex(plan.exceptions, 'Disciplinary process')
            ? plan.exceptions[findByIndex(plan.exceptions, 'Disciplinary process')].isChecked
            : false
        }));
      });
    }

    setData();

    // eslint-disable-next-line
  }, []);

  function getTablehead() {
    return [
      { id: 'metric', label: t('metrics.label', 'Métricas'), alignRight: false },
      {
        id: 'objective',
        label: t('menu.metric-panel-dialog-objective', 'Objetivo'),
        alignRight: false
      },
      {
        id: 'wLastbefore',
        label: GeneralFunctions.getWeekCountLastBefore(),
        alignRight: false
      },
      {
        id: 'wbefore',
        label: GeneralFunctions.getWeekCountBefore(),
        alignRight: false
      },
      { id: 'check', label: 'Check', alignRight: false }
    ];
  }

  const handleChange = (event, value) => {
    if (event.target.name === 'feedback' && event.target.value === 'objective') {
      setState((prevState) => ({
        ...prevState,
        openDialog: true
      }));
    }

    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));
  };

  const setExtraTime = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFile = (file) => {
    setState((prevState) => ({
      ...prevState,
      file
    }));
  };

  const submitFunction = async (plan, type) => {
    const metricArray = [];
    // -------------------- ESTO ES LO QUE MODIFIQUE -------------------------------
    if (props.plansReducer.metricsSelected.length === 0) {
      props.plansReducer.plansSelected.metricConfs.forEach((element) => {
        metricArray.push({
          metricConf: element.metricConf ? { ...element.metricConf } : null,
          isChecked: true,
          targetValue: element.targetValue,
          date1: element.date1,
          date2: element.date2,
          value1: element.value1,
          value2: element.value2,
          isActive: true
        });
      });
    }
    // -----------------------------------------------------

    props.plansReducer.metricsSelected.forEach((element) => {
      metricArray.push({
        metricConf: element.metricConf ? { ...element.metricConf } : null,
        isChecked: true,
        targetValue: element.targetValue,
        date1: element.date1,
        date2: element.date2,
        value1: element.value1,
        value2: element.value2,
        isActive: true
      });
    });

    const json = {
      id: plan.id,
      isObjetive: feedback === 'objective',
      isFeedback: feedback === 'general',
      user: collaborator,
      supervisorNote: notes,
      supervisorComment: comments,
      userComment: null,
      sendedDate: `${date}T00:00:00`,
      status: type,
      isSended: type === 'SENDED' || false,
      commitmentDate: `${dateCommitment}T00:00:00`,
      reminderDate: notReminder ? null : `${addReminder}T00:00:00`,
      isException: sick === true || vacations === true || disciplinaryProcess === true,
      metricConfs: metricArray,
      file,
      isOneOnOne: dashboard === 'oneonone',
      isPDS: dashboard === 'pds',
      isPIP: dashboard === 'pip',
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
      ],
      isActive: true
    };

    if (!addReminder || addReminder === '') {
      toastr.error(t('date-required', 'La fecha de envío es requerida'));
    }

    let status;

    await props.updateStatePlanRequest(json).then((r) => (status = r));

    if (status === 'ERROR') {
      toastr.error(
        t(
          'menu.metric-panel-dialog-message-error-save-metric-two',
          'Ha ocurrido un error al intentar guardar la métrica'
        )
      );
    } else {
      toastr.success('Plan saved successfully');
      navigate('/dashboard/plans');
    }
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            {props.generalReducer.users_charging || props.plansReducer.plans_save_charging ? (
              <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex justify-center">
                <Spinner />
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Link to="/dashboard/plans" rel="noopener noreferrer" className="not-underline">
                    <Button className="bg-danger" variant="contained">
                      <ArrowBackIosIcon />
                      {t('back.label', 'Anterior')}
                    </Button>
                  </Link>
                </Grid>
                {props.generalReducer.collaborators &&
                  props.generalReducer.collaborators.content &&
                  props.generalReducer.collaborators.content.length > 0 && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Autocomplete
                        id="combo-box-demo-login"
                        value={collaborator || props.generalReducer.collaborators.content[0]}
                        options={props.generalReducer.collaborators.content}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) =>
                          `${option.name} ${option.lastName} (${option.username})`
                        }
                        onChange={(event, value) =>
                          handleChange({ target: { name: 'collaborator' } }, value)
                        }
                        renderInput={(params) => (
                          <TextField {...params} fullWidth label="Colaborador" variant="outlined" />
                        )}
                      />
                    </Grid>
                  )}

                {/* changes users to collaborators */}

                {collaborator && collaborator !== '' && (
                  <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {t('feedback-type', 'Tipo de feedback')}
                      </FormLabel>
                      <RadioGroup
                        aria-label="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={(event, value) => {
                          handleChange(event, value);
                        }}
                      >
                        <FormControlLabel
                          value="objective"
                          control={<Radio />}
                          label={t('menu.metric-panel-dialog-objective', 'Objetivo')}
                        />
                        <FormControlLabel
                          value="general"
                          control={<Radio />}
                          label={t('feedback-general', 'Feedback general')}
                        />
                      </RadioGroup>
                    </FormControl>

                    {props.loginReducer.userLogged &&
                    props.loginReducer.userLogged.user.position === 1 ? (
                      <FormControl component="fieldset" className="ml-30-percent">
                        <RadioGroup
                          aria-label="dashboard"
                          name="dashboard"
                          value={dashboard}
                          onChange={(event, value) => {
                            handleChange(event, value);
                          }}
                        >
                          {props.loginReducer.userLogged &&
                            props.loginReducer.userLogged.permissions.isCreateToColaborator && (
                              <>
                                {props.loginReducer.userLogged.permissions
                                  .isColaboratorOneOnOne && (
                                  <FormControlLabel
                                    value="oneonone"
                                    control={<Radio />}
                                    label="One on one"
                                  />
                                )}

                                {props.loginReducer.userLogged.permissions.isColaboratorPDS && (
                                  <FormControlLabel value="pds" control={<Radio />} label="P D S" />
                                )}

                                {props.loginReducer.userLogged.permissions.isColaboratorPIP && (
                                  <FormControlLabel value="pip" control={<Radio />} label="P I P" />
                                )}
                              </>
                            )}

                          {props.loginReducer.userLogged &&
                            props.loginReducer.userLogged.permissions.isCreateToTeamLeader && (
                              <>
                                {props.loginReducer.userLogged.permissions.isTeamLeaderOneOnOne && (
                                  <FormControlLabel
                                    value="oneonone"
                                    control={<Radio />}
                                    label="One on one"
                                  />
                                )}

                                {props.loginReducer.userLogged.permissions.isTeamLeaderPDS && (
                                  <FormControlLabel value="pds" control={<Radio />} label="P D S" />
                                )}

                                {props.loginReducer.userLogged.permissions.isTeamLeaderPIP && (
                                  <FormControlLabel value="pip" control={<Radio />} label="P I P" />
                                )}
                              </>
                            )}
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <FormControl component="fieldset" className="ml-30-percent">
                        <RadioGroup
                          aria-label="dashboard"
                          name="dashboard"
                          value={dashboard}
                          onChange={(event, value) => {
                            handleChange(event, value);
                          }}
                        >
                          <FormControlLabel
                            value="oneonone"
                            control={<Radio />}
                            label="One on one"
                          />

                          <FormControlLabel value="pds" control={<Radio />} label="P D S" />
                          <FormControlLabel value="pip" control={<Radio />} label="P I P" />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Grid>
                )}

                {props.plansReducer.metricsSelected.length > 0 && feedback === 'objective' && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableFeedbackDone title="" tableHead={getTablehead()} newPlan />
                  </Grid>
                )}

                {props.plansReducer.metricsSelected.length === 0 &&
                  props.plansReducer.plansSelected.metricConfs &&
                  props.plansReducer.plansSelected.metricConfs.length > 0 &&
                  feedback === 'objective' && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <section className="mb-2">
                        <TableFeedback
                          title=""
                          planSelected={props.plansReducer.plansSelected}
                          metrics={props.plansReducer.plansSelected.metricConfs}
                          disabled={false}
                          checked
                        />
                      </section>
                    </Grid>
                  )}

                {feedback && feedback !== '' && (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        className="w-100"
                        id="outlined-multiline-static"
                        label={t('privates-notes', 'Notas privadas (Visible para el lider)')}
                        multiline
                        rows={8}
                        variant="outlined"
                        value={notes}
                        name="notes"
                        inputProps={{ maxLength: 2000 }}
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />

                      <LetterCounter letters={notes} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <TextField
                        className="w-100"
                        id="outlined-multiline-static"
                        label={t('menu.badge-panel-dialog-delivery-comments', 'Comentarios')}
                        multiline
                        rows={8}
                        variant="outlined"
                        value={comments}
                        name="comments"
                        inputProps={{ maxLength: 2000 }}
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />

                      <LetterCounter letters={comments} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <UploadFile
                        getFile={(file) => handleFile(file)}
                        fileUrl={props.plansReducer.plansSelected.fileurl}
                        showUpload
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <TextField
                        className="w-100"
                        id="outlined-date"
                        label={t('sent', 'Envíado')}
                        type="date"
                        disabled
                        value={date}
                        name="date"
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} className="d-flex-between">
                      <TextField
                        className="w-100"
                        id="outlined-dateCommitment"
                        label={t('commitment', 'Compromiso')}
                        type="date"
                        value={dateCommitment}
                        inputProps={
                          sick || vacations || disciplinaryProcess
                            ? { min: format(new Date(), 'yyyy-MM-dd') }
                            : {
                                max: format(add(new Date(), { days: 10 }), 'yyyy-MM-dd'),
                                min: format(new Date(), 'yyyy-MM-dd')
                              }
                        }
                        name="dateCommitment"
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                      <TimeEntryFollowDialog
                        sick={sick}
                        vacations={vacations}
                        disciplinaryProcess={disciplinaryProcess}
                        setExtraTime={(name, value) => setExtraTime(name, value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} className="d-flex-between">
                      <TextField
                        className="w-100"
                        id="outlined-addReminder"
                        label={t('reminder', 'Recordatorio')}
                        type="date"
                        value={addReminder}
                        disabled={notReminder}
                        inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
                        variant="outlined"
                        name="addReminder"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                      <FormControlLabel
                        className="ml-1"
                        control={
                          <Checkbox
                            defaultValue={false}
                            label={t('no-reminder', 'Sin recordatorio')}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            value={notReminder}
                            name="notReminder"
                            onChange={(event, value) => {
                              handleChange(event, value);
                            }}
                          />
                        }
                        label={t('no-reminder', 'Sin recordatorio')}
                      />
                    </Grid>
                  </>
                )}

                {props.generalReducer.collaborators &&
                props.generalReducer.collaborators.content &&
                props.generalReducer.collaborators.content.length > 0 ? (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link to="/dashboard/plans" rel="noopener noreferrer" className="not-underline">
                      <Button className="bg-danger" color="inherit" variant="contained">
                        {t('back.label', 'Anterior')}
                      </Button>
                    </Link>
                    <Button
                      color="secondary"
                      variant="contained"
                      className="ml-1"
                      onClick={() => submitFunction(props.plansReducer.plansSelected, 'UPDATE')}
                    >
                      {t('admin.header-dropdown-dialog-actions-save', 'Guardar')}
                    </Button>
                    <Button
                      onClick={() => submitFunction(props.plansReducer.plansSelected, 'SENDED')}
                      color="primary"
                      variant="contained"
                      className="ml-1"
                    >
                      {t('send', 'Enviar')}
                    </Button>
                  </Grid>
                ) : (
                  <h2 className="w-100 text-center">
                    {t('assigned-users', 'No tienes usuarios asignados')}
                  </h2>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

      {feedback && feedback === 'objective' && (
        <FeedbackDialog
          collaborator={collaborator}
          openDialog={openDialog}
          closeDialog={() =>
            setState((prevState) => ({
              ...prevState,
              openDialog: false
            }))
          }
        />
      )}
    </>
  );
}

const mapStateToProps = ({ plansReducer, generalReducer, loginReducer }) => ({
  plansReducer,
  generalReducer,
  loginReducer
});

const mapDispatchToProps = {
  getCollaboratorsRequest,
  getCollaboratorsLeadersRequest,
  savePlanRequest,
  getPlanRequest,
  updateStatePlanRequest,
  setMetricsSelected,
  usersRequest,
  resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlanForm);
