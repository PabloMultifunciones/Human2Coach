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
      received
    },
    setState
  ] = useState({
    collaborator: { name: '', lastName: '' },
    feedback: 'objective',
    dashboard: 'oneon',
    notes: '',
    comments:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste voluptas explicabo commodi deleniti pariatur dolore sapiente obcaecati alias eaque quam ducimus, officiis saepe fugiat suscipit culpa. Voluptates tenetur omnis esse.',
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd'),
    ownComments: '',
    received: false
  });

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
        date: format(new Date(props.plansReducer.plansSelected.commitmentDate), 'yyyy-MM-dd'),
        dateCommitment: format(new Date(props.plansReducer.plansSelected.sendedDate), 'yyyy-MM-dd'),
        addReminder: format(new Date(props.plansReducer.plansSelected.reminderDate), 'yyyy-MM-dd'),
        ownComments: ''
      }));
    }
    // eslint-disable-next-line
  }, [props.plansReducer.plansSelected]);

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
    if (!received) {
      toastr.error('You must check the received checkbox');
      return;
    }
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
                        Atrás
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <h3> {`${collaborator.name} ${collaborator.lastName}`}</h3>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
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
                      <FormControlLabel value="pip" control={<Radio />} label="PIP" />
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
                        label="Private notes (Visible to the leader)"
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
                    label="Comments"
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
                    label="Sent"
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
                    label="Commitment"
                    type="date"
                    value={addReminder}
                    name="addReminder"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    className="w-100"
                    id="outlined-date"
                    label="Reminder"
                    type="date"
                    value={date}
                    variant="outlined"
                    name="date"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    className="w-100"
                    id="outlined-multiline-static"
                    label="Comments"
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

                {props.loginReducer.userLogged &&
                props.loginReducer.userLogged.user.position === 3 ? (
                  <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex-between">
                    <div>
                      <Link to="/dashboard/plans" rel="noopener noreferrer">
                        <Button className="bg-danger" color="inherit" variant="contained">
                          Back
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
                            Send
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
                            Received
                          </Button>
                        )}
                    </div>
                    {props.plansReducer.plansSelected &&
                      props.plansReducer.plansSelected.status === 'SENDED' && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultValue={false}
                              label="Recibido"
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              value={received}
                              name="received"
                              onChange={(event, value) => {
                                handleChange(event, value);
                              }}
                            />
                          }
                          label="Recibido"
                        />
                      )}
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex-between">
                    <div>
                      <Link to="/dashboard/plans" rel="noopener noreferrer">
                        <Button className="bg-danger" color="inherit" variant="contained">
                          Back
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
                            Send
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
  updateStatePlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
