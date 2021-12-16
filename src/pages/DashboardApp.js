// material
import { Box, Grid, Container, Typography, Stack } from '@material-ui/core';

import GeneralFunctions from '../libs/GeneralFunctions';

// components
import Page from '../components/Page';
import { AppTableMetric } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Human2Coach">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hello, {GeneralFunctions.getNameSession()}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <a href="#OneonOne" style={{ textDecoration: 'none', color: 'white' }}>
              <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
                <Typography variant="h4" gutterBottom className="d-flex">
                  {GeneralFunctions.getIcon('One on One')}
                  One on One
                </Typography>
              </Stack>
            </a>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <a href="#pds" style={{ textDecoration: 'none', color: 'white' }}>
              <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
                <Typography variant="h4" gutterBottom className="d-flex">
                  {GeneralFunctions.getIcon('PDS')}
                  PDS{' '}
                </Typography>
              </Stack>
            </a>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <a href="#pip" style={{ textDecoration: 'none', color: 'white' }}>
              <Stack direction="row" alignItems="center" className="custom-title-blue" mb={5}>
                <Typography variant="h4" gutterBottom className="d-flex">
                  {GeneralFunctions.getIcon('PIP')}
                  PIP{' '}
                </Typography>
              </Stack>
            </a>
          </Grid>

          <Grid item xs={12} sm={12} md={12} id="OneonOne">
            <AppTableMetric title="One on One" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} id="pds">
            <AppTableMetric title="PDS" />
          </Grid>

          <Grid item xs={12} sm={12} md={12} id="pip">
            <AppTableMetric title="PIP" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
