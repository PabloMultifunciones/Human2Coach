import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';

import MetricTableDialog from '../tables/MetricTableDialog';

export default function MetricDashboardDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseState = () => {
    localStorage.setItem('metricDialog', 'Closed');
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="knowledge-dialog"
      >
        <DialogTitle id="alert-dialog-title">Métrica</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-1">
              <MetricTableDialog />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseState} className="button-success">
            Casos
          </Button>

          <Button onClick={handleCloseState} className="button-primary">
            Chat
          </Button>
          <Button onClick={handleClose} className="button-danger">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
