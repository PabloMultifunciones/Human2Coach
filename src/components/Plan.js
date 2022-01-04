import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { format } from 'date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import toastr from 'toastr';
import LetterCounter from './Globals/LetterCounter';

import Spinner from './Spinner';

import { TableFeedback, AppPlanMetrics } from './_dashboard/app';

import {
  getPlanRequest,
  updateStatePlanRequest,
  updateStateCheckboxPlanRequest
} from '../actions/plansActions';

import 'toastr/build/toastr.min.css';

function Plan(props) {
  const [
    {
      collaborator,
      feedback,
      dashboard,
      notes,
      comments,
      date,
      dateCommitment,
      addReminder,
      ownComments,
      received,
      notReminder
    },
    setState
  ] = useState({
    collaborator: { name: '', lastName: '' },
    feedback: 'objective',
    dashboard: 'oneon',
    notes: '',
    comments: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd'),
    ownComments: '',
    received: false,
    notReminder: false
  });
  const { t } = useTranslation();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    props.getPlanRequest(params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.plansReducer.plansSelected) {
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
        ownComments: props.plansReducer.plansSelected.userComment
          ? props.plansReducer.plansSelected.userComment
          : '',
        notReminder: props.plansReducer.plansSelected.reminderDate === null
      }));
    }

    // eslint-disable-next-line
  }, [props.plansReducer.plansSelected]);

  const handleChange = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));

    if (event.target.name === 'received') {
      submitReceivedCheckbox(props.plansReducer.plansSelected);
    }
  };

  const submitSend = async (plan) => {
    let status;

    await props
      .updateStatePlanRequest({
        id: plan.id,
        userComment: ownComments,
        status: 'SENDED'
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error(t('plans-error-saved', 'Se produjo un error al intentar guardar el plan'));
    } else {
      toastr.success(t('plans-successfully', 'Plan guardado con éxito'));
      navigate('/dashboard/plans');
    }
  };

  const submitReceived = async (plan) => {
    let status;

    await props
      .updateStatePlanRequest({
        id: plan.id,
        userComment: ownComments,
        status: 'ACKNOWLEGED'
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error(t('plans-error-saved', 'Se produjo un error al intentar guardar el plan'));
    } else {
      toastr.success(t('plans-successfully', 'Plan guardado con éxito'));
      navigate('/dashboard/plans');
    }
  };

  const submitReceivedCheckbox = async (plan) => {
    let status;

    await props
      .updateStateCheckboxPlanRequest({
        id: plan.id,
        userComment: ownComments,
        status: 'ACKNOWLEGED'
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error(t('plans-error-saved', 'Se produjo un error al intentar guardar el plan'));
    } else {
      toastr.success(t('plans-successfully', 'Plan guardado con éxito'));
      navigate('/dashboard/plans');
    }
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            {props.plansReducer.plans_charging ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Spinner />
              </Grid>
            ) : (
              <>
                {params.id && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link to="/dashboard/plans" rel="noopener noreferrer">
                      <Button variant="contained">
                        <ArrowBackIosIcon />
                        {t('back.label', 'Anterior')}
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <h3> {`${collaborator.name} ${collaborator.lastName}`}</h3>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl component="fieldset" disabled>
                    <FormLabel component="legend">
                      {t('feedback-type', 'Tipo de feedback')}
                    </FormLabel>
                    <RadioGroup aria-label="feedback" name="feedback" value={feedback}>
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
                  <FormControl component="fieldset" className="ml-30-percent" disabled>
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
                {params.id &&
                  props.plansReducer.plansSelected.metricConfs &&
                  props.plansReducer.plansSelected.metricConfs.length > 0 && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      {params.id ? (
                        <>
                          <section className="mb-2">
                            <TableFeedback
                              title=""
                              metrics={props.plansReducer.plansSelected.metricConfs}
                              disabled
                              checked
                            />
                          </section>

                          <AppPlanMetrics planSelected={props.plansReducer.plansSelected} />
                        </>
                      ) : (
                        <TableFeedback
                          title=""
                          metrics={props.plansReducer.plansSelected.metricConfs}
                          disabled
                        />
                      )}
                    </Grid>
                  )}

                {props.loginReducer.userLogged &&
                  props.loginReducer.userLogged.user.position !== 3 && (
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
                        disabled
                      />
                    </Grid>
                  )}

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    className="w-100"
                    id="outlined-multiline-static"
                    label={t('leader-comments', 'Comentarios del líder')}
                    multiline
                    rows={8}
                    variant="outlined"
                    value={comments}
                    name="comments"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    className="w-100"
                    id="outlined-date"
                    label={t('sent', 'Envíado')}
                    type="date"
                    value={date}
                    name="date"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    className="w-100"
                    id="outlined-dateCommitment"
                    label={t('commitment', 'Compromiso')}
                    type="date"
                    value={dateCommitment}
                    name="dateCommitment"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className="d-flex-between">
                  <TextField
                    className="w-100"
                    id="outlined-addReminder"
                    label={t('reminder', 'Recordatorio')}
                    type="date"
                    value={addReminder}
                    variant="outlined"
                    name="addReminder"
                    disabled
                  />

                  <FormControlLabel
                    className="ml-1"
                    control={
                      <Checkbox
                        checked={notReminder}
                        label={t('no-reminder', 'Sin recordatorio')}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                    label={t('no-reminder', 'Sin recordatorio')}
                  />
                </Grid>

                {props.plansReducer.plansSelected && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      className="w-100"
                      id="outlined-multiline-static"
                      label={t('menu.badge-panel-dialog-delivery-comments', 'Comentarios')}
                      multiline
                      rows={8}
                      variant="outlined"
                      value={ownComments}
                      name="ownComments"
                      inputProps={{ maxLength: 255 }}
                      disabled={
                        (props.loginReducer.userLogged &&
                          props.loginReducer.userLogged.user.id !==
                            props.plansReducer.plansSelected.user.id) ||
                        props.plansReducer.plansSelected.status === 'ACKNOWLEGED' ||
                        false
                      }
                      onChange={(event) => {
                        handleChange(event, event.target.value);
                      }}
                    />
                    <LetterCounter letters={ownComments} />
                  </Grid>
                )}

                {props.plansReducer.plansSelected &&
                props.loginReducer.userLogged &&
                props.loginReducer.userLogged.user.id ===
                  props.plansReducer.plansSelected.user.id ? (
                  <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex-between">
                    <div>
                      <Link to="/dashboard/plans" rel="noopener noreferrer">
                        <Button className="bg-danger" color="inherit" variant="contained">
                          {t('back.label', 'Anterior')}
                        </Button>
                      </Link>

                      {props.plansReducer.plansSelected &&
                        props.plansReducer.plansSelected.status === 'DRAFT' && (
                          <Button
                            onClick={() => submitSend(props.plansReducer.plansSelected)}
                            color="secondary"
                            variant="contained"
                            className="ml-1"
                          >
                            {t('send', 'Enviar')}
                          </Button>
                        )}

                      {props.plansReducer.plansSelected &&
                        props.plansReducer.plansSelected.status === 'SENDED' && (
                          <Button
                            onClick={() => submitReceived(props.plansReducer.plansSelected)}
                            color="secondary"
                            variant="contained"
                            className="ml-1"
                          >
                            {t('received', 'Recibido')}
                          </Button>
                        )}
                    </div>
                    {props.plansReducer.plansSelected &&
                      props.plansReducer.plansSelected.status === 'SENDED' && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultValue={false}
                              label={t('received', 'Recibido')}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              value={received}
                              name="received"
                              onChange={(event, value) => {
                                handleChange(event, value);
                              }}
                            />
                          }
                          label={t('received', 'Recibido')}
                        />
                      )}
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex-between">
                    <div>
                      <Link
                        to="/dashboard/plans"
                        rel="noopener noreferrer"
                        className="not-underline"
                      >
                        <Button className="bg-danger" color="inherit" variant="contained">
                          {t('back.label', 'Anterior')}
                        </Button>
                      </Link>

                      {props.plansReducer.plansSelected &&
                        props.plansReducer.plansSelected.status === 'DRAFT' && (
                          <Button
                            onClick={() => submitSend(props.plansReducer.plansSelected)}
                            color="secondary"
                            variant="contained"
                            className="ml-1"
                          >
                            {t('send', 'Enviar')}
                          </Button>
                        )}
                    </div>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = ({ plansReducer, loginReducer }) => ({
  plansReducer,
  loginReducer
});
const mapDispatchToProps = {
  getPlanRequest,
  updateStatePlanRequest,
  updateStateCheckboxPlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
