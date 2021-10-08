// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import faker from 'faker';

// components
import Page from '../components/Page';
import { AppTableMetric } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

const metrics = [
  {
    id: faker.datatype.uuid(),
    type: 'W1',
    csatCases: 62,
    csatChats: 61,
    prodCases: 11.25,
    prodChats: 19.0,
    aht: 600,
    acw: 120,
    qa: 89.0,
    recontact: 24,
    signed: 11,
    slopes: 7
  },

  {
    id: faker.datatype.uuid(),
    type: 'W2',
    csatCases: 60,
    csatChats: 57,
    prodCases: 13.8,
    prodChats: 21.0,
    aht: 587,
    acw: 118,
    qa: 91.0,
    recontact: 22,
    signed: 14,
    slopes: 4
  },

  {
    id: faker.datatype.uuid(),
    type: 'W3',
    csatCases: 58,
    csatChats: 63,
    prodCases: 12.63,
    prodChats: 22.0,
    aht: 631,
    acw: 124,
    qa: 88.0,
    recontact: 25,
    signed: 10,
    slopes: 8
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
    recontact: 23,
    signed: 12,
    slopes: 6
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
      { id: 'recontact', label: 'Recontacto', alignRight: false },
      { id: 'signed', label: 'Firmados', alignRight: false },
      { id: 'slopes', label: 'Slopes', alignRight: false }
    ];
  }

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hola, Rodrigo Borgia</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppTableMetric
              title="One on One"
              tableHead={getTablehead('One on One')}
              metrics={metrics}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppTableMetric title="PDS" tableHead={getTablehead('PDS')} metrics={metrics} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppTableMetric title="PIP" tableHead={getTablehead('PIP')} metrics={metrics} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
