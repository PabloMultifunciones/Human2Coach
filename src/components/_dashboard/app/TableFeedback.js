import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
import GeneralFunctions from '../../../libs/GeneralFunctions';

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

function TableFeedback({
  title,
  planSelected,
  metrics,
  disabled,
  checked,
  newPlan,
  setMetricsSelected,
  deleteMetricsSelected
}) {
  const { t } = useTranslation();

  const [tableHead] = useState([
    { id: 'metric', label: t('menu.metric-panel-title', 'Métrica'), alignRight: false },
    { id: 'objective', label: t('goal.label', 'Objetivo'), alignRight: false },
    {
      id: 'wLastbefore',
      label: GeneralFunctions.getWeekCountLastBeforeSaved(
        planSelected ? planSelected.metricConfs[0].date1 : null
      ),
      alignRight: false
    },
    {
      id: 'wbefore',
      label: GeneralFunctions.getWeekCountBeforeSaved(
        planSelected ? planSelected.metricConfs[0].date2 : null
      ),
      alignRight: false
    },
    { id: 'check', label: t('check', 'Check'), alignRight: false }
  ]);

  const myRefs = useRef([]);

  useEffect(() => {
    myRefs.current = myRefs.current.slice(0, metrics.length);
  }, [metrics]);

  const setClassToCell = (ref, row) => {
    if (disabled) {
      if (ref && ref.classList.contains('selected-cell')) {
        ref.classList.add('not-selected-cell');
        ref.classList.remove('selected-cell');
        deleteMetricsSelected(row);
      } else {
        ref.classList.add('selected-cell');
        ref.classList.remove('not-selected-cell');
        setMetricsSelected(row);
      }
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
          {t('feedback-objective', 'Feedback por objetivo')}{' '}
          {GeneralFunctions.getWeekCount(planSelected ? planSelected.created : null)}
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
