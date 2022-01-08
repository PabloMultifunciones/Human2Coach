import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Drawer, Avatar, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import sidebarConfigCollaborator from './SidebarConfigCollaborator';
import sidebarConfigMaster from './SidebarConfigMaster';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function DashboardSidebar({ isOpenSidebar, onCloseSidebar, userLogged }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!userLogged) {
    return <Navigate to="/" />;
  }

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
      className="custom-bg-FA0050"
    >
      <Box sx={{ px: 2.5, py: 2.6 }} className="d-flex justify-center">
        <Box component={RouterLink} to="/">
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 1 }} className="custom-bg-white">
        <AccountStyle>
          <Avatar src="/static/icons/icon-message.png" alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              ModoFeedback
            </Typography>
          </Box>
        </AccountStyle>
      </Box>

      {userLogged.user.position === 3 && <NavSection navConfig={sidebarConfigCollaborator} />}

      {(userLogged.user.position === 1 || userLogged.user.position === 2) && (
        <NavSection navConfig={sidebarConfig} />
      )}

      {userLogged.user.position === 4 && <NavSection navConfig={sidebarConfigMaster} />}
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

const mapStateToProps = ({ loginReducer }) => loginReducer;

export default connect(mapStateToProps, null)(DashboardSidebar);
