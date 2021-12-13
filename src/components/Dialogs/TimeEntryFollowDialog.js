import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

import { TableExtraTime } from '../_dashboard/app';

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

export default function TimeEntryFollowDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  function getTablehead() {
    return [
      { id: 'type', label: 'Tipo', alignRight: false },
      { id: 'check', label: 'Check', alignRight: false }
    ];
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  return (
    <>
      <Button color="secondary" variant="contained" className="ml-1" onClick={handleClickOpen}>
        Exception
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Extra time{' '}
        </DialogTitle>

        <>
          <DialogContent dividers>
            <Container maxWidth="lg">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TableExtraTime
                    propsSick={props.sick}
                    propsHolidays={props.holidays}
                    propsDisciplinaryProcess={props.disciplinaryProcess}
                    tableHead={getTablehead()}
                    setExtraTime={(name, value) => props.setExtraTime(name, value)}
                  />
                </Grid>
              </Grid>
            </Container>
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
