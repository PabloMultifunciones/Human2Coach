import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

export default function FindRegistersDialog(props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  function handleChange(event, value) {
    if (value) {
      props.setValue(props.type, value.id ? value.id : '');
      setOpen(false);
    }
  }

  return (
    <>
      <Tooltip title={t('search.label', 'Search')} disableFocusListener>
        <Button
          className="button-table ml-1 mt-1"
          variant="contained"
          color={props.button ? 'default' : 'primary'}
          onClick={handleClickOpen}
        >
          <SearchIcon />
        </Button>
      </Tooltip>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('search.label', 'Search')}
        </DialogTitle>

        <DialogContent>
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={props.rows}
            autoHighlight
            getOptionLabel={(option) =>
              props.type === 'teams' ? option.name : `${option.name} ${option.lastName}`
            }
            style={{ width: 300 }}
            onChange={(event, value) => handleChange(event, value)}
            renderInput={(params) => (
              <TextField
                className="mt-1"
                autoFocus
                {...params}
                label={t('write-search.label', 'Write your search')}
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t('menu.trivia-panel-dialog-add-test-button-close', 'Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
