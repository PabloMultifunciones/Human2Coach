import React from 'react';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function EntryFollowForm() {
  const [age, setAge] = React.useState('');
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    confidence: false
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine, confidence } = state;

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl className="w-100 mb-2">
                <InputLabel id="demo-simple-select-label">Perfomance Metric</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Perfomance Metric"
                  value={age}
                  onChange={handleChange}
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
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                className="w-100"
                id="outlined-search"
                label="Actual performance"
                type="text"
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
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button variant="contained">Save details</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
