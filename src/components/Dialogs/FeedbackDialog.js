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
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import TextField from '@material-ui/core/TextField';
import toastr from 'toastr';
import { format, subDays, startOfWeek } from 'date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';

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
import { UserListHead } from '../_dashboard/user';
import SearchNotFound from '../SearchNotFound';
import GeneralFunctions from '../../libs/GeneralFunctions';

// import { TableFeedback } from '../_dashboard/app';
import { setMetricsSelected, deleteMetricsSelected } from '../../actions/plansActions';

import {
  getMetricsCollaboratorRequest,
  updateMetricData,
  resetState
} from '../../actions/metricsActions';
import Spinner from '../Spinner';

import 'toastr/build/toastr.min.css';

// {getWeek(new Date())}: ${format(new Date(), 'dd/MM/yyyy')}

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

  const [rowsPerPage, setRowsPerPage] = useState(7);

  const myRefs = useRef([]);

  const TABLE_HEAD = [
    { id: 'metric', label: t('menu.metric-panel-title', 'Métrica'), alignRight: false },
    { id: 'objective', label: t('goal.label', 'Objetivo'), alignRight: false },
    {
      id: 'wbefore',
      label: `W${GeneralFunctions.getWeekCountBefore()}  ${format(
        subDays(startOfWeek(new Date()), 7),
        'dd/MM/yyyy'
      )}`,
      alignRight: false
    },
    {
      id: 'wafter',
      label: `W${GeneralFunctions.getWeekCount()}  ${format(
        subDays(startOfWeek(new Date()), 1),
        'dd/MM/yyyy'
      )}`,
      alignRight: false
    },
    { id: 'actions', label: t('admin.user-panel-table-actions', 'Acciones'), alignRight: false }
  ];

  const handleChange = (e, i) => {
    props.updateMetricData({ data: e.target.value, index: i });
  };

  const handleChangeTime = (e, i) => {
    props.updateMetricData({ data: e, index: i });
  };

  useEffect(() => {
    myRefs.current = myRefs.current.slice(0, props.metricsReducer.metrics_collaborators.length);
  }, [props.metricsReducer.metrics_collaborators]);

  useEffect(() => {
    props.resetState();
    props.getMetricsCollaboratorRequest({ number: 0, id: props.collaborator.id });
    // eslint-disable-next-line
  }, []);

  const setClassToCell = (ref, row) => {
    if (ref && ref.classList.contains('selected-cell')) {
      ref.classList.add('not-selected-cell');
      ref.classList.remove('selected-cell');
      props.deleteMetricsSelected(row);
    } else {
      if (!row.dataTwo || row.dataTwo === 'undefined' || row.dataTwo === '') {
        toastr.error(t('must-add-data', 'Debes ingresar un dato válido'));
        return;
      }
      ref.classList.add('selected-cell');
      ref.classList.remove('not-selected-cell');
      props.setMetricsSelected({
        ...row,
        date1: `${format(subDays(startOfWeek(new Date()), 7), 'yyyy-MM-dd')}T00:00:00`,
        date2: `${format(subDays(startOfWeek(new Date()), 1), 'yyyy-MM-dd')}T00:00:00`,
        value1: row.value,
        value2: row.dataTwo
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    props.getMetricsCollaboratorRequest({ number: newPage });

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.metricsReducer.metrics_collaborators.length)
      : 0;
  const isMetricNotFound = props.metricsReducer.metrics_collaborators.length === 0;

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
          {t('feedback-objective', 'Feedback por objetivo')}
          {`(W${GeneralFunctions.getWeekCount()}: ${format(new Date(), 'dd/MM/yyyy')})`}
        </DialogTitle>

        <>
          <DialogContent dividers>
            <Container maxWidth="lg">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {props.metricsReducer.metrics_charging ? (
                    <Spinner />
                  ) : (
                    <>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <UserListHead headLabel={TABLE_HEAD} />
                          <TableBody>
                            {props.metricsReducer.metrics_collaborators
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, i) => {
                                const { id, metricConfName, targetValue, dataTwo, metricConf } =
                                  row;

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
                                        {metricConfName.length > 20
                                          ? `${metricConfName.substring(0, 20)} ...`
                                          : metricConfName}
                                      </div>
                                    </TableCell>
                                    <TableCell align="left">
                                      <div>{targetValue}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>
                                    {metricConf ? (
                                      <TableCell align="left">
                                        {(metricConf.type === 'NUMBER' ||
                                          metricConf.type === 'MULTIPLIER') && (
                                          <Grid item xs={12} md={12} lg={12}>
                                            <TextField
                                              onChange={(e) => handleChange(e, i)}
                                              value={dataTwo || ''}
                                              name="targetValue"
                                              id="targetValue"
                                              type="number"
                                              variant="outlined"
                                              className="mt-1"
                                              fullWidth
                                            />
                                          </Grid>
                                        )}

                                        {metricConf.type === 'TIME' && (
                                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Grid item xs={12} md={12} lg={12}>
                                              <TimePicker
                                                ampm={false}
                                                okLabel={t('accept.label', 'Aceptar')}
                                                cancelLabel={t(
                                                  'admin.header-dropdown-dialog-actions-cancel',
                                                  'Cancelar'
                                                )}
                                                clearLabel={t(
                                                  'menu.badge-panel-dialog-minimum-points-clean-up',
                                                  'Limpiar'
                                                )}
                                                openTo="hours"
                                                inputVariant="outlined"
                                                views={['hours', 'minutes', 'seconds']}
                                                inputFormat="HH:mm:ss"
                                                mask="__:__:__"
                                                label={t(
                                                  'menu.metric-panel-dialog-objective',
                                                  'Objetivo'
                                                )}
                                                value={
                                                  dataTwo ||
                                                  new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                fullWidth
                                                onChange={(e) => handleChangeTime(e, i)}
                                                name="targetValue"
                                                id="targetValue"
                                                renderInput={(params) => (
                                                  <TextField
                                                    className="mt-1"
                                                    fullWidth
                                                    {...params}
                                                  />
                                                )}
                                              />
                                            </Grid>
                                          </LocalizationProvider>
                                        )}

                                        {metricConf.type === 'BOOLEAN' && (
                                          <Grid item xs={12} md={12} lg={12}>
                                            <FormControl variant="outlined" className="w-100">
                                              <InputLabel id="targetValue-select-outlined-label">
                                                {t(
                                                  'menu.metric-panel-dialog-objective',
                                                  'Objetivo'
                                                )}
                                              </InputLabel>
                                              <Select
                                                onChange={(e) => handleChange(e, i)}
                                                value={dataTwo || ''}
                                                labelId="targetValue"
                                                id="targetValue"
                                                name="targetValue"
                                                label={t(
                                                  'menu.metric-panel-dialog-objective',
                                                  'Objetivo'
                                                )}
                                              >
                                                <MenuItem value="">
                                                  {t('select-one', 'Seleccione uno')}
                                                </MenuItem>
                                                <MenuItem value="YES">
                                                  {t(
                                                    'admin.header-dropdown-dialog-notifications-input-item-yes',
                                                    'Si'
                                                  )}{' '}
                                                </MenuItem>
                                                <MenuItem value="NO">
                                                  {t(
                                                    'admin.header-dropdown-dialog-notifications-input-item-no',
                                                    'No'
                                                  )}
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Grid>
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell align="left">
                                        <Grid item xs={12} md={12} lg={12}>
                                          <TextField
                                            onChange={(e) => handleChange(e, i)}
                                            value={dataTwo || ''}
                                            name="targetValue"
                                            id="targetValue"
                                            type="number"
                                            variant="outlined"
                                            className="mt-1"
                                            fullWidth
                                          />
                                        </Grid>
                                      </TableCell>
                                    )}

                                    <TableCell align="left">
                                      <Checkbox
                                        disabled={dataTwo === 'undefined' || !dataTwo}
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
                                  <SearchNotFound
                                    searchQuery={t(
                                      'no-results-found',
                                      'No se encontraron resultados'
                                    )}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>

                      <TablePagination
                        rowsPerPageOptions={[7]}
                        component="div"
                        count={props.metricsReducer.totalElements_collaborators}
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
  resetState,
  updateMetricData,
  getMetricsCollaboratorRequest,
  setMetricsSelected,
  deleteMetricsSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDialog);
