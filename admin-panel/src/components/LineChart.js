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
                  },
                  {
                    data: performanceData.map(({avgLCP}) => (avgLCP)),
                    area: true,
                    color: "#b27de3",
                  },
                ]}
                width={500}
                height={300}
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
