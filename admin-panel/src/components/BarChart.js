import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import './BarChart.css'

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 1000,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -20px)',
    },
  },



};
const dataset = [
  {
    LCP: 59,
    ConnectionTime: 57,
    responseTime: 86,
    navigationEndTime: 21,
    month: 'Jan',
  },
  {
    LCP: 50,
    ConnectionTime: 52,
    responseTime: 78,
    navigationEndTime: 28,
    month: 'Fev',
  },
  {
    LCP: 47,
    ConnectionTime: 53,
    responseTime: 106,
    navigationEndTime: 41,
    month: 'Mar',
  },
  {
    LCP: 54,
    ConnectionTime: 56,
    responseTime: 92,
    navigationEndTime: 73,
    month: 'Apr',
  },
  {
    LCP: 57,
    ConnectionTime: 69,
    responseTime: 92,
    navigationEndTime: 99,
    month: 'May',
  },
  {
    LCP: 60,
    ConnectionTime: 63,
    responseTime: 103,
    navigationEndTime: 144,
    month: 'June',
  },
  {
    LCP: 59,
    ConnectionTime: 60,
    responseTime: 105,
    navigationEndTime: 319,
    month: 'July',
  },
  {
    LCP: 65,
    ConnectionTime: 60,
    responseTime: 106,
    navigationEndTime: 249,
    month: 'Aug',
  },
  {
    LCP: 51,
    ConnectionTime: 51,
    responseTime: 95,
    navigationEndTime: 131,
    month: 'Sept',
  },
  {
    LCP: 60,
    ConnectionTime: 65,
    responseTime: 97,
    navigationEndTime: 55,
    month: 'Oct',
  },
  {
    LCP: 67,
    ConnectionTime: 64,
    responseTime: 76,
    navigationEndTime: 48,
    month: 'Nov',
  },
  {
    LCP: 61,
    ConnectionTime: 70,
    responseTime: 103,
    navigationEndTime: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

const CustomLabel = ({ x, y, value }) => (
    <text x={x} y={y} dy={-50} textAnchor="middle" fill="#000000" > 
      {value}
    </text>
  );
export default function BarsDataset() {
  return (
 
    <div className="chart-container">
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'LCP', label: 'LCP', valueFormatter },
          { dataKey: 'ConnectionTime', label: 'Connection', valueFormatter },
          { dataKey: 'responseTime', label: 'Response', valueFormatter },
          { dataKey: 'navigationEndTime', label: 'NavigationEnd', valueFormatter },
        ]}
        style={{
            '& .MuiChartsLegend-root.MuiChartsLegend-row.css-duciqg-MuiChartsLegend-root': {
              width: '3000px', // Adjust the width value as needed
            },
          }}
        {...chartSetting}
      />
    </div>
  );
}
