import PropTypes from 'prop-types';
// material
import { TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  headLabel: PropTypes.array
};

export default function UserListHead({ headLabel, textCenter }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} className={textCenter ? 'text-center' : ''}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
