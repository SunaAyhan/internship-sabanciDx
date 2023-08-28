import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import styled from 'styled-components';
import GoogleFontLoader from 'react-google-font-loader';
const months = [
  new Date(2023, 0, 1),
  new Date(2023, 1, 1),
  new Date(2023, 2, 1),
  new Date(2023, 3, 1),
  new Date(2023, 4, 1),
  new Date(2023, 5, 1),
  new Date(2023, 6, 1),
  new Date(2023, 7, 1),
  new Date(2023, 8, 1),
  new Date(2023, 9, 1),
  new Date(2023, 10, 1),
  new Date(2023, 11, 1),
  new Date(2023, 12, 1),
  new Date(2023, 13, 1),
  new Date(2023, 14, 1),
  new Date(2023, 15, 1),
  new Date(2023, 16, 1),
  new Date(2023, 17, 1),
  new Date(2023, 18, 1),
  new Date(2023, 19, 1),
  new Date(2023, 20, 1),
  new Date(2023, 21, 1),
  new Date(2023, 22, 1),
  new Date(2023, 23, 1),
  new Date(2023, 24, 1),
  new Date(2023, 25, 1),
  new Date(2023, 26, 1),
  new Date(2023, 27, 1),
  new Date(2023, 28, 1),










];

const LCPGDPperCapita = [
  28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645, 30341.807,
  31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03, 35093.824,
  35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727, 36691, 36571,
  36632, 36527, 36827, 37124, 37895, 38515.918,
].map(value => Math.round(value));

const UKGDPperCapita = [
  26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248, 29259.764,
  30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426, 34865.78,
  35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
  36436, 36941, 37334, 37782.83, 38058.086,
].map(value => Math.round(value));

const GermanyGDPperCapita = [
  25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982, 30186.945,
  31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44, 35528.715,
  36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582, 43189, 43320,
  43413, 43922, 44293, 44689, 45619.785, 46177.617,
].map(value => Math.round(value));
  const ResponsiveContainer = styled.div`
  width: 100%; /* Set the container to full width */
`;

export default function StackedAreas() {
  const customColors = ['#ffeba7','#4e92da','#b27de3']; 
  const containerRef = React.useRef(null);



  return (
    <ResponsiveContainer> <GoogleFontLoader
    fonts={[
      {
        font: "Poppins",
        weights: [400, 700],
      },
      {
        font: "Oswald",
        weights: [400, 700],
      },
    ]}
    subsets={["cyrillic-ext", "greek"]}
  /> <LineChart
    style={{
      fontFamily:'Poppins'
    }}
      xAxis={[
        {
          id: 'Months',
          data: months,
          scaleType: 'time',
          valueFormatter: (date) =>
            new Intl.DateTimeFormat('default', { month: 'short' }).format(date),
        },
      ]}
      colors={customColors}

      series={[
        {
          id: 'LCP',
          label: 'LCP',
          data: LCPGDPperCapita,
          stack: 'total',
          area: true,
        },
        {
          id: 'Germany',
          label: 'Response Time',
          data: GermanyGDPperCapita,
          stack: 'total',
          area: true,
        },
        {
          id: 'United Kingdom',
          label: 'Duration',
          data: UKGDPperCapita,
          stack: 'total',
          area: true,
        },
      ]}
      sx={{
        '--ChartsLegend-itemWidth': '150px',
        '--ChartsLegend-fontFamily':'Poppins'
      }}
    
      height={400}
     
    /></ResponsiveContainer>
  
  );
}
