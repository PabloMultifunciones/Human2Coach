import { useState, useEffect } from 'react';
import toastr from 'toastr';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';

// import toastr from 'toastr';

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
// components
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
import DeleteDialog from '../../components/Dialogs/DeleteDialog';
import PlanDialog from '../../components/Dialogs/PlanDialog';
import Spinner from '../../components/Spinner';

import {
  getPlansRequest,
  getPlansFilterRequest,
  deletePlanRequest
} from '../../actions/plansActions';
//
import 'toastr/build/toastr.min.css';

// import 'toastr/build/toastr.min.css';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'collaborator', label: 'Colaborador', alignRight: false },
  { id: 'sent', label: 'Sent', alignRight: false },
  { id: 'commitment', label: 'Commitment', alignRight: false },
  { id: 'objective', label: 'Objective', alignRight: false },
  { id: 'feedback', label: 'Feedback', alignRight: false },
  { id: 'mode', label: 'Mode', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
];

// ----------------------------------------------------------------------

function Plans(props) {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    props.getPlansRequest({ number: 0, filterName });
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    if (filterName === '') {
      props.getPlansRequest({ number: newPage, filterName });
    } else {
      props.getPlansFilterRequest({ number: newPage, filterName });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (event.target.value.length > 0) {
      props.getPlansFilterRequest({ number: 0, filterName: event.target.value });
      setFilterName(event.target.value);
      setPage(0);
    }

    if (event.target.value === '') {
      props.getPlansRequest({ number: 0, filterName: event.target.value });
      setFilterName('');
      setPage(0);
    }
  };

  const deletePlan = async (id) => {
    let status;
    await props.deletePlanRequest({ id, filterName }).then((r) => (status = r));

    if (status === 'SUCCESS') {
      toastr.success('menu.metric-panel-message-success-delete', 'Metric removed successfully');
      return;
    }

    if (status.error && status.error.status === 400) {
      toastr.error('This plan is being used and cannot be removed');
    } else {
      toastr.error('An error occurred while removing the plan');
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterName === ''
              ? props.plansReducer.plans.length
              : props.plansReducer.plans_filtered.length)
        )
      : 0;
  const isPlanNotFound =
    (filterName === ''
      ? props.plansReducer.plans.length
      : props.plansReducer.plans_filtered.length) === 0;

  return (
    <Page title="Planes | Human2Coach">
      <Container>
        <Stack direction="row" alignItems="center" mb={5} className="custom-title-blue">
          <Typography variant="h4" gutterBottom className="d-flex">
            <Icon icon={clipboardOutline} width={30} height={30} className="mr-1" />
            Planes
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            onFilterName={handleFilterByName}
            title="Search..."
            showFilterPlan
            userLogged={props.loginReducer.userLogged}
          />

          {props.plansReducer.plans_charging ? (
            <Spinner />
          ) : (
            <>
              {' '}
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {(filterName === ''
                        ? props.plansReducer.plans
                        : props.plansReducer.plans_filtered
                      )
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow hover key={row.id} tabIndex={-1}>
                            <TableCell align="left">
                              <Link to={`/dashboard/plan/${row.id}`} rel="noopener noreferrer">
                                {row.user && row.user.name
                                  ? `${row.user.name} ${row.user.lastName}`
                                  : 'N/A'}
                              </Link>
                            </TableCell>

                            <TableCell align="left">{` ${format(
                              new Date(row.sendedDate),
                              'dd/MM/yyyy'
                            )}`}</TableCell>
                            <TableCell align="left">{` ${format(
                              new Date(row.reminderDate),
                              'dd/MM/yyyy'
                            )}`}</TableCell>

                            <TableCell align="left">{row.isObjetive ? 'X' : 'N/A'}</TableCell>
                            <TableCell align="left">{row.isFeedback ? 'X' : 'N/A'}</TableCell>
                            <TableCell align="left">
                              {row.isPDS && (
                                <Label variant="ghost" color="warning">
                                  P D S
                                </Label>
                              )}
                              {row.isPIP && (
                                <Label variant="ghost" color="warning">
                                  P I P
                                </Label>
                              )}
                              {row.isOneOnOne && (
                                <Label variant="ghost" color="warning">
                                  One on one
                                </Label>
                              )}
                            </TableCell>

                            <TableCell align="left">
                              {row.status === 'DRAFT' && <Label variant="ghost">DRAFT</Label>}
                              {row.status === 'SENDED' && (
                                <Label variant="ghost" color="warning">
                                  SENDED
                                </Label>
                              )}{' '}
                              {row.status === 'ACKNOWLEGED' && (
                                <Label variant="ghost" color="info">
                                  ACKNOWLEGED
                                </Label>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {row.status === 'DRAFT' ? (
                                <>
                                  <PlanDialog plan={row} />
                                  <DeleteDialog delete={() => deletePlan(row.id)} />
                                </>
                              ) : (
                                <Link
                                  to={`/dashboard/plan/${row.id}`}
                                  rel="noopener noreferrer"
                                  className="color-black"
                                >
                                  <Tooltip title="See details">
                                    <VisibilityIcon />
                                  </Tooltip>
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isPlanNotFound && (
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
                count={
                  filterName === ''
                    ? props.plansReducer.totalElements
                    : props.plansReducer.totalElements_filtered
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
}

const mapStateToProps = ({ plansReducer, loginReducer }) => ({ loginReducer, plansReducer });

const mapDispatchToProps = {
  getPlansRequest,
  getPlansFilterRequest,
  deletePlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
