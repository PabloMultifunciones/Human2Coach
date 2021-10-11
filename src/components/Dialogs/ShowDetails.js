import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

/** *****Services******* */

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  textField: {
    width: '50ch',
    marginBottom: '5px'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}{' '}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function ShowDetailsDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  return (
    <>
      <Tooltip title={t('menu.metric-panel-dialog-show-detail', 'Show details')}>
        <VisibilityIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('menu.metric-panel-dialog-detail', 'Metric details')}
          {props.type === 'BOOLEAN' && +' ' + t('menu.metric-panel-table-boolean', 'Boolean')}

          {props.type === 'NUMBER' &&
            t('menu.trivia-panel-dialog-add-test-select-questions-number', 'Number')}

          {props.type === 'TIME' && t('menu.trivia-panel-dialog-test-analytic-time', 'Time')}

          {props.type === 'PERCENT' && t('menu.metric-panel-table-percentage', 'Percentage')}
        </DialogTitle>

        <>
          <DialogContent dividers>
            {props.type === 'BOOLEAN' && (
              <>
                <TextField
                  value={
                    String(props.points1)
                      ? props.points1
                      : t('menu.metric-panel-dialog-show-detail-without-points', 'Without points')
                  }
                  disabled
                  label={t('points.label', 'Points')}
                  variant="outlined"
                  className="mt-2"
                  fullWidth
                />

                <TextField
                  value={
                    String(props.rangeFrom1)
                      ? t('admin.header-dropdown-dialog-notifications-input-item-yes', 'Yes')
                      : t('admin.header-dropdown-dialog-notifications-input-item-no', 'No')
                  }
                  disabled
                  label={t('value.label', 'Value')}
                  variant="outlined"
                  className="mt-2"
                  fullWidth
                />
              </>
            )}

            {props.type !== 'BOOLEAN' && (
              <>
                <Container maxWidth="lg">
                  <h4>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 1</h4>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.points1)
                            ? props.points1
                            : t(
                                'menu.metric-panel-dialog-show-detail-without-points',
                                'Without points'
                              )
                        }
                        disabled
                        label={t('points.label', 'Points')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.rangeFrom1)
                            ? props.rangeFrom1
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-from', 'From')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={
                          String(props.rangeTo1)
                            ? props.rangeTo1
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-to', 'To')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={props.color1 ? props.color1 : '#FF0000'}
                        disabled
                        label={t('menu.metric-panel-dialog-number-color', 'Color')}
                        type="color"
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <h4>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 2</h4>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.points2)
                            ? props.points2
                            : t(
                                'menu.metric-panel-dialog-show-detail-without-points',
                                'Without points'
                              )
                        }
                        disabled
                        label={t('points.label', 'Points')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.rangeFrom2)
                            ? props.rangeFrom2
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-from', 'From')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={
                          String(props.rangeTo2)
                            ? props.rangeTo2
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-to', 'To')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={props.color2 ? props.color2 : '#FFFF00'}
                        disabled
                        label={t('menu.metric-panel-dialog-number-color', 'Color')}
                        type="color"
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <h4>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 3</h4>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.points3)
                            ? props.points3
                            : t(
                                'menu.metric-panel-dialog-show-detail-without-points',
                                'Without points'
                              )
                        }
                        disabled
                        label={t('points.label', 'Points')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(props.rangeFrom3)
                            ? props.rangeFrom3
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-from', 'From')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={
                          String(props.rangeTo3)
                            ? props.rangeTo3
                            : t('menu.metric-panel-dialog-show-detail-without-rank', 'Without rank')
                        }
                        disabled
                        label={t('menu.metric-panel-dialog-number-option-to', 'To')}
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={props.color3 ? props.color3 : '#00D800'}
                        disabled
                        label={t('menu.metric-panel-dialog-number-color', 'Color')}
                        type="color"
                        variant="outlined"
                        className="mt-2"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Container>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              {t('menu.trivia-panel-dialog-add-test-button-close', 'Close')}
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}
