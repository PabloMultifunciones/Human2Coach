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
      className="bg-white"
      component="img"
      src="https://filesharingdev.nyc3.digitaloceanspaces.com/public/Human2Coach/Human2Coach.ico"
      sx={{ width: 250, height: 50, ...sx }}
    />
  );
}
