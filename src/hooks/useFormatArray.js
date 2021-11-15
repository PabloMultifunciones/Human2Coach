import { useEffect, useState } from 'react';
import GeneralFunctions from '../libs/GeneralFunctions';

export function useFormatArray(array) {
  const [columns] = useState(array.data.columns);
  const [fileCode] = useState(array.data.fileCode);
  const [firstRow] = useState(array.data.firstRow);
  const [prevew] = useState(array.data.prevew);

  const [arrayColumnsFormatted, setArrayColumnsFormatted] = useState([]);

  useEffect(() => {
    const arrayWithColumns = columns.filter((column) => column.id == null);
    const arrayWithMetrics = columns.filter((column) => column.id != null);

    const deletedDuplicates = GeneralFunctions.deleteDuplicates(arrayWithColumns, 'columnName');

    setArrayColumnsFormatted(deletedDuplicates.concat(arrayWithMetrics));
    // eslint-disable-next-line
  }, []);
  return [arrayColumnsFormatted, fileCode, firstRow, prevew];
}
