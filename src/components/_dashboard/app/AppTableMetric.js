import { useState, useEffect } from 'react';
import TableHead from '@material-ui/core/TableHead';
import { connect } from 'react-redux';

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

import {
  getMetricsOneRequest,
  getMetricsOneFilterRequest
} from '../../../actions/dashboardActions';

import SearchNotFound from '../../SearchNotFound';
//

// ----------------------------------------------------------------------

function AppTableMetric(props) {
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

  useEffect(() => {
    if (props.title === 'One on One') {
      props.getMetricsOneRequest({ number: 0 });
    }
    // eslint-disable-next-line
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.metrics.length) : 0;

  const isUserNotFound = props.metrics.length === 0;

  return (
    <>
      <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
        <Typography variant="h4" gutterBottom className="d-flex">
          {GeneralFunctions.getIcon(props.title)}

          {props.title}
        </Typography>
      </Stack>

      <Card>
        {/* <UserListToolbar filterName={filterName} showTeam /> */}
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell key="type">One on one</TableCell>
                  <TableCell key="csatCases">CSAT Cases </TableCell>
                  <TableCell key="csatChats">CSAT Chats</TableCell>
                  <TableCell key="prodCases">Prod Casos</TableCell>
                  <TableCell key="prodChats">Prod Chats</TableCell>
                  <TableCell key="aht">AHT</TableCell>
                  <TableCell key="acw">ACW</TableCell>
                  <TableCell key="qa">QA</TableCell>
                  <TableCell key="sent">Sent</TableCell>
                  <TableCell key="slopes">Pending</TableCell>
                  <TableCell key="signed">Signed</TableCell>
                  <TableCell key="total">Total</TableCell>
                  <TableCell key="saved">Saved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.metrics.map((row) => (
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
          count={props.metrics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

const mapStateToProps = ({ dashboardReducer }) => dashboardReducer;

const mapDispatchToProps = {
  getMetricsOneRequest,
  getMetricsOneFilterRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTableMetric);
