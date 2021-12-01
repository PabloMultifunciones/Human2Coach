import { Icon } from '@iconify/react';
import { connect } from 'react-redux';

import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';

import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';
//

import MetricPreference from '../../components/Dialogs/MetricPreference';
import MetricPassword from '../../components/Dialogs/MetricPassword';

import { logoutRequest } from '../../actions/loginActions';
import environment from '../../libs/environment';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Avatar',
    icon: personFill,
    linkTo: '/dashboard//avatar'
  }
];

// ----------------------------------------------------------------------

function AccountPopover(props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleCloseDialog = (event) => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!props.userLogged) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    props.logoutRequest();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={environment.motivarnosBackend + props.userLogged.user.image} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {props.userLogged.user.username}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <MenuItem>
          <MetricPreference handleCloseDialog={() => handleCloseDialog()} />
        </MenuItem>

        {props.userLogged && props.userLogged.souceType === 'WEB' && (
          <MenuItem>
            <MetricPassword handleCloseDialog={() => handleCloseDialog()} />
          </MenuItem>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

const mapStateToProps = ({ loginReducer }) => loginReducer;

const mapDispatchToProps = {
  logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover);
