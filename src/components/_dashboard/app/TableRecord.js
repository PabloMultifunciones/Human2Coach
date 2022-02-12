import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// material
import { Card, Table, TableRow, TableBody, TableCell, TableContainer } from '@material-ui/core';
import GeneralFunctions from '../../../libs/GeneralFunctions';

// components
import Scrollbar from '../../Scrollbar';
import { UserListHead } from '../user';
//

// ----------------------------------------------------------------------

function TableRecord(props) {
  const { t } = useTranslation();

  const [tableHead] = useState([
    { id: 'lastChange', label: t('changeDate', 'Fecha de cambio'), alignRight: false },
    {
      id: 'lastChange',
      label: t('commitDateOld', 'Fecha de compromiso cambiada'),
      alignRight: false
    },
    { id: 'lastChange', label: t('commitDateNew', 'Fecha de compromiso nueva'), alignRight: false }
  ]);

  return (
    <>
      <Card>
        <h4 className="p-1">
          {t('shippingDate', 'Fecha de envío')}:{' '}
          {GeneralFunctions.getDate(props.planSelected.row.sendedDate)}
        </h4>
        <Scrollbar>
          <TableContainer>
            <Table>
              {/* rowCount={metrics.length} */}
              <UserListHead headLabel={tableHead} />
              <TableBody>
                {props.planSelected.changeLogs.map((row, i) => (
                  <TableRow key={i} hover tabIndex={-1} className="not-selected-cell">
                    <TableCell align="left">{GeneralFunctions.getDate(row.created)}</TableCell>
                    <TableCell align="left">
                      {GeneralFunctions.getDate(row.commitmentDateOld)}
                    </TableCell>
                    <TableCell align="left">
                      {GeneralFunctions.getDate(row.commitmentDate)}
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

export default TableRecord;
