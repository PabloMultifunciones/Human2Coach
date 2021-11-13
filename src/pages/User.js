import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/core/Alert';

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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import UserDialog from '../components/Dialogs/UserDialog';
import DeleteDialog from '../components/Dialogs/DeleteDialog';

import { getUsersRequest, getUsersFilterRequest, deleteUserRequest } from '../actions/usersActions';

import Spinner from '../components/Spinner';

import GeneralFunctions from '../libs/GeneralFunctions';

//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'status', label: 'State', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
];

// ----------------------------------------------------------------------

function User(props) {
  const [page, setPage] = useState(0);
  const [selected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);

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
    if (event.target.value.length > 2) {
      props.getUsersFilterRequest({ number: 0, filterName: event.target.value });
      setPage(0);
    }
    if (event.target.value === '') {
      props.getUsersRequest({ number: 0, filterName: event.target.value });
      setPage(0);
    }
    setFilterName(event.target.value);
  };

  const deleteUser = (id) => {
    props.deleteUserRequest({ id, filterName });
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <UserDialog />
        </Stack>

        <Card>
          {props.users_charging ? (
            <Spinner />
          ) : (
            <>
              {props.error_users && <Alert severity="error">{props.error_users.message}</Alert>}

              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
                title="Buscar..."
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {(filterName === '' ? props.users : props.users_filtered)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const { id, name, role, isActive, team } = row;

                          return (
                            <TableRow hover key={index} tabIndex={-1} role="checkbox">
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{team.name}</TableCell>
                              <TableCell align="left">
                                <Label variant="ghost" color={(isActive && 'success') || 'error'}>
                                  {sentenceCase(isActive ? 'Active' : 'Disabled')}
                                </Label>
                              </TableCell>
                              <TableCell align="left">{GeneralFunctions.getRole(role)}</TableCell>

                              <TableCell align="left">
                                <UserDialog type="EDIT" {...row} />
                                <DeleteDialog delete={() => deleteUser(id)} />
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
    </Page>
  );
}

const mapStateToProps = ({ usersReducer }) => usersReducer;

const mapDispatchToProps = {
  getUsersRequest,
  getUsersFilterRequest,
  deleteUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
