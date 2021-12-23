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

import {
  getCollaboratorsRequest,
  getLeadersCollaboratorsRequest
} from '../../../actions/generalActions';

import { UserListToolbar } from '../user';

import SearchNotFound from '../../SearchNotFound';
import Spinner from '../../Spinner';

//

// ----------------------------------------------------------------------

function AppTableMetric(props) {
  const [page, setPage] = useState(0);
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [user, setUser] = useState(null);

  const handleChangePage = (event, newPage) => {
    if (user) {
      if (props.title === 'One on One') {
        props.getMetricsOneFilterRequest({ number: newPage, filterOne: user.id });
      } else if (props.title === 'P D S') {
        props.getMetricsPdsFilterRequest({ number: newPage, filterPds: user.id });
      } else {
        props.getMetricsPipFilterRequest({ number: newPage, filterPip: user.id });
      }
      return;
    }

    if (props.title === 'One on One') {
      props.getMetricsOneRequest({ number: newPage });
    } else if (props.title === 'P D S') {
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

  const handleFilterUser = (value) => {
    setUser(value && value.id ? value : null);
    setPage(0);

    if (value && value.id) {
      if (props.title === 'One on One') {
        props.getMetricsOneFilterRequest({ number: 0, filterOne: value.id });
      } else if (props.title === 'P D S') {
        props.getMetricsPdsFilterRequest({ number: 0, filterPds: value.id });
      } else {
        props.getMetricsPipFilterRequest({ number: 0, filterPip: value.id });
      }
      return;
    }

    if (props.title === 'One on One') {
      props.getMetricsOneRequest({ number: 0 });
    } else if (props.title === 'P D S') {
      props.getMetricsPdsRequest({ number: 0 });
    } else {
      props.getMetricsPipRequest({ number: 0 });
    }
  };

  const getMetricsType = () => {
    if (props.title === 'One on One') {
      if (user) {
        return props.dashboardReducer.metricsOne_filtered;
      }
      return props.dashboardReducer.metricsOne;
    }

    if (props.title === 'P D S') {
      if (user) {
        return props.dashboardReducer.metricsPds_filtered;
      }
      return props.dashboardReducer.metricsPds;
    }
    if (props.title === 'P I P') {
      if (user) {
        return props.dashboardReducer.metricsPip_filtered;
      }
      return props.dashboardReducer.metricsPip;
    }

    return [];
  };

  const getMetricsTypeTotalElements = () => {
    if (props.title === 'One on One') {
      if (user) {
        return props.dashboardReducer.totalElementsOne_filtered;
      }
      return props.dashboardReducer.totalElementsOne;
    }

    if (props.title === 'P D S') {
      if (user) {
        return props.dashboardReducer.totalElementsPds_filtered;
      }
      return props.dashboardReducer.totalElementsPds;
    }
    if (props.title === 'P I P') {
      if (user) {
        return props.dashboardReducer.totalElementsPip_filtered;
      }
      return props.dashboardReducer.totalElementsPip;
    }

    return [];
  };

  const getMetricsTypeConditional = () => {
    if (props.title === 'One on One') {
      return props.dashboardReducer.metricsOne_charging;
    }

    if (props.title === 'P D S') {
      return props.dashboardReducer.metricsPds_charging;
    }
    if (props.title === 'P I P') {
      return props.dashboardReducer.metricsPip_charging;
    }

    return false;
  };

  useEffect(() => {
    if (props.loginReducer.userLogged) {
      if (props.title === 'One on One') {
        props.getMetricsOneRequest({ number: 0 });
      } else if (props.title === 'P D S') {
        props.getMetricsPdsRequest({ number: 0 });
      } else {
        props.getMetricsPipRequest({ number: 0 });
      }

      if (props.loginReducer.userLogged) {
        if (props.loginReducer.userLogged.user.position === 1) {
          if (!props.generalReducer.leaderCollaborators) {
            props.getLeadersCollaboratorsRequest(999);
          }
        }

        if (props.loginReducer.userLogged.user.position === 2) {
          if (!props.generalReducer.collaborators) {
            props.getCollaboratorsRequest(999);
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [props.loginReducer.userLogged]);

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
        {props.generalReducer.leaderCollaborators &&
          props.loginReducer.userLogged.user.position === 1 && (
            <UserListToolbar
              onFilterUser={handleFilterUser}
              showUser
              users={[
                { name: 'Todos', lastName: '', id: false },
                ...props.generalReducer.leaderCollaborators.content
              ]}
            />
          )}

        {props.generalReducer.collaborators &&
          props.loginReducer.userLogged.user.position === 2 && (
            <UserListToolbar
              onFilterUser={handleFilterUser}
              showUser
              users={[
                { name: 'Todos', lastName: '', id: false },
                ...props.generalReducer.collaborators.content
              ]}
            />
          )}

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
                        getMetricsType()[0].metrics &&
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
              rowsPerPageOptions={[4]}
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

const mapStateToProps = ({ dashboardReducer, loginReducer, generalReducer }) => ({
  dashboardReducer,
  loginReducer,
  generalReducer
});

const mapDispatchToProps = {
  getMetricsOneRequest,
  getMetricsOneFilterRequest,
  getMetricsPdsRequest,
  getMetricsPdsFilterRequest,
  getMetricsPipRequest,
  getMetricsPipFilterRequest,
  getCollaboratorsRequest,
  getLeadersCollaboratorsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTableMetric);
