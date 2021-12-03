import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';

// material
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { UserListHead, UserListToolbar } from '../_dashboard/user';
import SearchNotFound from '../SearchNotFound';

// import { TableFeedback } from '../_dashboard/app';
import { setMetricsSelected, deleteMetricsSelected } from '../../actions/plansActions';

import { getMetricsRequest, getMetricsFilterRequest } from '../../actions/metricsActions';
import Spinner from '../Spinner';

import 'toastr/build/toastr.min.css';

const TABLE_HEAD = [
  { id: 'metric', label: 'Métrica', alignRight: false },
  { id: 'objective', label: 'Objetivo', alignRight: false },
  { id: 'wbefore', label: 'W44 (25/10/2021)', alignRight: false },
  { id: 'wafter', label: 'W44 (01/11/2021)', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
];

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
      {children}

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

function FeedbackDialog(props) {
  const [open, setOpen] = React.useState(true);
  const { t } = useTranslation();

  const [page, setPage] = useState(0);

  const [selected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const myRefs = useRef([]);

  useEffect(() => {
    myRefs.current = myRefs.current.slice(0, props.metricsReducer.metrics.length);
  }, [props.metricsReducer.metrics]);

  useEffect(() => {
    props.getMetricsRequest({ number: 0, filterName });
    // eslint-disable-next-line
  }, []);

  const setClassToCell = (ref, row) => {
    if (ref && ref.classList.contains('selected-cell')) {
      ref.classList.add('not-selected-cell');
      ref.classList.remove('selected-cell');
      props.deleteMetricsSelected(row);
    } else {
      ref.classList.add('selected-cell');
      ref.classList.remove('not-selected-cell');
      props.setMetricsSelected(row);
    }
  };

  const handleChangePage = (event, newPage) => {
    if (filterName === '') {
      props.getMetricsRequest({ number: newPage, filterName });
    } else {
      props.getMetricsFilterRequest({ number: newPage, filterName });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (event.target.value.length > 0) {
      props.getMetricsFilterRequest({ number: 0, filterName: event.target.value });
      setFilterName(event.target.value);
      setPage(0);
    }

    if (event.target.value === '') {
      props.getMetricsRequest({ number: 0, filterName: event.target.value });
      setFilterName('');
      setPage(0);
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterName === ''
              ? props.metricsReducer.metrics.length
              : props.metricsReducer.metrics_filtered.length)
        )
      : 0;
  const isMetricNotFound =
    (filterName === ''
      ? props.metricsReducer.metrics.length
      : props.metricsReducer.metrics_filtered.length) === 0;

  const handleClose = () => {
    setOpen(false);
  };

  /** *********Data Binding Form******* */

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Feedback por objetivo (W45: 08/11/2021)
        </DialogTitle>

        <>
          <DialogContent dividers>
            <Container maxWidth="lg">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <UserListToolbar
                    numSelected={selected.length}
                    onFilterName={handleFilterByName}
                    title="Search..."
                  />
                  {props.metricsReducer.metrics_charging ? (
                    <Spinner />
                  ) : (
                    <>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <UserListHead headLabel={TABLE_HEAD} />
                          <TableBody>
                            {(filterName === ''
                              ? props.metricsReducer.metrics
                              : props.metricsReducer.metrics_filtered
                            )
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, i) => {
                                const { id, name, targetValue } = row;

                                return (
                                  <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    ref={(el) => (myRefs.current[i] = el)}
                                    className="not-selected-cell"
                                  >
                                    <TableCell align="left">
                                      <div>
                                        {' '}
                                        {name.length > 20 ? `${name.substring(0, 20)} ...` : name}
                                      </div>
                                    </TableCell>
                                    <TableCell align="left">
                                      {' '}
                                      <div>{targetValue}</div>
                                    </TableCell>
                                    <TableCell align="left">89</TableCell>

                                    <TableCell align="left">89</TableCell>

                                    <TableCell align="left">
                                      <Checkbox
                                        onClick={() => setClassToCell(myRefs.current[i], row)}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={8} />
                              </TableRow>
                            )}
                          </TableBody>
                          {isMetricNotFound && (
                            <TableBody>
                              <TableRow>
                                <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                                  <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>

                      <TablePagination
                        rowsPerPageOptions={[7]}
                        component="div"
                        count={
                          filterName === ''
                            ? props.metricsReducer.totalElements
                            : props.metricsReducer.totalElements_filtered
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </>
                  )}
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

const mapStateToProps = ({ plansReducer, metricsReducer }) => ({ plansReducer, metricsReducer });

const mapDispatchToProps = {
  getMetricsRequest,
  getMetricsFilterRequest,
  setMetricsSelected,
  deleteMetricsSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog);
