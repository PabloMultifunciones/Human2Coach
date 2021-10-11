import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// pick a date util library
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import DateFnsUtils from '@date-io/date-fns';

import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';

/** *******Libs********* */
import GeneralFunctions from '../../libs/GeneralFunctions';

export default function TimeOption(props) {
  const { t } = useTranslation();
  const [
    {
      points1,
      rangeFrom1,
      rangeto1,
      color1,
      points2,
      rangeFrom2,
      rangeto2,
      color2,
      points3,
      rangeFrom3,
      rangeto3,
      color3
    },
    setState
  ] = useState({
    points1: props.points1 ? props.points1 : 0,
    rangeFrom1: props.rangeFrom1
      ? new Date(`0000-01-01T ${props.rangeFrom1}`)
      : new Date('0000-01-01T00:00:00'),
    rangeto1: props.rangeto1
      ? new Date(`0000-01-01T ${props.rangeto1}`)
      : new Date('0000-01-01T00:00:00'),

    color1: props.color1 ? props.color1 : '#FF0000',

    points2: props.points2 ? props.points2 : 0,
    rangeFrom2: props.rangeFrom2
      ? new Date(`0000-01-01T ${props.rangeFrom2}`)
      : new Date('0000-01-01T00:00:00'),
    rangeto2: props.rangeto2
      ? new Date(`0000-01-01T ${props.rangeto2}`)
      : new Date('0000-01-01T00:00:00'),

    color2: props.color2 ? props.color2 : '#FFFF00',

    points3: props.points3 ? props.points3 : 0,
    rangeFrom3: props.rangeFrom3
      ? new Date(`0000-01-01T ${props.rangeFrom3}`)
      : new Date('0000-01-01T00:00:00'),
    rangeto3: props.rangeto3
      ? new Date(`0000-01-01T ${props.rangeto3}`)
      : new Date('0000-01-01T00:00:00'),

    color3: props.color3 ? props.color3 : '#00D800'
  });

  /** ********General functions************ */

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
    props.setData({ name, value });
  }

  function handleChangeTimeFromOne(target) {
    setState((prevState) => ({ ...prevState, rangeFrom1: target }));
    props.setData({
      name: 'rangeFrom1',
      value: GeneralFunctions.formatDate(target)
    });
  }
  function handleChangeTimeToOne(target) {
    setState((prevState) => ({ ...prevState, rangeto1: target }));
    props.setData({
      name: 'rangeto1',
      value: GeneralFunctions.formatDate(target)
    });
  }

  function handleChangeTimeFromTwo(target) {
    setState((prevState) => ({ ...prevState, rangeFrom2: target }));
    props.setData({
      name: 'rangeFrom2',
      value: GeneralFunctions.formatDate(target)
    });
  }
  function handleChangeTimeToTwo(target) {
    setState((prevState) => ({ ...prevState, rangeto2: target }));
    props.setData({
      name: 'rangeto2',
      value: GeneralFunctions.formatDate(target)
    });
  }

  function handleChangeTimeFromThree(target) {
    setState((prevState) => ({ ...prevState, rangeFrom3: target }));
    props.setData({
      name: 'rangeFrom3',
      value: GeneralFunctions.formatDate(target)
    });
  }
  function handleChangeTimeToThree(target) {
    setState((prevState) => ({ ...prevState, rangeto3: target }));
    props.setData({
      name: 'rangeto3',
      value: GeneralFunctions.formatDate(target)
    });
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item xs={12} md={12} lg={12}>
          <h3>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 1</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            onChange={handleChange}
            value={points1}
            name="points1"
            id="points1"
            type="number"
            label={t('points.label', 'Points')}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-from', 'From')}
            value={rangeFrom1}
            fullWidth
            onChange={handleChangeTimeFromOne}
            name="rangeFrom1"
            id="rangeFrom1"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-to', 'To')}
            value={rangeto1}
            fullWidth
            onChange={handleChangeTimeToOne}
            name="rangeto1"
            id="rangeto1"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="div-d-flex">
          <TextField
            onChange={handleChange}
            value={color1}
            name="color1"
            id="color1"
            label={t('menu.metric-panel-dialog-number-color', 'Color')}
            type="color"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <h3>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 2</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            onChange={handleChange}
            value={points2}
            name="points2"
            id="points2"
            type="number"
            label={t('points.label', 'Points')}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-from', 'From')}
            value={rangeFrom2}
            fullWidth
            onChange={handleChangeTimeFromTwo}
            name="rangeFrom2"
            id="rangeFrom2"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-to', 'To')}
            value={rangeto2}
            fullWidth
            onChange={handleChangeTimeToTwo}
            name="rangeto2"
            id="rangeto2"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="div-d-flex">
          <TextField
            onChange={handleChange}
            value={color2}
            name="color2"
            id="color2"
            label={t('menu.metric-panel-dialog-number-color', 'Color')}
            type="color"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <h3>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 3</h3>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            onChange={handleChange}
            value={points3}
            name="points3"
            id="points3"
            type="number"
            label={t('points.label', 'Points')}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-from', 'From')}
            value={rangeFrom3}
            fullWidth
            onChange={handleChangeTimeFromThree}
            name="rangeFrom3"
            id="rangeFrom3"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <TimePicker
            ampm={false}
            okLabel={t('accept.label', 'Accept')}
            cancelLabel={t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            clearLabel={t('menu.badge-panel-dialog-minimum-points-clean-up', 'Clean up')}
            openTo="hours"
            inputVariant="outlined"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            label={t('menu.metric-panel-dialog-number-option-to', 'To')}
            value={rangeto3}
            fullWidth
            onChange={handleChangeTimeToThree}
            name="rangeto3"
            id="rangeto3"
            renderInput={(params) => <TextField fullWidth {...params} />}
            mask="__:__:__"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} className="div-d-flex">
          <TextField
            onChange={handleChange}
            value={color3}
            name="color3"
            id="color3"
            label={t('menu.metric-panel-dialog-number-color', 'Color')}
            type="color"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </LocalizationProvider>
    </>
  );
}
