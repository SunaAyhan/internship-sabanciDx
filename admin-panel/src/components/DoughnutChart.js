import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
  
      series={[
        {
          data: [
            { id: 0, value: 10, color:'#6C5DD3' },
            { id: 1, value: 15, color:'#E4E8EF' },
            
          ],
        },
      ]}
      width={300}
      height={150}
    />
  );
}