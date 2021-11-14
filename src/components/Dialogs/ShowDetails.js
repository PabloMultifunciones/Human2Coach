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

const DialogTitle = withStyles(styles)((information) => {
  const { children, classes, onClose, ...other } = information;
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
  const [information, setInformation] = React.useState(props);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setInformation(props);
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
          {information.type === 'BOOLEAN' && ` ${t('menu.metric-panel-table-boolean', 'Boolean')}`}

          {information.type === 'NUMBER' &&
            ` ${t('menu.trivia-panel-dialog-add-test-select-questions-number', 'Number')}`}

          {information.type === 'TIME' &&
            ` ${t('menu.trivia-panel-dialog-test-analytic-time', 'Time')}`}

          {information.type === 'PERCENT' &&
            ` ${t('menu.metric-panel-table-percentage', 'Percentage')}`}
        </DialogTitle>

        <>
          <DialogContent dividers>
            {information.type === 'BOOLEAN' && (
              <>
                <TextField
                  value={
                    String(information.points1)
                      ? information.points1
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
                    String(information.rangeFrom1)
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

            {information.type !== 'BOOLEAN' && (
              <>
                <Container maxWidth="lg">
                  <h4>{t('menu.metric-panel-dialog-number-option-rank', 'Rank')} 1</h4>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        value={
                          String(information.points1)
                            ? information.points1
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
                          String(information.rangeFrom1)
                            ? information.rangeFrom1
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
                          String(information.rangeTo1)
                            ? information.rangeTo1
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
                        value={information.color1 ? information.color1 : '#FF0000'}
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
                          String(information.points2)
                            ? information.points2
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
                          String(information.rangeFrom2)
                            ? information.rangeFrom2
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
                          String(information.rangeTo2)
                            ? information.rangeTo2
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
                        value={information.color2 ? information.color2 : '#FFFF00'}
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
                          String(information.points3)
                            ? information.points3
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
                          String(information.rangeFrom3)
                            ? information.rangeFrom3
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
                          String(information.rangeTo3)
                            ? information.rangeTo3
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
                        value={information.color3 ? information.color3 : '#00D800'}
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
