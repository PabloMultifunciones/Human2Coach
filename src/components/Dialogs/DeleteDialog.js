import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
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
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  function onFormSubmit() {
    handleClose();
    props.delete();
  }

  return (
    <>
      <Tooltip title={props.title ? props.title : t('admin.actions-delete', 'Delete')}>
        <DeleteIcon fontSize="small" className="cursor-pointer" onClick={handleClickOpen} />
      </Tooltip>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title ? props.title : t('admin.actions-delete', 'Delete')}
        </DialogTitle>

        <>
          <DialogContent dividers>
            <h4 className="text-center">
              {props.message
                ? props.message
                : t('admin.dialog-delete-text', 'Are you sure to delete this record?')}
            </h4>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              {t('admin.header-dropdown-dialog-actions-cancel', 'Cancel')}
            </Button>

            <Button onClick={onFormSubmit} color="primary">
              {props.titleButton ? props.titleButton : t('admin.actions-delete', 'Delete')}
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </>
  );
}
