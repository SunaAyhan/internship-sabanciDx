import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styled from "styled-components";
import axios from "axios";

import GoogleFontLoader from "react-google-font-loader";
const months = [
  new Date(2023, 0, 1),
  new Date(2023, 1, 1),
  new Date(2023, 2, 1),
  new Date(2023, 3, 1),

];

const LCPGDPperCapita = [
  28129, 28294.264, 28619.805, 28336.16
].map((value) => Math.round(value));

const UKGDPperCapita = [
].map((value) => Math.round(value));

const GermanyGDPperCapita = [
  25391, 26769.96, 27385.055, 27250.701
].map((value) => Math.round(value));
const ResponsiveContainer = styled.div`
  width: 100%; 
`;

export default function StackedAreas() {

  const [performanceData, setPerformanceData] = React.useState(["null"]);
React.useEffect(() => {
      axios
    .get("http://localhost:3000/get-weekly-average")
    .then((response) => {
      setPerformanceData(response.data.data);
      console.log("response")
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}, []);
if(performanceData.length > 1)
  return (
    <ResponsiveContainer>
      {" "}
      <GoogleFontLoader
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
      />{" "}
      {performanceData.length > 1 ? (
              <div> 
              <LineChart
                xAxis={[
                  {
                    data: performanceData.map(({ _id }) => ("Week "+_id.week )),
                    scaleType: "point",
                  },
                ]}
                series={[
                  {
                    data: performanceData.map(({avgLCP}) => (avgLCP)),
                    area: true,
                    color: "#b27de3",
                    label: "LCP",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgDnsTime}) => (avgDnsTime)),
                    area: true,
                    color: "#7de3c1",
                    label: "Dns",
                    stack: 'total',

                  },
                  {
                    data: performanceData.map(({avgConnectionTime}) => (avgConnectionTime)),
                    area: true,
                    color: "#e3c27d",
                    label: "Connection",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgResponseTime}) => (avgResponseTime)),
                    area: true,
                    color: "#7d90e3", 
                    label: "Response",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgDomContentLoadedEventTime}) => (avgDomContentLoadedEventTime)),
                    area: true,
                    color: "#7de3a7", 
                    label: "Dom Content",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgFCP}) => (avgFCP)),
                    area: true,
                    color: "#dbe37d", 
                    label: "Dom Content",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgLoadEventTime}) => (avgLoadEventTime)),
                    area: true,
                    color: "#e3a47d", 
                    label: "Load Event",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgRedirectCount}) => (avgRedirectCount)),
                    area: true,
                    color: "#e3a47d", 
                    label: "Redirect Count",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgNavigationStartTime}) => (avgNavigationStartTime)),
                    area: true,
                    color: "#84e37d", 
                    label: "Navigation Start",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgNavigationEndTime}) => (avgNavigationEndTime)),
                    area: true,
                    color: "#e38d7d", 
                    label: "Navigation End",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgTTFB}) => (avgTTFB)),
                    area: true,
                    color: "#7de3ab", 
                    label: "TTFB",
                    stack: 'total',
                  },
                  {
                    data: performanceData.map(({avgCodeExecutionTime}) => (avgCodeExecutionTime)),
                    area: true,
                    color: "#7d85e3", 
                    label: "Code Execution",
                    stack: 'total',
                  },
                ]}
                width={1000}
                height={400}
                sx={{
                  '--ChartsLegend-itemWidth': '120px',
                  '--ChartsLegend-rootSpacing':'20px',
                  '--ChartsLegend-itemMarkSize':'20px',
                  '--ChartsLegend-labelSpacing':'2px',
                 

                }}
                
                options={{
                  series: {},
                }}
              /></div>
                
            ) : (
              ""
            )}
    </ResponsiveContainer>
  );
}
