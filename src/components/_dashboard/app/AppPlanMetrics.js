import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'W3', data: [400, 430, 448, 470, 300] },
  { name: 'W4', data: [400, 430, 448, 470, 300] }
];

export default function AppPlanMetrics() {
  const chartOptions = merge(BaseOptionChart(), {
    colors: ['#1266F1', '#F93154'],
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: false, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: ['CSAT casos', 'Prod. casos', 'CSAT Chat', 'AHT', 'ACW']
    }
  });

  return (
    <Card>
      <CardHeader title="W3 y W4" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
