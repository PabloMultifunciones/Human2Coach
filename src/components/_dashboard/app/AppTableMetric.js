import { useState } from 'react';
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

import SearchNotFound from '../../SearchNotFound';
import { UserListHead } from '../user'; // UserListToolbar
//

// ----------------------------------------------------------------------

export default function AppTableMetric({ title, tableHead, metrics }) {
  const [page, setPage] = useState(0);
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - metrics.length) : 0;

  const isUserNotFound = metrics.length === 0;

  return (
    <>
      <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
        <Typography variant="h4" gutterBottom className="d-flex">
          {GeneralFunctions.getIcon(title)}

          {title}
        </Typography>
      </Stack>

      <Card>
        {/* <UserListToolbar filterName={filterName} showTeam /> */}
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead headLabel={tableHead} rowCount={metrics.length} />
              <TableBody>
                {metrics.map((row) => (
                  <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                    <TableCell align="left">{row.type}</TableCell>

                    <TableCell align="left">{row.csatCases}</TableCell>
                    <TableCell align="left">{row.csatChats}</TableCell>
                    <TableCell align="left">{row.prodCases}</TableCell>
                    <TableCell align="left">{row.prodChats}</TableCell>
                    <TableCell align="left">{row.aht}</TableCell>

                    <TableCell align="left">{row.acw}</TableCell>

                    <TableCell align="left">{row.qa}</TableCell>
                    <TableCell align="left">{row.sent}</TableCell>
                    <TableCell align="left">{row.slopes}</TableCell>
                    <TableCell align="left">{row.signed}</TableCell>

                    <TableCell align="left">{row.total}</TableCell>
                    <TableCell align="left">{row.saved}</TableCell>
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
          rowsPerPageOptions={[7]}
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
