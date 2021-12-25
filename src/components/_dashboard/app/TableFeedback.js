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
import { format, subDays, startOfWeek } from 'date-fns';

import { setMetricsSelected, deleteMetricsSelected } from '../../../actions/plansActions';
import GeneralFunctions from '../../../libs/GeneralFunctions';

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
  const [tableHead] = useState([
    { id: 'metric', label: 'Metric', alignRight: false },
    { id: 'objective', label: 'Objective', alignRight: false },
    {
      id: 'wbefore',
      label: `W${GeneralFunctions.getWeekCountBefore()}  ${format(
        subDays(startOfWeek(new Date()), 7),
        'dd/MM/yyyy'
      )}`,
      alignRight: false
    },
    {
      id: 'wafter',
      label: `W${GeneralFunctions.getWeekCount()}  ${format(
        subDays(startOfWeek(new Date()), 1),
        'dd/MM/yyyy'
      )}`,
      alignRight: false
    },
    { id: 'check', label: 'Check', alignRight: false }
  ]);

  const myRefs = useRef([]);

  useEffect(() => {
    myRefs.current = myRefs.current.slice(0, metrics.length);
  }, [metrics]);

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
        <h4 className="p-1">
          {' '}
          Feedback by objective{' '}
          {`(W${GeneralFunctions.getWeekCount()}: ${format(new Date(), 'dd/MM/yyyy')})`}
        </h4>
        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead headLabel={tableHead} rowCount={metrics.length} />
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
