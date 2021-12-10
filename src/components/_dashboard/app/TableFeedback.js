import { useState, useRef, useEffect } from 'react';
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

import { setMetricsSelected, deleteMetricsSelected } from '../../../actions/plansActions';

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

function TableFeedback({
  title,
  metrics,
  disabled,
  checked,
  newPlan,
  setMetricsSelected,
  deleteMetricsSelected
}) {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');

  const [tableHead] = useState([
    { id: 'metric', label: 'Métrica', alignRight: false },
    { id: 'objective', label: 'Objetivo', alignRight: false },
    { id: 'wbefore', label: 'W44 (25/10/2021)', alignRight: false },
    { id: 'wafter', label: 'W44 (01/11/2021)', alignRight: false },
    { id: 'check', label: 'Check', alignRight: false }
  ]);

  const myRefs = useRef([]);

  useEffect(() => {
    myRefs.current = myRefs.current.slice(0, metrics.length);
  }, [metrics]);

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

  const setClassToCell = (ref, row) => {
    if (ref && ref.classList.contains('selected-cell')) {
      ref.classList.add('not-selected-cell');
      ref.classList.remove('selected-cell');
      deleteMetricsSelected(row);
    } else {
      ref.classList.add('selected-cell');
      ref.classList.remove('not-selected-cell');
      setMetricsSelected(row);
    }
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

      <Card>
        <Scrollbar>
          <TableContainer>
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
                {metrics.map((row, i) => (
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                    ref={(el) => (myRefs.current[i] = el)}
                    className="not-selected-cell"
                  >
                    <TableCell align="left">
                      {row.metricConf ? row.metricConf.name : 'N/A'}
                    </TableCell>
                    <TableCell align="left">{row.targetValue}</TableCell>
                    <TableCell align="left">{row.value1}</TableCell>
                    <TableCell align="left">{row.value2}</TableCell>

                    <TableCell align="left">
                      <Checkbox
                        onClick={() => setClassToCell(myRefs.current[i], row)}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        checked={checked}
                        disabled={disabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
}

const mapDispatchToProps = {
  setMetricsSelected,
  deleteMetricsSelected
};

export default connect(null, mapDispatchToProps)(TableFeedback);
