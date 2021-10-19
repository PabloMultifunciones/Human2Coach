import React from 'react';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { format } from 'date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function EntryFollowFormWorker() {
  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
    confidence: true,
    metric: 10,
    targetPerfomance: 89.5,
    actualPargetPerfomance: 83.54,
    date: format(new Date(), 'yyyy-MM-dd'),
    dateCommitment: format(new Date(), 'yyyy-MM-dd'),
    addReminder: format(new Date(), 'yyyy-MM-dd'),
    commitment: '',
    comments: '',
    behavior:
      'Doubt over the phone decreases our CSAT with a direct impact. Practice sentences that ends with an affirmation',
    development: 'Ending phrases with an upper tone, sounds as asking the customer for validation'
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeCheckBox = (/* event */) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    gilad,
    jason,
    antoine,
    confidence,
    metric,
    targetPerfomance,
    actualPargetPerfomance,
    date,
    dateCommitment,
    addReminder,
    commitment,
    comments,
    behavior,
    development
  } = state;

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl className="w-100">
                <InputLabel id="demo-simple-select-label">Perfomance Metric</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Perfomance Metric"
                  value={metric}
                  name="metric"
                  onChange={handleChange}
                  disabled
                >
                  <MenuItem value={10}>CSAT</MenuItem>
                  <MenuItem value={20}>AHT</MenuItem>
                  <MenuItem value={30}>DSL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                className="w-100"
                id="outlined-search-two"
                label="Target performance"
                type="text"
                disabled
                value={targetPerfomance}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                className="w-100"
                id="outlined-search"
                label="Actual performance"
                type="text"
                disabled
                value={actualPargetPerfomance}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-multiline-static"
                label="What is the key behavior, and what information is this based on?"
                multiline
                rows={4}
                variant="outlined"
                value={behavior}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h5>What is the key behavior, and what information is this based on?</h5>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={gilad} onChange={handleChangeCheckBox} name="gilad" />
                    }
                    label="Knowledge"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={jason} onChange={handleChangeCheckBox} name="jason" />
                    }
                    label="Proficiency"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={antoine} onChange={handleChangeCheckBox} name="antoine" />
                    }
                    label="Motivation"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={confidence}
                        onChange={handleChangeCheckBox}
                        name="confidence"
                      />
                    }
                    label="Confidence"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-multiline-static"
                label="What is the root cause, and how does it lead to the development need?"
                multiline
                rows={4}
                variant="outlined"
                value={development}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                className="w-100"
                id="outlined-date"
                label="Acknowledge Feedback"
                type="date"
                value={date}
                variant="outlined"
                name="date"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                className="w-100"
                id="outlined-date"
                label="Commitment date"
                type="date"
                value={dateCommitment}
                name="dateCommitment"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                className="w-100"
                id="outlined-date"
                label="Add reminder"
                type="date"
                value={addReminder}
                name="addReminder"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-commitment"
                label="Commitment"
                type="text"
                value={commitment}
                multiline
                rows={4}
                name="commitment"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                variant="outlined"
                value={comments}
                name="comments"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>
              <Button variant="contained" className="ml-1">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
