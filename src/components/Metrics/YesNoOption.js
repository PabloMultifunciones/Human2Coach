import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
    marginTop: '1rem'
  }
}));

export default function YesNoOption(props) {
  /** *************Styles************ */
  const classes = useStyles();
  const { t } = useTranslation();
  const [{ points1, rangeFrom1 }, setState] = useState({
    points1: props.points1 ? props.points1 : 0,
    rangeFrom1: props.rangeFrom1 ? props.rangeFrom1 : ''
  });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
    props.setData({ name, value });
  }

  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={points1}
          name="points1"
          id="points1"
          label={t('points.label', 'Points')}
          variant="outlined"
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="rangeFrom1-select-outlined-label">{t('value.label', 'Value')}</InputLabel>
          <Select
            onChange={handleChange}
            value={rangeFrom1}
            labelId="rangeFrom1"
            id="rangeFrom1"
            name="rangeFrom1"
            label={t('value.label', 'Value')}
          >
            <MenuItem value>
              {t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')}{' '}
            </MenuItem>
            <MenuItem value={false}>
              {t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
