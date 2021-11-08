import { filter } from 'lodash';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
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

// Icons----------------------------------------------------------------------

import BackupIcon from '@material-ui/icons/Backup';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
//

import MetricDialog from '../components/Dialogs/MetricDialog';
import DeleteDialog from '../components/Dialogs/DeleteDialog';
import ShowDetailsDialog from '../components/Dialogs/ShowDetails';

const METRICLIST = [
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    description: 'Lorem ipsum',
    variableType: 'Tiempo',
    frequency: 'Diaria',
    points: 'Suam puntos',
    impact: 'No',
    status: 'Activo'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    description: 'Lorem ipsum',
    variableType: 'Tiempo',
    frequency: 'Diaria',
    points: 'Suam puntos',
    impact: 'No',
    status: 'Activo'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    description: 'Lorem ipsum',
    variableType: 'Tiempo',
    frequency: 'Diaria',
    points: 'Suam puntos',
    impact: 'No',
    status: 'Activo'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    description: 'Lorem ipsum',
    variableType: 'Tiempo',
    frequency: 'Diaria',
    points: 'Suam puntos',
    impact: 'No',
    status: 'Activo'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    description: 'Lorem ipsum',
    variableType: 'Tiempo',
    frequency: 'Diaria',
    points: 'Suam puntos',
    impact: 'No',
    status: 'Activo'
  }
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'metric', label: 'Metric', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'variableType', label: 'Variable type', alignRight: false },
  { id: 'frequency', label: 'Frequency', alignRight: false },
  { id: 'points', label: 'Points', alignRight: false },
  { id: 'impact', label: 'Impact/Supervisor', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false }
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
      (_metric) => _metric.metric.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Metric() {
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
      const newSelecteds = METRICLIST.map((n) => n.metric);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - METRICLIST.length) : 0;

  const filteredUsers = applySortFilter(METRICLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const deleteField = () => {
    console.log('DELETE');
  };

  return (
    <Page title="User | Human2Coach">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Metric
          </Typography>

          <div>
            <MetricDialog />
            <Button className="button-table mr-1" variant="contained" color="primary">
              <label htmlFor="avatar" className="d-flex">
                <BackupIcon className="mr-1" />
                Import
                <input
                  type="file"
                  className="d-none"
                  id="avatar"
                  name="avatar"
                  // onChange={(e) => this.handleImport(e)}
                />
              </label>
            </Button>
          </div>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            title="Search..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={METRICLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        metric,
                        description,
                        variableType,
                        frequency,
                        points,
                        impact,
                        status
                      } = row;
                      const isItemSelected = selected.indexOf(metric) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{metric}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{variableType}</TableCell>
                          <TableCell align="left">{frequency}</TableCell>

                          <TableCell align="left">{points ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{impact ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{status ? 'Yes' : 'No'}</TableCell>

                          <TableCell align="right">
                            <ShowDetailsDialog {...row} />
                            <MetricDialog {...row} typeModal="modalEdit" />

                            <DeleteDialog delete={() => deleteField(row.id)} />
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
                {isUserNotFound && (
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={METRICLIST.length}
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
