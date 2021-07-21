import React from 'react';
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import { format } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';

export default function CoachingSessionFormBoss() {
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
    dateTitle: format(new Date(), 'EEEE MMM dd, yyyy - p'),
    commitment: '',
    comments: '',
    checkedA: false,
    behavior:
      'Doubt over the phone decreases our CSAT with a direct impact. Practice sentences that ends with an affirmation',
    development: 'Ending phrases with an upper tone, sounds as asking the customer for validation'
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { comments, dateTitle, checkedA } = state;

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={dateTitle}
                color="secondary"
                className="chip-custom"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h1>Coaching Session #3</h1>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quam atque
                expedita ullam dicta cum maxime, harum unde earum fuga, praesentium assumenda
                perferendis natus eius quia cupiditate? Eum, laborum consectetur.
              </p>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h4>Details</h4>
              <hr />

              <div className="div-details-coaching mt-1">
                <div className="d-flex">
                  <LocationOnIcon />
                  https://meet.google.com/cpr-peqc-fno?hs=151
                </div>

                <div className="d-flex div-access-time">
                  <AccessTimeIcon />
                  60 minutes
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h4>Attendance</h4>

              <div className="d-flex mt-1">
                <img
                  alt="photoURL"
                  src="/static/mock-images/avatars/avatar_default.jpg"
                  className="img-custom-coaching-session"
                />

                <img
                  alt="photoURL"
                  src="/static/mock-images/avatars/avatar_default.jpg"
                  className="img-custom-coaching-session ml-1"
                />

                <img
                  alt="photoURL"
                  src="/static/mock-images/avatars/avatar_default.jpg"
                  className="img-custom-coaching-session ml-1"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h4>Action items</h4>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex">
              <FormControl className="w-100">
                <InputLabel htmlFor="input-with-icon-adornment">Add new action item</InputLabel>
                <OutlinedInput
                  id="input-with-icon-adornment"
                  variant="outlined"
                  label="Add new action item"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button variant="contained" className="button-custom-coaching-session ml-1">
                <AddIcon />
                Item
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h4>Comments</h4>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} className="d-flex">
              <img
                alt="photoURL"
                src="/static/mock-images/avatars/avatar_default.jpg"
                className="img-custom-coaching-session mr-1"
              />
              <FormControl className="w-100">
                <InputLabel htmlFor="input-with-icon-adornment">Write a comment</InputLabel>
                <OutlinedInput
                  id="input-with-icon-comment"
                  variant="outlined"
                  label="Add new action item"
                />
              </FormControl>

              <Button variant="contained" className="button-custom-coaching-session ml-1">
                <AddIcon />
                Comment
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h4>Note</h4>
              <hr />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-search-two"
                type="text"
                disabled
                defaultValue={`Session note from ${dateTitle}`}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                className="w-100"
                id="outlined-multiline-static"
                label="Session note"
                multiline
                rows={4}
                variant="outlined"
                value={comments}
                name="comments"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch checked={checkedA} onChange={handleChangeCheckBox} name="checkedA" />
                  }
                  label="Set note as private"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
