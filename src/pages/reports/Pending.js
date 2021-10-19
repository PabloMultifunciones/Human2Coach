import { filter } from 'lodash';
import { useState } from 'react';
import faker from 'faker';
import Button from '@material-ui/core/Button';
import { Icon } from '@iconify/react';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// icons

import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
import messageSquareOutline from '@iconify/icons-eva/message-square-outline';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListToolbar } from '../../components/_dashboard/user';
//

const METRICLIST = [
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    value: '62',
    pending: 7
  },
  {
    id: faker.datatype.uuid(),
    metric: 'Prod ',
    value: '11.25',
    pending: 8
  },
  {
    id: faker.datatype.uuid(),
    metric: 'AHT',
    value: '600',
    pending: 7
  },
  {
    id: faker.datatype.uuid(),
    metric: 'ACW',
    value: '120',
    pending: 10
  },
  {
    id: faker.datatype.uuid(),
    metric: 'QA',
    value: '89.0',
    pending: 3
  },
  {
    id: faker.datatype.uuid(),
    metric: 'Recontacto',
    value: '24',
    pending: 14
  }
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

export default function Pending() {
  const [page, setPage] = useState(0);
  const [order] = useState('asc');
  const [selected] = useState([]);
  const [orderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByMetric = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - METRICLIST.length) : 0;
  const filteredMetric = applySortFilter(METRICLIST, getComparator(order, orderBy), filterName);

  const isMetricNotFound = filteredMetric.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pendiente
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={(e) => handleFilterByMetric(e)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Metrica</TableCell>
                    <TableCell align="left">Valor</TableCell>
                    <TableCell align="left">Pendiente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMetric.map((row) => {
                    const { id, metric, value, pending } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2} className="ml-1">
                            <Typography variant="subtitle2" noWrap>
                              {metric}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{value}</TableCell>
                        <TableCell align="left">{pending}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isMetricNotFound && (
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
            count={METRICLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <Stack direction="row" alignItems="center" justifyContent="end" mt={5}>
          <div>
            <Button className="button-table mr-1" variant="contained" color="secondary">
              <Icon className="mr-1" icon={clipboardOutline} width={22} height={22} />
              Chat
            </Button>
            <Button className="button-table mr-1" variant="contained" color="primary">
              <Icon className="mr-1" icon={messageSquareOutline} width={22} height={22} /> Casos
            </Button>
          </div>
        </Stack>
      </Container>
    </Page>
  );
}
