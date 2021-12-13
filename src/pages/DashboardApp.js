// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
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
  function getTablehead(type) {
    return [
      { id: 'type', label: type, alignRight: false },
      { id: 'csatCases', label: 'CSAT Casos', alignRight: false },
      { id: 'csatChats', label: 'CSAT Chats', alignRight: false },
      { id: 'prodCases', label: 'Prod Casos', alignRight: false },
      { id: 'prodChats', label: 'Prod Chats', alignRight: false },
      { id: 'aht', label: 'AHT', alignRight: false },
      { id: 'acw', label: 'ACW', alignRight: false },
      { id: 'qa', label: 'QA', alignRight: false },
      { id: 'sent', label: 'Enviados', alignRight: false },
      { id: 'slopes', label: 'Pendientes', alignRight: false },
      { id: 'signed', label: 'Firmados', alignRight: false },
      { id: 'total', label: 'Total', alignRight: false },
      { id: 'saved', label: 'Guardados', alignRight: false }
    ];
  }

  return (
    <Page title="Dashboard | Human2Coach">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hola, {GeneralFunctions.getNameSession()}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppTableMetric
              title="One on One"
              tableHead={getTablehead('Uno a uno')}
              metrics={metrics}
              id="oneonone"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} id="metric">
            <AppTableMetric title="PDS" tableHead={getTablehead('PDS')} metrics={metrics} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} id="pip">
            <AppTableMetric title="PIP" tableHead={getTablehead('PIP')} metrics={metrics} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
