import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

import { add, format, subDays, startOfWeek } from 'date-fns';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import FeedbackDialog from './Dialogs/FeedbackDialog';
import TimeEntryFollowDialog from './Dialogs/TimeEntryFollowDialog';

import LetterCounter from './Globals/LetterCounter';

import 'toastr/build/toastr.min.css';

import { TableFeedbackDone } from './_dashboard/app';
import {
  usersRequest,
  getCollaboratorsRequest,
  getCollaboratorsLeadersRequest
} from '../actions/generalActions';

import {
  getPlanRequest,
  savePlanRequest,
  saveSendedPlanRequest,
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
      notReminder
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
    notReminder: false
  });

  useEffect(() => {
    if (!props.generalReducer.collaborators) {
      if (props.loginReducer.userLogged && props.loginReducer.userLogged.user.position === 1) {
        props.getCollaboratorsLeadersRequest(999);
      } else {
        props.getCollaboratorsRequest(999);
      }
    }
    props.getPlanRequest(props.id);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.plansReducer.plansSelected && props.generalReducer.collaborators) {
      setState((prevState) => ({
        ...prevState,
        collaborator: props.plansReducer.plansSelected.user,
        feedback: props.plansReducer.plansSelected.isObjetive ? 'objective' : 'general',
        dashboard: props.plansReducer.plansSelected.isPDS
          ? 'pds'
          : props.plansReducer.plansSelected.isPIP
          ? 'pip'
          : props.plansReducer.plansSelected.isOneOnOne
          ? 'oneonone'
          : '',
        notes: props.plansReducer.plansSelected.supervisorNote,
        comments: props.plansReducer.plansSelected.supervisorComment,
        date: format(new Date(props.plansReducer.plansSelected.sendedDate), 'yyyy-MM-dd'),
        dateCommitment: props.plansReducer.plansSelected.commitmentDate
          ? format(new Date(props.plansReducer.plansSelected.commitmentDate), 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
        addReminder: props.plansReducer.plansSelected.reminderDate
          ? format(new Date(props.plansReducer.plansSelected.reminderDate), 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
        notReminder: props.plansReducer.plansSelected.reminderDate === null,
        sick: findByIndex(props.plansReducer.plansSelected.exceptions, 'Sick leave')
          ? props.plansReducer.plansSelected.exceptions[
              findByIndex(props.plansReducer.plansSelected.exceptions, 'Sick leave')
            ].isChecked
          : false,
        vacations: findByIndex(props.plansReducer.plansSelected.exceptions, 'Vacations')
          ? props.plansReducer.plansSelected.exceptions[
              findByIndex(props.plansReducer.plansSelected.exceptions, 'Vacations')
            ].isChecked
          : false,
        disciplinaryProcess: findByIndex(
          props.plansReducer.plansSelected.exceptions,
          'Disciplinary process'
        )
          ? props.plansReducer.plansSelected.exceptions[
              findByIndex(props.plansReducer.plansSelected.exceptions, 'Disciplinary process')
            ].isChecked
          : false
      }));

      if (
        props.plansReducer.plansSelected.metricConfs &&
        props.plansReducer.plansSelected.metricConfs.length > 0
      ) {
        props.plansReducer.plansSelected.metricConfs.forEach((row) => {
          props.setMetricsSelected({
            ...row,
            metricConfName: row.metricConf ? row.metricConf.name : 'N/A',
            targetValue: row.targetValue,
            date1: `${format(
              subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7),
              'yyyy-MM-dd'
            )}T00:00:00`,
            date2: `${format(
              subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 1),
              'yyyy-MM-dd'
            )}T00:00:00`,
            value1: row.value1,
            value2: row.value2
          });
        });
      }
    }

    // eslint-disable-next-line
  }, [props.plansReducer.plansSelected, props.generalReducer.collaborators]);

  function getTablehead() {
    return [
      { id: 'metric', label: t('metrics.label', 'Métricas'), alignRight: false },
      {
        id: 'objective',
        label: t('menu.metric-panel-dialog-objective', 'Objetivo'),
        alignRight: false
      },
      {
        id: 'wbefore',
        label: `W${GeneralFunctions.getWeekCountBefore()}  ${format(
          subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7),
          'dd/MM/yyyy'
        )}`,
        alignRight: false
      },
      {
        id: 'wafter',
        label: `W${GeneralFunctions.getWeekCount()}  ${format(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          'dd/MM/yyyy'
        )}`,
        alignRight: false
      },
      { id: 'check', label: 'Check', alignRight: false }
    ];
  }

  const handleChange = (event, value) => {
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

  const submitFunction = async (type) => {
    const metricArray = [];

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

    if (type === 'SENDED') {
      await props.saveSendedPlanRequest(json).then((r) => (status = r));
    } else {
      await props.savePlanRequest(json).then((r) => (status = r));
    }

    if (status === 'ERROR') {
      toastr.error(
        t(
          'menu.metric-panel-dialog-message-error-save-metric-two',
          'Ha ocurrido un error al intentar guardar la métrica'
        )
      );
    } else {
      toastr.success('Plan saved successfully');

      setState((prevState) => ({
        ...prevState,
        collaborator: props.generalReducer.collaborators.content[0],
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
        notReminder: false
      }));
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

                    <FormControl component="fieldset" className="ml-30-percent">
                      <RadioGroup
                        aria-label="dashboard"
                        name="dashboard"
                        value={dashboard}
                        onChange={(event, value) => {
                          handleChange(event, value);
                        }}
                      >
                        <FormControlLabel value="oneonone" control={<Radio />} label="One on one" />
                        <FormControlLabel value="pds" control={<Radio />} label="P D S" />
                        <FormControlLabel value="pip" control={<Radio />} label="P I P" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                )}
                {feedback === 'objective' && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableFeedbackDone title="" tableHead={getTablehead()} newPlan />
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
                        inputProps={{ maxLength: 255 }}
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
                        inputProps={{ maxLength: 255 }}
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />

                      <LetterCounter letters={comments} />
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
                    <Button
                      color="secondary"
                      variant="contained"
                      className="ml-1"
                      onClick={() => submitFunction('DRAFT')}
                    >
                      {t('admin.header-dropdown-dialog-actions-save', 'Guardar')}
                    </Button>
                    <Button
                      onClick={() => submitFunction('SENDED')}
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

      {feedback && feedback === 'objective' && <FeedbackDialog collaborator={collaborator} />}
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
  saveSendedPlanRequest,
  setMetricsSelected,
  usersRequest,
  resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlanForm);
