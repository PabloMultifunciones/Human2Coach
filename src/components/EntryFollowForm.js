import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { add, format } from 'date-fns';
import toastr from 'toastr';
import faker from 'faker';

import FeedbackDialog from './Dialogs/FeedbackDialog';
import TimeEntryFollowDialog from './Dialogs/TimeEntryFollowDialog';

import 'toastr/build/toastr.min.css';

import { TableFeedbackDone } from './_dashboard/app';

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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 }
];

export default function EntryFollowForm() {
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                id="combo-box-demo-login"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                onChange={(event, value) =>
                  handleChange({ target: { name: 'collaborator' } }, value)
                }
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Colaborador" variant="outlined" />
                )}
              />
            </Grid>

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
                <TableFeedbackDone title="" tableHead={getTablehead()} metrics={metrics} newPlan />
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
              <Button color="primary" variant="contained" className="ml-1" onClick={handleClose}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {feedback && feedback === 'objective' && <FeedbackDialog />}
    </>
  );
}
