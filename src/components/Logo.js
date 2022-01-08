import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="https://filesharingdev.nyc3.digitaloceanspaces.com/public/Human2Coach/Human2Coach2.ico"
      sx={{ width: 180, height: 50, ...sx }}
    />
  );
}
