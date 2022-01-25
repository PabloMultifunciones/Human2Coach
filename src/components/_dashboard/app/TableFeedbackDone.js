import { useState, useEffect } from 'react';
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

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//
import GeneralFunctions from '../../../libs/GeneralFunctions';

// ----------------------------------------------------------------------

function TableFeedbackDone({ title, tableHead, newPlan, metricsSelected }) {
  const { t } = useTranslation();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  useEffect(() => {
    // eslint-disable-next-line
  }, [metricsSelected]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
          <h4 className="p-1">
            {' '}
            {t('feedback-objective', 'Feedback por objetivo')}
            {GeneralFunctions.getWeekCount()}
          </h4>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHead}
                  rowCount={metricsSelected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {metricsSelected.map((row) => (
                    <TableRow hover key={row.id} tabIndex={-1} className="selected-cell">
                      <TableCell align="left">{row.metricConfName}</TableCell>
                      <TableCell align="left">{row.targetValue}</TableCell>
                      <TableCell align="left">{row.value1}</TableCell>
                      <TableCell align="left">{row.value2}</TableCell>
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
