import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material

import { useTranslation } from 'react-i18next';

import { Box, Card, CardHeader } from '@material-ui/core';

//
import BaseOptionChart from '../../libs/BaseOptionChart';
import { fNumber } from '../../libs/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function MetricsChart({ dataMetric }) {
  const { t } = useTranslation();

  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(
    merge(BaseOptionChart(), {
      tooltip: {
        marker: { show: false },
        y: {
          formatter: (seriesName) => fNumber(seriesName),
          title: {
            formatter: (seriesName) => `${seriesName}: `
          }
        }
      },
      plotOptions: {
        bar: {
          vertical: true,
          barHeight: '28%',
          borderRadius: 2
        }
      },
      xaxis: {
        categories: null
      },
      yaxis: {
        labels: {
          formatter: (value) =>
            Number.isNaN(value) || value === Infinity ? 1 : parseInt(value, 10)
        }
      }
    })
  );

  useEffect(() => {
    setDataChart(dataMetric);
    // eslint-disable-next-line
  }, []);

  const setDataChart = (data) => {
    const dataArray = [...data];
    const categoriesData = [
      `W${data[0].weekOfYear}`,
      `W${data[1].weekOfYear}`,
      `W${data[2].weekOfYear}`,
      `W${data[3].weekOfYear}`
    ];

    const chartData = [];
    let nameData = [];
    let valueData = [];

    nameData.push(['One on One']);
    for (let i = 0; i < dataArray.length; i += 1) {
      valueData.push(dataArray[i].oneOnOneCount);
    }
    chartData.push({
      name: nameData,
      type: 'column',
      data: valueData
    });
    nameData = [];
    valueData = [];

    nameData.push(['PDS']);
    for (let i = 0; i < dataArray.length; i += 1) {
      valueData.push(dataArray[i].pdsCount);
    }
    chartData.push({
      name: nameData,
      type: 'column',
      data: valueData
    });

    nameData = [];
    valueData = [];

    nameData.push(['PIP']);
    for (let i = 0; i < dataArray.length; i += 1) {
      valueData.push(dataArray[i].pipCount);
    }
    chartData.push({
      name: nameData,
      type: 'column',
      data: valueData
    });

    const chartOptionsOriginal = { ...chartOptions };
    chartOptionsOriginal.xaxis.categories = categoriesData;
    setChartOptions(chartOptionsOriginal);
    setChartData(chartData);
  };

  return (
    <>
      <>
        {chartData && chartOptions && (
          <Card>
            <CardHeader title={t('resume.label', 'RESUMEN')} />
            <Box sx={{ mx: 3 }} dir="ltr">
              <ReactApexChart type="bar" series={chartData} options={chartOptions} height={420} />
            </Box>
          </Card>
        )}
      </>
    </>
  );
}
