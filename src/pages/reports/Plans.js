import { useState, useEffect } from 'react';
import toastr from 'toastr';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';

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

// ----------------------------------------------------------------------

function Plans(props) {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [userId, setUserId] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(
    props.loginReducer.userLogged && props.loginReducer.userLogged.user.position === 3 ? 10 : 7
  );

  const TABLE_HEAD = [
    { id: 'collaborator', label: t('collaborator', 'Colaborador'), alignRight: false },
    { id: 'sent', label: t('sent', 'Envíado'), alignRight: false },
    { id: 'commitment', label: t('commitment', 'Compromiso'), alignRight: false },
    { id: 'objective', label: t('goal.label', 'Objetivo'), alignRight: false },
    { id: 'feedback', label: 'Feedback', alignRight: false },
    { id: 'mode', label: t('mode', 'Modo'), alignRight: false },
    { id: 'state', label: t('status.label', 'Estado'), alignRight: false },
    { id: 'actions', label: t('admin.user-panel-table-actions', 'Acciones'), alignRight: false }
  ];

  useEffect(() => {
    props.getPlansRequest({
      number: 0,
      position: props.loginReducer && props.loginReducer.userLogged.user.position
    });
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    if (filterName === '' && userId === 'ALL') {
      props.getPlansRequest({
        number: newPage,
        position: props.loginReducer && props.loginReducer.userLogged.user.position
      });
    } else {
      props.getPlansFilterRequest({ number: newPage, filterName, userId });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (!props.plansReducer.plans_charging) {
      if (event.target.value.length > 0) {
        props.getPlansFilterRequest({ number: 0, filterName: event.target.value, userId });
        setFilterName(event.target.value);
        setPage(0);
      }

      if (event.target.value === '') {
        setFilterName('');
        setPage(0);
        if (userId && userId !== 'ALL') {
          props.getPlansFilterRequest({ number: 0, filterName: '', userId });
          return;
        }
        props.getPlansRequest({
          number: 0,
          position: props.loginReducer && props.loginReducer.userLogged.user.position
        });
      }
    }
  };

  const handleFilterByUser = (value) => {
    setUserId(value);

    if (value && value !== 'ALL') {
      props.getPlansFilterRequest({ number: 0, filterName, userId: value });
    } else {
      if (filterName === '') {
        props.getPlansRequest({
          number: 0,
          position: props.loginReducer && props.loginReducer.userLogged.user.position
        });
        return;
      }
      props.getPlansFilterRequest({ number: 0, filterName });
    }
  };

  const deletePlan = async (id) => {
    let status;
    await props.deletePlanRequest({ id, filterName }).then((r) => (status = r));

    if (status === 'SUCCESS') {
      toastr.success(t('plans-removed', 'Plan eliminado correctamente'));
      return;
    }

    if (status.error && status.error.status === 400) {
      toastr.error(
        t('plans-error-one-removed', 'Este plan se está utilizando y no se puede eliminar')
      );
    } else {
      toastr.error(t('plans-error-two-removed', 'Ocurrió un error al eliminar el plan'));
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
    <Page title="Plans | Human2Coach">
      <Container>
        <Stack direction="row" alignItems="center" mb={5} className="custom-title-blue">
          <Typography variant="h4" gutterBottom className="d-flex">
            <Icon icon={clipboardOutline} width={30} height={30} className="mr-1" />
            {t('plans', 'Planes')}
          </Typography>
        </Stack>

        <Card>
          {props.loginReducer.userLogged && props.loginReducer.userLogged.user.position !== 3 && (
            <UserListToolbar
              onFilterName={handleFilterByName}
              onFilterUser={handleFilterByUser}
              title="Search..."
              showFilterPlan
              userLogged={props.loginReducer.userLogged}
            />
          )}

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
                      {(filterName === '' && (!userId || userId === 'ALL')
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
                            <TableCell align="left">
                              {` ${format(new Date(row.commitmentDate), 'dd/MM/yyyy')}`}
                            </TableCell>

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
                              {row.status === 'DRAFT' && (
                                <Label variant="ghost">{t('draft', 'BORRADOR')}</Label>
                              )}
                              {row.status === 'SENDED' && (
                                <Label variant="ghost" color="warning">
                                  {t('sended', 'ENVÍADO')}
                                </Label>
                              )}{' '}
                              {row.status === 'ACKNOWLEGED' && (
                                <Label variant="ghost" color="info">
                                  {t('acknowledged', 'RECIBIDO')}
                                </Label>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              <Link
                                to={`/dashboard/plan-edit/${row.id}`}
                                rel="noopener noreferrer"
                                className="color-black"
                              >
                                <Tooltip title={t('admin.actions-edit', 'Edit')}>
                                  <EditIcon />
                                </Tooltip>
                              </Link>
                              {row.status === 'DRAFT' && (
                                <>
                                  <DeleteDialog delete={() => deletePlan(row.id)} />
                                </>
                              )}

                              {row.status === 'SENDED' && (
                                <>
                                  <PlanDialog plan={row} />
                                </>
                              )}

                              {/*
                              <Link
                                to={`/dashboard/plan/${row.id}`}
                                rel="noopener noreferrer"
                                className="color-black"
                              >
                                <Tooltip
                                  title={t('menu.metric-panel-dialog-show-detail', 'Ver detalles')}
                                >
                                  <VisibilityIcon />
                                </Tooltip>
                              </Link>
                             */}
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
                          <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                            <SearchNotFound
                              searchQuery={t('no-results-found', 'No se encontraron resultados')}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                rowsPerPageOptions={[
                  props.loginReducer.userLogged && props.loginReducer.userLogged.user.position === 3
                    ? 10
                    : 7
                ]}
                component="div"
                count={
                  filterName === '' && (!userId || userId === 'ALL')
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

const mapStateToProps = ({ plansReducer, loginReducer }) => ({ plansReducer, loginReducer });

const mapDispatchToProps = {
  getPlansRequest,
  getPlansFilterRequest,
  deletePlanRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
