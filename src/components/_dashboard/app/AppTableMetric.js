import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
//

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
      (_metric) => _metric.type.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AppTableMetric({ title, tableHead, metrics }) {
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
      const newSelecteds = metrics.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - metrics.length) : 0;
  const filteredUsers = applySortFilter(metrics, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Stack>

      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={(e) => handleFilterByName(e)}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={tableHead}
                rowCount={metrics.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.map((row) => {
                  const isItemSelected = selected.indexOf(row.type) !== -1;

                  return (
                    <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align="left">{row.type}</TableCell>

                      <TableCell align="left">{row.csatCases}</TableCell>
                      <TableCell align="left">{row.csatChats}</TableCell>
                      <TableCell align="left">{row.prodCases}</TableCell>
                      <TableCell align="left">{row.prodChats}</TableCell>
                      <TableCell align="left">{row.aht}</TableCell>

                      <TableCell align="left">{row.acw}</TableCell>

                      <TableCell align="left">{row.qa}</TableCell>
                      <TableCell align="left">{row.recontact}</TableCell>
                      <TableCell align="left">{row.signed}</TableCell>
                      <TableCell align="left">{row.saved}</TableCell>

                      <TableCell align="left">{row.slopes}</TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={metrics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
