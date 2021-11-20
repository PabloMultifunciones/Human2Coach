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

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

export default function TableFeedback({ title, tableHead, metrics, disabled, newPlan }) {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');

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

  const setClassToCell = (ref) => {
    console.log(ref);

    if (ref && ref.classList.contains('selected-cell')) {
      ref.classList.add('not-selected-cell');

      ref.classList.remove('selected-cell');
    } else {
      ref.classList.add('selected-cell');
      ref.classList.remove('not-selected-cell');
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
                textCenter
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
                    <TableCell align="left">{row.metric}</TableCell>

                    <TableCell align="left">{row.objective}</TableCell>
                    <TableCell align="left">{row.wbefore}</TableCell>
                    <TableCell align="left">{row.wafter}</TableCell>

                    <TableCell align="left">
                      <Checkbox
                        onClick={() => setClassToCell(myRefs.current[i])}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
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
