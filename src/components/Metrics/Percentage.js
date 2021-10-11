import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

export default function Percentage(props) {
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
    rangeFrom1: props.rangeFrom1 ? props.rangeFrom1 : 0,
    rangeto1: props.rangeto1 ? props.rangeto1 : 0,
    color1: props.color1 ? props.color1 : '#FF0000',

    points2: props.points2 ? props.points2 : 0,
    rangeFrom2: props.rangeFrom2 ? props.rangeFrom2 : 0,
    rangeto2: props.rangeto2 ? props.rangeto2 : 0,
    color2: props.color2 ? props.color2 : '#FFFF00',

    points3: props.points3 ? props.points3 : 0,
    rangeFrom3: props.rangeFrom3 ? props.rangeFrom3 : 0,
    rangeto3: props.rangeto3 ? props.rangeto3 : 0,
    color3: props.color3 ? props.color3 : '#00D800'
  });

  function handleChange({ target: { name, value } }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
    props.setData({ name, value });
  }

  return (
    <>
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
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeFrom1}
          name="rangeFrom1"
          id="rangeFrom1"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-from', 'From')}
          variant="outlined"
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeto1}
          name="rangeto1"
          id="rangeto1"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-to', 'To')}
          variant="outlined"
          className="mt-2"
          fullWidth
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
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeFrom2}
          name="rangeFrom2"
          id="rangeFrom2"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-from', 'From')}
          variant="outlined"
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeto2}
          name="rangeto2"
          id="rangeto2"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-to', 'To')}
          variant="outlined"
          className="mt-2"
          fullWidth
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
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeFrom3}
          name="rangeFrom3"
          id="rangeFrom3"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-from', 'From')}
          variant="outlined"
          className="mt-2"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <TextField
          onChange={handleChange}
          value={rangeto3}
          name="rangeto3"
          id="rangeto3"
          type="number"
          label={t('menu.metric-panel-dialog-number-option-to', 'To')}
          variant="outlined"
          className="mt-2"
          fullWidth
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
    </>
  );
}
