// material
import { Box, Grid, Container, Typography, Stack } from '@material-ui/core';
import faker from 'faker';

import GeneralFunctions from '../libs/GeneralFunctions';

// components
import Page from '../components/Page';
import { AppTableMetric } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

const metrics = [
  {
    id: faker.datatype.uuid(),
    type: 'W1',
    csatCases: 63,
    csatChats: 58,
    prodCases: 11.05,
    prodChats: 18.0,
    aht: 619,
    acw: 121,
    qa: 92.0,
    sent: 8,
    slopes: 6,
    signed: 12,
    total: 23,
    saved: 4
  },

  {
    id: faker.datatype.uuid(),
    type: 'W2',
    csatCases: 63,
    csatChats: 58,
    prodCases: 11.05,
    prodChats: 18.0,
    aht: 619,
    acw: 121,
    qa: 92.0,
    sent: 8,
    slopes: 6,
    signed: 12,
    total: 23,
    saved: 4
  },

  {
    id: faker.datatype.uuid(),
    type: 'W3',
    csatCases: 63,
    csatChats: 58,
    prodCases: 11.05,
    prodChats: 18.0,
    aht: 619,
    acw: 121,
    qa: 92.0,
    sent: 8,
    slopes: 6,
    signed: 12,
    total: 23,
    saved: 4
  },

  {
    id: faker.datatype.uuid(),
    type: 'W4',
    csatCases: 63,
    csatChats: 58,
    prodCases: 11.05,
    prodChats: 18.0,
    aht: 619,
    acw: 121,
    qa: 92.0,
    sent: 8,
    slopes: 6,
    signed: 12,
    total: 23,
    saved: 4
  }
];

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
            <AppTableMetric title="One on One" metrics={metrics} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} id="pds">
            <AppTableMetric title="PDS" metrics={metrics} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} id="pip">
            <AppTableMetric title="PIP" metrics={metrics} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
