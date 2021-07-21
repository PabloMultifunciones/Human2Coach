import React from 'react';
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import { format } from 'date-fns';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function CoachingSessionFormWorker() {
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
    comments:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus ut dignissimos maxime at, earum perspiciatis ipsum cumque atque nisi assumenda neque, quam ipsam tenetur. Dignissimos ex soluta dicta repellendus. Esse.',
    checkedA: false,
    behavior:
      'Doubt over the phone decreases our CSAT with a direct impact. Practice sentences that ends with an affirmation',
    development: 'Ending phrases with an upper tone, sounds as asking the customer for validation'
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { comments, dateTitle } = state;

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

            <Grid item xs={12} sm={12} md={12} lg={12} className="list-coaching-session">
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ArrowForwardIosIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Review" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ArrowForwardIosIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Coaching" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ArrowForwardIosIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Feedback" />
                </ListItem>
              </List>
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
                disabled
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
