import React, { useState, useEffect } from 'react';

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
import GeneralFunctions from '../../../libs/GeneralFunctions';

//
import Spinner from '../../Spinner';

import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppPlanMetrics(props) {
  const [chartData, setChartData] = useState(null);

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
      const dateOne = [];

      props.planSelected.metricConfs.forEach((element) => {
        if (element.metricConf && element.metricConf.type === 'TIME') {
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
        if (element.metricConf && element.metricConf.type === 'TIME') {
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
        categoriesName.push(element.metricConf ? element.metricConf.name : 'N/A');
      });

      setData(dateOne, dateTwo, categoriesName);
    }

    // eslint-disable-next-line
  }, [props.planSelected]);

  const setData = (dateOne, dateTwo, categoriesName) => {
    const chartOptionsOriginal = { ...chartOptions };
    chartOptionsOriginal.xaxis = { categories: categoriesName };

    setChartOptions(chartOptionsOriginal);
    setChartData([
      {
        name: `W${GeneralFunctions.getWeekCountLastBeforeSaved(
          props.planSelected ? props.planSelected.metricConfs[0].date1 : null
        )}`,
        data: dateOne
      },
      {
        name: `W${GeneralFunctions.getWeekCountLastBeforeSaved(
          props.planSelected ? props.planSelected.metricConfs[0].date2 : null
        )}`,
        data: dateTwo
      }
    ]);
  };

  return (
    <Card>
      {(!chartData || !chartOptions) && <Spinner />}

      {chartData && chartOptions && (
        <>
          <CardHeader
            title={`${GeneralFunctions.getWeekCountLastBeforeSavedNumber(
              props.planSelected ? props.planSelected.metricConfs[0].date1 : null
            )} / ${GeneralFunctions.getWeekCountLastBeforeSavedNumber(
              props.planSelected ? props.planSelected.metricConfs[0].date2 : null
            )}`}
          />
          <Box sx={{ mx: 3 }} dir="ltr">
            <ReactApexChart type="bar" series={chartData} options={chartOptions} height={364} />
          </Box>
        </>
      )}
    </Card>
  );
}
