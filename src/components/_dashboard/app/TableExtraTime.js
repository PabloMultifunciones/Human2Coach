import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material
import { Card, Table, TableRow, TableBody, TableCell, TableContainer } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

export default function TableExtraTime({
  tableHead,
  extraTime,
  disabled,
  setExtraTime,
  propsSick,
  propsHolidays,
  propsDisciplinaryProcess
}) {
  const { t } = useTranslation();

  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');

  const [{ sick, holidays, disciplinaryProcess }, setState] = useState({
    sick: propsSick,
    holidays: propsHolidays,
    disciplinaryProcess: propsDisciplinaryProcess
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked
    }));
    setExtraTime(event.target.name, event.target.checked);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = extraTime.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <>
      <Card>
        <Scrollbar>
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={tableHead}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                <TableRow hover tabIndex={-1}>
                  <TableCell align="left">{t('sick-leave', 'Baja por enfermedad')}</TableCell>

                  <TableCell align="left">
                    <Checkbox
                      name="sick"
                      checked={sick}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      disabled={disabled}
                    />
                  </TableCell>
                </TableRow>

                <TableRow hover tabIndex={-1}>
                  <TableCell align="left">{t('vacations', 'Vacaciones')}</TableCell>

                  <TableCell align="left">
                    <Checkbox
                      name="holidays"
                      checked={holidays}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      disabled={disabled}
                    />
                  </TableCell>
                </TableRow>

                <TableRow hover tabIndex={-1}>
                  <TableCell align="left">
                    {t('disciplinary-process', 'Proceso Disciplinario')}
                  </TableCell>

                  <TableCell align="left">
                    <Checkbox
                      name="disciplinaryProcess"
                      checked={disciplinaryProcess}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      disabled={disabled}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
}
