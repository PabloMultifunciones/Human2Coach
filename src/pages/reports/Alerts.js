import { filter } from 'lodash';
import { useState } from 'react';
import faker from 'faker';

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
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/_dashboard/user';
//
const ALERTLIST = [
  {
    id: faker.datatype.uuid(),
    numberDays: '4',
    alertOne: 'Team Leader',
    alertTwo: 'Team Manager',
    alertThree: 'Oficial Member',
    alertFour: 'Member VIP'
  },

  {
    id: faker.datatype.uuid(),
    numberDays: '3',
    alertOne: 'Team Manager',
    alertTwo: 'Member VIP',
    alertThree: 'Team Leader',
    alertFour: 'Oficial Member'
  },

  {
    id: faker.datatype.uuid(),
    numberDays: '5',
    alertOne: 'Team Leader',
    alertTwo: 'Member VIP',
    alertThree: 'Team Manager',
    alertFour: 'Oficial Member'
  },

  {
    id: faker.datatype.uuid(),
    numberDays: '7',
    alertOne: 'Team Manager',
    alertTwo: 'Member VIP',
    alertThree: 'Team Leader',
    alertFour: 'Oficial Member'
  },

  {
    id: faker.datatype.uuid(),
    numberDays: '8',
    alertOne: 'Team Leader',
    alertTwo: 'Member VIP',
    alertThree: 'Team Manager',
    alertFour: 'Oficial Member'
  }
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'numberDays', label: 'Number of days', alignRight: false },
  { id: 'alertOne', label: 'Alert 1', alignRight: false },
  { id: 'alertTwo', label: 'Alert 2', alignRight: false },
  { id: 'alertThree', label: 'Alert 3', alignRight: false },
  { id: 'alertFour', label: 'Alert 4', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_alert) => _alert.numberDays.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Alerts() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ALERTLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByDays = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ALERTLIST.length) : 0;
  const filteredUsers = applySortFilter(ALERTLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Alerts
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={(e) => handleFilterByDays(e)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ALERTLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers.map((row) => (
                    <TableRow hover key={row.id} tabIndex={-1}>
                      <TableCell align="left">{row.numberDays}</TableCell>
                      <TableCell align="left">{row.alertOne}</TableCell>
                      <TableCell align="left">{row.alertTwo}</TableCell>

                      <TableCell align="left">{row.alertThree}</TableCell>
                      <TableCell align="left">{row.alertFour}</TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ALERTLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
