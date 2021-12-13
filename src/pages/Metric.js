import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toastr from 'toastr';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// Icons----------------------------------------------------------------------

import BackupIcon from '@material-ui/icons/Backup';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
//

// import ShowDetailsDialog from '../components/Dialogs/ShowDetailsDialog';
import MetricDialog from '../components/Dialogs/MetricDialog';
import DeleteDialog from '../components/Dialogs/DeleteDialog';
import MetricImportDialog from '../components/Dialogs/MetricImportDialog';

import {
  getMetricsRequest,
  getMetricsFilterRequest,
  deleteMetricRequest,
  setImportMetricRequest
} from '../actions/metricsActions';
import Spinner from '../components/Spinner';
import 'toastr/build/toastr.min.css';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'metric', label: 'Metric', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'variableType', label: 'Type of variable', alignRight: false },
  { id: 'frequency', label: 'Frequency', alignRight: false },
  { id: 'points', label: 'Points', alignRight: false },
  { id: 'impact', label: 'Impact/Supervisor', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
];

// ----------------------------------------------------------------------

function Metric(props) {
  const [page, setPage] = useState(0);
  const [metricImports, setMetricImports] = useState(null);
  const [viewImportMetrics, setViewImportMetrics] = useState(false);

  const [selected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const { t } = useTranslation();

  useEffect(() => {
    props.getMetricsRequest({ number: 0, filterName });
    // eslint-disable-next-line
  }, []);

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

  const deleteMetric = async (id) => {
    let status;
    await props.deleteMetricRequest({ id, filterName }).then((r) => (status = r));

    if (status === 'SUCCESS') {
      toastr.success(t('menu.metric-panel-message-success-delete', 'Metric removed successfully'));
      return;
    }

    if (status.error && status.error.status === 400) {
      toastr.error(
        t(
          'menu.metric-panel-message-error-delete-one',
          'This metric is being used and cannot be removed'
        )
      );
    } else {
      toastr.error(
        t(
          'menu.metric-panel-message-error-delete-two',
          'An error occurred while removing the metric'
        )
      );
    }
  };

  const handleImport = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    let status;
    await props.setImportMetricRequest(formData).then((r) => (status = r));

    if (status.status && status.status === 'SUCCESS') {
      setMetricImports(status.responseLogin);
      setViewImportMetrics(true);
    } else {
      toastr.error(
        t(
          'menu.metric-panel-message-error-import',
          'An error occurred while trying to pre-import the CSV'
        )
      );
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterName === '' ? props.metrics.length : props.metrics_filtered.length)
        )
      : 0;
  const isMetricNotFound =
    (filterName === '' ? props.metrics.length : props.metrics_filtered.length) === 0;

  return (
    <Page title="Metric | Human2Coach">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Metric
          </Typography>

          <div>
            <MetricDialog />
            {!props.metrics_charging && (
              <Button className="button-table mr-1" variant="contained" color="primary">
                <label htmlFor="avatar" className="d-flex">
                  <BackupIcon className="mr-1" />
                  Import
                  <input
                    type="file"
                    className="d-none"
                    id="avatar"
                    name="avatar"
                    onChange={(e) => handleImport(e)}
                  />
                </label>
              </Button>
            )}
          </div>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            onFilterName={handleFilterByName}
            title="Search..."
          />
          {props.metrics_charging ? (
            <Spinner />
          ) : (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {(filterName === '' ? props.metrics : props.metrics_filtered)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const {
                            id,
                            name,
                            description,
                            type,
                            frequency,
                            isPointsGranted,
                            isApplyToSupervisor,
                            isActive
                          } = row;

                          return (
                            <TableRow hover key={id} tabIndex={-1}>
                              <TableCell align="left">
                                {name.length > 20 ? `${name.substring(0, 20)} ...` : name}
                              </TableCell>
                              <TableCell align="left">
                                {description.length > 20
                                  ? `${description.substring(0, 20)} ...`
                                  : description}
                              </TableCell>
                              <TableCell align="left">
                                {type === 'BOOLEAN' &&
                                  t('menu.metric-panel-table-boolean', 'Boolean')}
                                {type === 'NUMBER' &&
                                  t(
                                    'menu.trivia-panel-dialog-add-test-select-questions-number',
                                    'Number'
                                  )}
                                {type === 'TIME' &&
                                  t('menu.trivia-panel-dialog-test-analytic-time', 'Time')}
                                {type === 'PERCENT' &&
                                  t('menu.metric-panel-table-percentage', 'Percentage')}

                                {type === 'MULTIPLIER' &&
                                  t('menu.metric-panel-dialog-Multiplier', 'Multiplier')}
                              </TableCell>
                              <TableCell align="left">
                                {' '}
                                {frequency === 'HOURLY' &&
                                  t('menu.metric-panel-table-hour', 'Hour')}
                                {frequency === 'DAILY' &&
                                  t('menu.metric-panel-table-daily', 'Daily')}
                                {frequency === 'WEEKLY' &&
                                  t('menu.metric-panel-table-weekly', 'Weekly')}
                                {frequency === 'MONTHLY' &&
                                  t('menu.metric-panel-table-mothly', 'Mothly')}
                                {frequency === 'EVENTUAL' &&
                                  t('menu.metric-panel-table-eventual', 'Eventual')}
                              </TableCell>

                              <TableCell align="left">
                                {' '}
                                {isPointsGranted &&
                                  t('menu.metric-panel-table-add-points', 'Add points')}
                                {!isPointsGranted &&
                                  t(
                                    'menu.metric-panel-table-not-add-points',
                                    'Does not score points'
                                  )}
                              </TableCell>
                              <TableCell align="left">
                                {' '}
                                {isApplyToSupervisor &&
                                  t(
                                    'admin.header-dropdown-dialog-notifications-input-item-yes',
                                    'Yes'
                                  )}
                                {!isApplyToSupervisor &&
                                  t(
                                    'admin.header-dropdown-dialog-notifications-input-item-no',
                                    'No'
                                  )}
                              </TableCell>
                              <TableCell align="left">
                                {' '}
                                {isActive === true &&
                                  t(
                                    'admin.header-dropdown-view-conditions-table-active-state',
                                    'Active'
                                  )}
                                {isActive !== true &&
                                  t('menu.trivia-panel-table-inactive', 'Inactive')}
                              </TableCell>

                              <TableCell align="right">
                                {/*                                <ShowDetailsDialog {...row} />
                                 */}
                                <MetricDialog {...row} typeModal="EDIT" />
                                <DeleteDialog delete={() => deleteMetric(id)} />
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
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[7]}
                component="div"
                count={filterName === '' ? props.totalElements : props.totalElements_filtered}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
      </Container>

      {viewImportMetrics && (
        <MetricImportDialog
          metricImports={metricImports}
          backViewAndReload={() => setViewImportMetrics(false)}
        />
      )}
    </Page>
  );
}

const mapStateToProps = ({ metricsReducer }) => metricsReducer;

const mapDispatchToProps = {
  getMetricsRequest,
  getMetricsFilterRequest,
  deleteMetricRequest,
  setImportMetricRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Metric);
