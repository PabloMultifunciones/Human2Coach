import { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Scrollbar from '../../Scrollbar';
import GeneralFunctions from '../../../libs/GeneralFunctions';

import {
  getMetricsOneRequest,
  getMetricsOneFilterRequest,
  getMetricsPdsRequest,
  getMetricsPdsFilterRequest,
  getMetricsPipRequest,
  getMetricsPipFilterRequest
} from '../../../actions/dashboardActions';

import SearchNotFound from '../../SearchNotFound';
import Spinner from '../../Spinner';

//

// ----------------------------------------------------------------------

function AppTableMetric(props) {
  const [page, setPage] = useState(0);
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    if (props.title === 'One on One') {
      props.getMetricsOneRequest({ number: newPage });
    } else if (props.title === 'PDS') {
      props.getMetricsPdsRequest({ number: newPage });
    } else {
      props.getMetricsPipRequest({ number: newPage });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMetricsType = () => {
    if (props.title === 'One on One') {
      return props.metricsOne;
    }

    if (props.title === 'PDS') {
      return props.metricsPds;
    }
    if (props.title === 'PIP') {
      return props.metricsPip;
    }

    return [];
  };

  const getMetricsTypeTotalElements = () => {
    if (props.title === 'One on One') {
      return props.totalElementsOne;
    }

    if (props.title === 'PDS') {
      return props.totalElementsPds;
    }
    if (props.title === 'PIP') {
      return props.totalElementsPip;
    }

    return [];
  };

  const getMetricsTypeConditional = () => {
    if (props.title === 'One on One') {
      return props.metricsOne_charging;
    }

    if (props.title === 'PDS') {
      return props.metricsPds_charging;
    }
    if (props.title === 'PIP') {
      return props.metricsPip_charging;
    }

    return false;
  };

  useEffect(() => {
    if (props.title === 'One on One') {
      props.getMetricsOneRequest({ number: 0 });
    } else if (props.title === 'PDS') {
      props.getMetricsPdsRequest({ number: 0 });
    } else {
      props.getMetricsPipRequest({ number: 0 });
    }
    // eslint-disable-next-line
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getMetricsType().length) : 0;

  const isUserNotFound = getMetricsType().length === 0;

  return (
    <>
      <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
        <Typography variant="h4" gutterBottom className="d-flex">
          {GeneralFunctions.getIcon(props.title)}
          {props.title}
        </Typography>
      </Stack>

      <Card>
        {/* <UserListToolbar filterName={filterName} showTeam /> */}

        {getMetricsTypeConditional() ? (
          <Spinner />
        ) : (
          <>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell key="type">{props.title}</TableCell>

                      {getMetricsType() &&
                        getMetricsType()[0] &&
                        getMetricsType()[0].metrics.map((row, index) => (
                          <Tooltip key={index} title={row.name}>
                            <TableCell>
                              {row.name.length > 10 ? `${row.name.substring(0, 10)}...` : row.name}
                            </TableCell>
                          </Tooltip>
                        ))}

                      <TableCell key="sent">Sent</TableCell>
                      <TableCell key="slopes">Saved</TableCell>
                      <TableCell key="signed">Signed</TableCell>
                      <TableCell key="total">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getMetricsType()
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover key={index} tabIndex={-1} role="checkbox">
                          <TableCell align="left">
                            W{GeneralFunctions.getWeekCount() - (row.weekcount - 1)}
                          </TableCell>

                          {row.metrics.map((metric, index) => (
                            <TableCell key={index}>
                              {metric.valueAvg === false ? 'False' : metric.valueAvg}
                            </TableCell>
                          ))}

                          <TableCell align="left">{row.sended}</TableCell>
                          <TableCell align="left">{row.draft}</TableCell>
                          <TableCell align="left">{row.acknowleged}</TableCell>

                          <TableCell align="left">{row.total}</TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
              count={getMetricsTypeTotalElements()}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Card>
    </>
  );
}

const mapStateToProps = ({ dashboardReducer }) => dashboardReducer;

const mapDispatchToProps = {
  getMetricsOneRequest,
  getMetricsOneFilterRequest,
  getMetricsPdsRequest,
  getMetricsPdsFilterRequest,
  getMetricsPipRequest,
  getMetricsPipFilterRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTableMetric);
