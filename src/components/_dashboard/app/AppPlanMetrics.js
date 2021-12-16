import React, { useState, useEffect } from 'react';
import { getWeek } from 'date-fns';

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import Spinner from '../../Spinner';

import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppPlanMetrics(props) {
  const [chartData, setChartData] = useState(null);
  const [name, setName] = useState(null);

  const [chartOptions, setChartOptions] = useState(
    merge(BaseOptionChart(), {
      colors: ['#1266F1', '#F93154'],
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
        bar: { horizontal: false, barHeight: '28%', borderRadius: 2 }
      },
      xaxis: {
        categories: []
      }
    })
  );

  useEffect(() => {
    if (props.planSelected && props.planSelected !== 'undefined') {
      const name = getWeek(new Date(props.planSelected.metricConfs[0].date1) - 1);

      const dateOne = [];

      props.planSelected.metricConfs.forEach((element) => {
        if (element.metricConf.type === 'TIME') {
          const value = element.value1.split(':');

          const secondsValue =
            parseInt(value[0], 10) * 3600 + parseInt(value[1], 10) * 60 + parseInt(value[2], 10);

          dateOne.push(secondsValue);
        } else {
          dateOne.push(element.value1);
        }
      });

      const dateTwo = [];

      props.planSelected.metricConfs.forEach((element) => {
        if (element.metricConf.type === 'TIME') {
          const value = element.value2.split(':');

          const secondsValue =
            parseInt(value[0], 10) * 3600 + parseInt(value[1], 10) * 60 + parseInt(value[2], 10);

          dateOne.push(secondsValue);
        } else {
          dateTwo.push(element.value2);
        }
      });

      const categoriesName = [];

      props.planSelected.metricConfs.forEach((element) => {
        categoriesName.push(element.metricConf.name);
      });

      setData(name, dateOne, dateTwo, categoriesName);
    }

    // eslint-disable-next-line
  }, [props.planSelected]);

  const setData = (name, dateOne, dateTwo, categoriesName) => {
    const chartOptionsOriginal = { ...chartOptions };
    chartOptionsOriginal.xaxis = { categories: categoriesName };

    setChartOptions(chartOptionsOriginal);
    setName(name);
    setChartData([
      { name: `W${name}`, data: dateOne },
      { name: `W${name + 1}`, data: dateTwo }
    ]);
  };

  return (
    <Card>
      {(!chartData || !chartOptions || !name) && <Spinner />}

      {chartData && chartOptions && name && (
        <>
          <CardHeader title={`W${name} y W${name + 1}`} />
          <Box sx={{ mx: 3 }} dir="ltr">
            <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
          </Box>
        </>
      )}
    </Card>
  );
}
