import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { add, getWeek, format, subDays, startOfWeek } from 'date-fns';
import toastr from 'toastr';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import FeedbackDialog from './Dialogs/FeedbackDialog';
import TimeEntryFollowDialog from './Dialogs/TimeEntryFollowDialog';

import 'toastr/build/toastr.min.css';

import { TableFeedbackDone } from './_dashboard/app';
import { usersRequest, getCollaboratorsRequest } from '../actions/generalActions';

import { resetState } from '../actions/plansActions';

function EntryFollowForm(props) {
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
    confidence: false,
    collaborator: '',
    feedback: '',
    dashboard: '',
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
    if (!props.generalReducer.users) {
      props.usersRequest();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      collaborator: props.generalReducer.users ? props.generalReducer.users.content[0] : ''
    }));
  }, [props.generalReducer.users]);

  function getTablehead() {
    return [
      { id: 'metric', label: 'Métrica', alignRight: false },
      { id: 'objective', label: 'Objetivo', alignRight: false },
      {
        id: 'wbefore',
        label: `W${getWeek(subDays(startOfWeek(new Date()), 7))}  ${format(
          subDays(startOfWeek(new Date()), 7),
          'dd/MM/yyyy'
        )}`,
        alignRight: false
      },
      {
        id: 'wafter',
        label: `W${getWeek(subDays(startOfWeek(new Date()), 7))}  ${format(
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

  const handleClose = () => {
    if (!addReminder || addReminder === '') {
      toastr.error('La fecha de envío es requerida');
    }
  };

  const setExtraTime = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            {props.generalReducer.users_charging ? (
              <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex justify-center">
                <Spinner />
              </Grid>
            ) : (
              <>
                {props.generalReducer.users && props.generalReducer.users.content && (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      id="combo-box-demo-login"
                      value={collaborator || props.generalReducer.users.content[0]}
                      options={props.generalReducer.users.content}
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
                      <FormLabel component="legend">Tipo de feedback</FormLabel>
                      <RadioGroup
                        aria-label="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={(event, value) => {
                          handleChange(event, value);
                        }}
                      >
                        <FormControlLabel value="objective" control={<Radio />} label="Objetivo" />
                        <FormControlLabel
                          value="general"
                          control={<Radio />}
                          label="Feedback General"
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
                        <FormControlLabel value="oneon" control={<Radio />} label="One on one" />
                        <FormControlLabel value="pds" control={<Radio />} label="PDS" />
                        <FormControlLabel value="pi" control={<Radio />} label="PIP" />
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
                        label="Notas"
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
                        label="Comentarios"
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
                        label="Envíado"
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
                        label="Compromiso"
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
                        label="Recordatorio"
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

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button className="bg-danger" color="inherit" variant="contained">
                    Cancelar{' '}
                  </Button>
                  <Button color="secondary" variant="contained" className="ml-1">
                    Guardar
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className="ml-1"
                    onClick={handleClose}
                  >
                    Enviar
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

      {feedback && feedback === 'objective' && <FeedbackDialog collaborator={collaborator} />}
    </>
  );
}

const mapStateToProps = (generalReducer) => generalReducer;
const mapDispatchToProps = {
  getCollaboratorsRequest,
  usersRequest,
  resetState
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryFollowForm);
