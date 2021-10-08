import { useState } from 'react';
import faker from 'faker';

// material
import {
  Card,
  Table,
  Stack,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead
} from '@material-ui/core';
// components
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
//

const METRICLIST = [
  {
    id: faker.datatype.uuid(),
    metric: 'CSAT',
    value: '62'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'Prod ',
    value: '11.25'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'AHT',
    value: '600'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'ACW',
    value: '120'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'QA',
    value: '89.0'
  },
  {
    id: faker.datatype.uuid(),
    metric: 'Recontacto',
    value: '24'
  }
];

export default function MetricTableDialog() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - METRICLIST.length) : 0;
  const isMetricNotFound = METRICLIST.length === 0;

  return (
    <Container>
      <div className="d-flex-between">
        <Typography color="textSecondary" gutterBottom>
          User: José Ortega
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Date: 04/10/21
        </Typography>
      </div>

      <Card>
        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Metric</TableCell>
                  <TableCell align="left">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {METRICLIST.map((row) => {
                  const { id, metric, value } = row;
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
                      <SearchNotFound />
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
  );
}
