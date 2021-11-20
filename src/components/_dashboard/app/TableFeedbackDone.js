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
  TableContainer
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

function TableFeedbackDone({ title, tableHead, metrics, newPlan, metricsSelected }) {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');

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

  return (
    <>
      {!newPlan && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Stack>
      )}

      {metricsSelected.length > 0 && (
        <Card>
          <h4 className="p-1">Feedback por objetivo (W45: 08/11/2021)</h4>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHead}
                  rowCount={metricsSelected.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {metricsSelected.map((row) => (
                    <TableRow hover key={row.id} tabIndex={-1} className="selected-cell">
                      <TableCell align="left">{row.metric}</TableCell>
                      <TableCell align="left">{row.objective}</TableCell>
                      <TableCell align="left">{row.wbefore}</TableCell>
                      <TableCell align="left">{row.wafter}</TableCell>
                      <TableCell align="left">
                        <Checkbox
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          checked
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      )}
    </>
  );
}

const mapStateToProps = ({ plansReducer }) => plansReducer;

export default connect(mapStateToProps, null)(TableFeedbackDone);
