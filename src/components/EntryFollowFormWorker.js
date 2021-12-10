import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { format } from 'date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import toastr from 'toastr';

import Spinner from './Spinner';

import { TableFeedback, AppPlanMetrics } from './_dashboard/app';

import { getPlanRequest, updateStatePlanRequest } from '../actions/plansActions';

import 'toastr/build/toastr.min.css';

function EntryFollowFormWorker(props) {
  const [
    { collaborator, feedback, dashboard, comments, date, dateCommitment, addReminder, ownComments },
    setState
  ] = useState({
    collaborator: { name: '', lastName: '' },
    feedback: 'objective',
    dashboard: 'oneon',
    comments:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptas explicabo commodi deleniti pariatur dolore sapiente obcaecati alias eaque quam ducimus, officiis saepe fugiat suscipit culpa. Voluptates tenetur omnis esse.',
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd'),
    ownComments: ''
  });

  const params = useParams();
  const navigate = useNavigate();

  function getTablehead() {
    return [
      { id: 'metric', label: 'Métrica', alignRight: false },
      { id: 'objective', label: 'Objetivo', alignRight: false },
      { id: 'wbefore', label: 'W44 (25/10/2021)', alignRight: false },
      { id: 'wafter', label: 'W44 (01/11/2021)', alignRight: false },
      { id: 'check', label: 'Check', alignRight: false }
    ];
  }

  useEffect(() => {
    props.getPlanRequest(params.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.plansSelected) {
      setState((prevState) => ({
        ...prevState,
        collaborator: props.plansSelected.user,
        feedback: props.plansSelected.isObjetive ? 'objective' : 'general',
        dashboard: props.plansSelected.isPDS
          ? 'pds'
          : props.plansSelected.isPIP
          ? 'pip'
          : props.plansSelected.isOneOnOne
          ? 'oneonone'
          : 'pds',
        comments: props.plansSelected.supervisorComment,
        date: format(new Date(props.plansSelected.commitmentDate), 'yyyy-MM-dd'),
        dateCommitment: format(new Date(props.plansSelected.sendedDate), 'yyyy-MM-dd'),
        addReminder: format(new Date(props.plansSelected.reminderDate), 'yyyy-MM-dd'),
        ownComments: ''
      }));
    }
    // eslint-disable-next-line
  }, [props.plansSelected]);

  const handleChange = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));
  };

  const submitSend = async (plan) => {
    let status;

    await props
      .updateStatePlanRequest({
        id: plan.id,
        status: 'SENDED'
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error('An error occurred while trying to save the plan');
    } else {
      toastr.success('Plan saved successfully');
      navigate('/dashboard/plans');
    }
  };

  const submitReceived = async (plan) => {
    let status;

    await props
      .updateStatePlanRequest({
        id: plan.id,
        status: 'ACKNOWLEGED'
      })
      .then((r) => (status = r));
    if (status === 'ERROR') {
      toastr.error('An error occurred while trying to save the plan');
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
            {props.plans_charging ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Spinner />
              </Grid>
            ) : (
              <>
                {' '}
                {params.id && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link to="/dashboard/plans" rel="noopener noreferrer">
                      <Button variant="contained">
                        <ArrowBackIosIcon />
                        Atrás
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <h3> {`${collaborator.name} ${collaborator.lastName}`}</h3>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex">
                  <FormControl component="fieldset" disabled>
                    <FormLabel component="legend">Tipo de feedback</FormLabel>
                    <RadioGroup aria-label="feedback" name="feedback" value={feedback}>
                      <FormControlLabel value="objective" control={<Radio />} label="Objetivo" />
                      <FormControlLabel
                        value="general"
                        control={<Radio />}
                        label="Feedback General"
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
                      <FormControlLabel value="pds" control={<Radio />} label="PDS" />
                      <FormControlLabel value="pi" control={<Radio />} label="PIP" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {params.id &&
                  props.plansSelected.metricConfs &&
                  props.plansSelected.metricConfs.length > 0 && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      {params.id ? (
                        <>
                          <section className="mb-2">
                            <TableFeedback
                              title=""
                              metrics={props.plansSelected.metricConfs}
                              disabled
                              checked
                            />
                          </section>

                          <AppPlanMetrics planSelected={props.plansSelected} />
                        </>
                      ) : (
                        <TableFeedback
                          title=""
                          tableHead={getTablehead()}
                          metrics={props.plansSelected.metricConfs}
                          disabled
                        />
                      )}
                    </Grid>
                  )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    className="w-100"
                    id="outlined-multiline-static"
                    label="Comentarios del lider"
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
                    label="Envíado"
                    type="date"
                    value={dateCommitment}
                    name="dateCommitment"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    className="w-100"
                    id="outlined-date"
                    label="Compromiso"
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
                    id="outlined-date"
                    label="Recordatorio"
                    type="addReminder"
                    value={addReminder}
                    variant="outlined"
                    name="addReminder"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    className="w-100"
                    id="outlined-multiline-static"
                    label="Comentarios"
                    multiline
                    rows={8}
                    variant="outlined"
                    value={ownComments}
                    name="ownComments"
                    onChange={(event) => {
                      handleChange(event, event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex-between">
                  <div>
                    <Link to="/dashboard/plans" rel="noopener noreferrer">
                      <Button className="bg-danger" color="inherit" variant="contained">
                        Cancel
                      </Button>
                    </Link>

                    {props.plansSelected && props.plansSelected.status === 'DRAFT' && (
                      <Button
                        onClick={() => submitSend(props.plansSelected)}
                        color="secondary"
                        variant="contained"
                        className="ml-1"
                      >
                        Send
                      </Button>
                    )}

                    {props.plansSelected && props.plansSelected.status === 'SENDED' && (
                      <Button
                        onClick={() => submitReceived(props.plansSelected)}
                        color="secondary"
                        variant="contained"
                        className="ml-1"
                      >
                        Received
                      </Button>
                    )}
                  </div>
                  {props.plansSelected && props.plansSelected.status === 'SENDED' && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked
                          label="Recibido"
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label="Recibido"
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = ({ plansReducer }) => plansReducer;

const mapDispatchToProps = {
  getPlanRequest,
  updateStatePlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryFollowFormWorker);
