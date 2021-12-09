import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import faker from 'faker';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { format } from 'date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { TableFeedback, AppPlanMetrics } from './_dashboard/app';

const metrics = [
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT cases',
    objective: 89,
    wbefore: 89,
    wafter: 89
  },

  {
    id: faker.datatype.uuid(),
    metric: 'CSAT chat',
    objective: 63,
    wbefore: 89,
    wafter: 89
  },

  {
    id: faker.datatype.uuid(),
    metric: 'CSAT chat',
    objective: 78,
    wbefore: 89,
    wafter: 89
  },

  {
    id: faker.datatype.uuid(),
    metric: 'CSAT cases',
    objective: 54,
    wbefore: 89,
    wafter: 89
  }
];

export default function EntryFollowFormWorker(props) {
  const [
    { feedback, dashboard, comments, date, dateCommitment, addReminder, ownComments },
    setState
  ] = useState({
    confidence: false,
    collaborator: { title: '3 Idiots', year: 2009 },
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

  function getTablehead() {
    return [
      { id: 'metric', label: 'Métrica', alignRight: false },
      { id: 'objective', label: 'Objetivo', alignRight: false },
      { id: 'wbefore', label: 'W44 (25/10/2021)', alignRight: false },
      { id: 'wafter', label: 'W44 (01/11/2021)', alignRight: false },
      { id: 'check', label: 'Check', alignRight: false }
    ];
  }

  const handleChange = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: value
    }));
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex">
              <FormControl component="fieldset" disabled>
                <FormLabel component="legend">Tipo de feedback</FormLabel>
                <RadioGroup aria-label="feedback" name="feedback" value={feedback}>
                  <FormControlLabel value="objective" control={<Radio />} label="Objetivo" />
                  <FormControlLabel value="general" control={<Radio />} label="Feedback General" />
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
                  <FormControlLabel value="oneon" control={<Radio />} label="One on one" />
                  <FormControlLabel value="pds" control={<Radio />} label="PDS" />
                  <FormControlLabel value="pi" control={<Radio />} label="PIP" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {props.id ? (
                <>
                  <section className="mb-2">
                    <TableFeedback
                      title=""
                      tableHead={getTablehead()}
                      metrics={metrics}
                      disabled
                      checked
                    />
                  </section>

                  <AppPlanMetrics />
                </>
              ) : (
                <TableFeedback title="" tableHead={getTablehead()} metrics={metrics} disabled />
              )}
            </Grid>

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
                label="Recordatorio"
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
                    Cancelar{' '}
                  </Button>
                </Link>

                <Button color="secondary" variant="contained" className="ml-1">
                  Guardar
                </Button>
              </div>

              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    label="Recibido"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                }
                label="Recibido"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
