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
import { add, format, subDays, startOfWeek } from 'date-fns';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import FeedbackDialog from './Dialogs/FeedbackDialog';
import TimeEntryFollowDialog from './Dialogs/TimeEntryFollowDialog';

import 'toastr/build/toastr.min.css';

import { TableFeedbackDone } from './_dashboard/app';
import {
  usersRequest,
  getCollaboratorsRequest,
  getCollaboratorsLeadersRequest
} from '../actions/generalActions';

import { savePlanRequest, resetState } from '../actions/plansActions';
import GeneralFunctions from '../libs/GeneralFunctions';

function NewPlanForm(props) {
  const { t } = useTranslation();

  const [
    {
      collaborator,
      feedback,
      dashboard,
      comments,
      notes,
      sick,
      holidays,
      disciplinaryProcess,
      date,
      dateCommitment,
      addReminder
    },
    setState
  ] = useState({
    collaborator: '',
    feedback: '',
    dashboard: 'oneonone',
    comments: '',
    notes: '',
    sick: false,
    holidays: false,
    disciplinaryProcess: false,
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (!props.generalReducer.collaborators) {
      if (props.loginReducer.userLogged && props.loginReducer.userLogged.user.position === 1) {
        props.getCollaboratorsLeadersRequest(999);
      } else {
        props.getCollaboratorsRequest(999);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.generalReducer.collaborators) {
      setState((prevState) => ({
        ...prevState,
        collaborator:
          props.generalReducer.collaborators && collaborator === ''
            ? props.generalReducer.collaborators.content[0]
            : collaborator
      }));
    }
    // eslint-disable-next-line
  }, [props.generalReducer.collaborators]);

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
          subDays(startOfWeek(new Date()), 7),
          'dd/MM/yyyy'
        )}`,
        alignRight: false
      },
      {
        id: 'wafter',
        label: `W${GeneralFunctions.getWeekCount()}  ${format(
          subDays(startOfWeek(new Date()), 1),
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
        metricConf: { ...element.metricConf },
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
      sendedDate: `${dateCommitment}T00:00:00`,
      status: type,
      isSended: false,
      commitmentDate: `${date}T00:00:00`,
      reminderDate: `${addReminder}T00:00:00`,
      isException: sick === true || holidays === true || disciplinaryProcess === true,
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
          isChecked: holidays
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

    await props.savePlanRequest(json).then((r) => (status = r));

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
        holidays: false,
        disciplinaryProcess: false,
        date: format(new Date(), 'yyyy-MM-dd'),
        dateCommitment: format(new Date(), 'yyyy-MM-dd'),
        addReminder: format(new Date(), 'yyyy-MM-dd')
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
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
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
                        value={comments}
                        name="comments"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <TextField
                        className="w-100"
                        id="outlined-date"
                        label={t('sent', 'Envíado')}
                        type="date"
                        disabled
                        value={dateCommitment}
                        name="dateCommitment"
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} className="d-flex-between">
                      <TextField
                        className="w-100"
                        id="outlined-date"
                        label={t('commitment', 'Compromiso')}
                        type="date"
                        value={addReminder}
                        inputProps={
                          sick || holidays || disciplinaryProcess
                            ? {}
                            : { max: format(add(new Date(), { days: 10 }), 'yyyy-MM-dd') }
                        }
                        name="addReminder"
                        variant="outlined"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
                      />
                      <TimeEntryFollowDialog
                        sick={sick}
                        holidays={holidays}
                        disciplinaryProcess={disciplinaryProcess}
                        setExtraTime={(name, value) => setExtraTime(name, value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                      <TextField
                        className="w-100"
                        id="outlined-date"
                        label={t('reminder', 'Recordatorio')}
                        type="date"
                        value={date}
                        variant="outlined"
                        name="date"
                        onChange={(event) => {
                          handleChange(event, event.target.value);
                        }}
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
  usersRequest,
  resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlanForm);
