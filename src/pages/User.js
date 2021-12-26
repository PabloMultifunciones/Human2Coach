import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import Tooltip from '@material-ui/core/Tooltip';
import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/pie-chart-fill';

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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import UserDialog from '../components/Dialogs/UserDialog';
import {
  getUsersRequest,
  getUsersFilterRequest,
  deleteUserRequest,
  disableUserRequest,
  setImportUserRequest
} from '../actions/usersActions';
import Spinner from '../components/Spinner';

import GeneralFunctions from '../libs/GeneralFunctions';
import 'toastr/build/toastr.min.css';

//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function User(props) {
  const [page, setPage] = useState(0);
  const [selected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    {
      id: 'name',
      label: t('admin.user-panel-user-dialog-input-name', 'Nombre'),
      alignRight: false
    },
    {
      id: 'username',
      label: t('admin.user-panel-user-dialog-input-username', 'Nombre de usuario'),
      alignRight: false
    },
    { id: 'company', label: t('company.label', 'Empresa'), alignRight: false },
    {
      id: 'status',
      label: t('admin.header-dropdown-view-conditions-table-state', 'Estado'),
      alignRight: false
    },
    { id: 'role', label: t('admin.user-panel-table-role', 'Rol'), alignRight: false },
    { id: 'actions', label: t('admin.user-panel-table-actions', 'Acciones'), alignRight: false }
  ];

  useEffect(() => {
    props.getUsersRequest({ number: 0, filterName });
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    if (filterName === '') {
      props.getUsersRequest({ number: newPage, filterName });
    } else {
      props.getUsersFilterRequest({ number: newPage, filterName });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (!props.users_charging) {
      if (event.target.value.length > 0) {
        props.getUsersFilterRequest({ number: 0, filterName: event.target.value });
        setFilterName(event.target.value);
        setPage(0);
      }

      if (event.target.value === '') {
        props.getUsersRequest({ number: 0, filterName: event.target.value });
        setFilterName('');
        setPage(0);
      }
    }
  };

  const disableUser = async (id) => {
    let status;
    await props.disableUserRequest({ id }).then((r) => (status = r));

    if (status === 'SUCCESS') {
      toastr.success(
        t('admin.user-panel-message-success-delete-users', 'User deleted successfully')
      );
    } else {
      toastr.error(
        t(
          'admin.user-panel-message-error-delete-users',
          'An error occurred while deleting the user'
        )
      );
    }
  };

  const handleImport = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    let status;
    await props.setImportUserRequest(formData).then((r) => (status = r));

    if (status.status && status.status === 'SUCCESS') {
      toastr.success(
        t(
          'admin.user-panel-message-success-save-import',
          'Users are being imported, when it is ready we will notify you. Thanks'
        )
      );
      return;
    }

    if (status.error && status.error.status === 422) {
      toastr.error(status.data.message);
    } else {
      toastr.error(
        t(
          'admin.user-panel-message-error-save-import',
          'It has happened when integrating the information'
        )
      );
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (filterName === '' ? props.users.length : props.users_filtered.length)
        )
      : 0;

  const isUserNotFound =
    (filterName === '' ? props.users.length : props.users_filtered.length) === 0;

  return (
    <Page title="User | Human2Coach">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          className="custom-title-blue"
        >
          <Typography variant="h4" gutterBottom className="d-flex">
            <Icon icon={peopleFill} width={30} height={30} className="mr-1" />
            {t('menu.rigth-list-item-users', 'Usuarios')}
          </Typography>
          <div>
            <UserDialog />
            {!props.users_charging && (
              <Button className="button-table ml-1" variant="contained" color="primary">
                <label htmlFor="avatar" className="d-flex">
                  <BackupIcon className="mr-1" />
                  {t('menu.metric-panel-import', 'Importar')}
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
            title={t('search.label', 'Buscar')}
          />
          {props.users_charging ? (
            <Spinner />
          ) : (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {(filterName === '' ? props.users : props.users_filtered)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const { id, username, name, position, isActive, team } = row;

                          return (
                            <TableRow hover key={index} tabIndex={-1} role="checkbox">
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{username}</TableCell>
                              <TableCell align="left">{team ? team.name : 'N/A'}</TableCell>
                              <TableCell align="left">
                                <Label variant="ghost" color={(isActive && 'success') || 'error'}>
                                  {sentenceCase(
                                    isActive
                                      ? t(
                                          'admin.header-dropdown-view-conditions-table-active-state',
                                          'Activo'
                                        )
                                      : t('disabled', 'Deshabilitado')
                                  )}
                                </Label>
                              </TableCell>
                              <TableCell align="left">
                                {GeneralFunctions.getRole(position)}
                              </TableCell>
                              <TableCell align="left">
                                <UserDialog type="EDIT" {...row} />

                                {row.isActive && (
                                  <Tooltip title={t('disable', 'Deshabilitar')}>
                                    <RemoveCircleIcon onClick={() => disableUser(id)} />
                                  </Tooltip>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
    </Page>
  );
}

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  getUsersRequest,
  getUsersFilterRequest,
  deleteUserRequest,
  disableUserRequest,
  setImportUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
