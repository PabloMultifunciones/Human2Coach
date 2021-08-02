// material
import { Box, Grid, Container, Typography } from '@material-ui/core';

import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import { ListColors } from '../utils/colors';

// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hola, Rodrigo Borgia</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales
              number="568"
              title="Agentes totales"
              icon={<PeopleOutlineIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.GREEN}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers
              number="57"
              title="Agentes ingresan a seguimiento"
              icon={<ArrowDownwardIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.YELLOW}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders
              number="570"
              title="Agentes superan seguimiento"
              icon={<ArrowUpwardIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.GREEN}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports
              number="10.04%"
              title="% Agentes en seguimiento"
              icon={<EqualizerIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.LIGHTBLUE}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales
              number="0"
              title="Agentes PIP"
              icon={<PeopleOutlineIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.RED}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers
              number="0"
              title="Agentes superan PIP"
              icon={<ArrowUpwardIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.GREEN}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders
              number="0"
              title="Agentes NO superan PIP"
              icon={<ArrowDownwardIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.RED}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports
              number="0.00%"
              title="% Agentes en PIP"
              icon={<EqualizerIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.LIGHTBLUE}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales
              number="118"
              title="One on one"
              icon={<GroupAddIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.LIGHTBLUE}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers
              number="90.77%"
              title="% de agentes con One on One"
              icon={<EqualizerIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.GREEN}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders
              number="97.69%"
              title="% de feedbacks entregados"
              icon={<EqualizerIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.GREEN}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports
              number="2.31%"
              title="% de feedbacks pendientes"
              icon={<EqualizerIcon />}
              color={ListColors.WHITE}
              backgroundcolor={ListColors.RED}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
