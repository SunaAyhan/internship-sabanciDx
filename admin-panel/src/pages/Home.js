import { Card, Container, Grid } from "@mui/material";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import ButtonAppBar from "../components/AppBar";
import DoughnutChart from "../components/DoughnutChart";
import BasicPie from "../components/DoughnutChart";
import { JsonFunction } from "react-router-dom";
import BarsDataset from "../components/BarChart";
import StackedAreas from "../components/LineChart";
import MetricsCard from "../components/MetricsCard";
import GoogleFontLoader from "react-google-font-loader";
import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

const Title = styled.p`
  color: #000000;
  font-size: 23px;
  font-weight: bold;
  font-family: Poppins;
  letter-spacing: -1px;
  line-height: 23px;
`;

const GraphCard = styled(Card)`
  padding: 16px;
  border-radius: 16px !important;
  box-shadow: none !important;
  margin-top: 16px !important;
  font-family: Poppins;
  @media (max-width: 768px) {
   
    padding: 12px;
    margin-top: 12px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
   
    padding: 8px;
    margin-top: 8px;
    border-radius: 8px;
  }
`;


const Home = () => {
  const isMobile = window.innerWidth <= 600; // You can adjust the breakpoint as needed
  const [performanceData, setPerformanceData] = useState(["null"]);
useEffect(() => {
      axios
    .get("http://localhost:3000/get-daily-avarage")
    .then((response) => {
      setPerformanceData(response.data.data);
      console.log("response")
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}, []);
console.log(performanceData);

  return (
    <div>
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
      />
      <ButtonAppBar />
      <Grid container spacing={2} alignItems="flex-start">
     
     
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Container
            style={{
              padding: "16px",
            }}
          >
            {" "}
            <Title>Daily Avarage Performance</Title>
            <Grid
              style={{
                marginBottom: "1rem",
              }}
              container
             
            >
           <Grid container spacing={2}>
            <Grid item xs={6}  sm={6} md={3} lg={3} >
                   <MetricsCard title="LCP" data={performanceData[0].avgLCP} fullData={performanceData} field={"avgLCP"} />
            </Grid>
            <Grid item xs={6}  sm={6} md={3} lg={3} >
                   <MetricsCard title="DNS Time" data={performanceData[0].avgDnsTime} fullData={performanceData} field={"avgDnsTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Connection Time" data={performanceData[0].avgConnectionTime} fullData={performanceData} field={"avgConnectionTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Response Time" data={performanceData[0].avgResponseTime} fullData={performanceData} field={"avgResponseTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Dom Content Loaded" data={performanceData[0].avgDomContentLoadedEventTime} fullData={performanceData} field={"avgDomContentLoadedEventTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="First Contentful Paint" data={performanceData[0].avgFCP} fullData={performanceData} field={"avgFCP"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="First Paint" data={performanceData[0].avgFirstPaint} fullData={performanceData} field={"avgFirstPaint"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Load Event Time" data={performanceData[0].avgLoadEventTime} fullData={performanceData} field={"avgLoadEventTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Navigation Type" data={performanceData[0].avgNavigationType} fullData={performanceData} field={"avgNavigationType"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Redirect Count" data={performanceData[0].avgRedirectCount} fullData={performanceData} field={"avgRedirectCount"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Navigation Start" data={performanceData[0].avgNavigationStartTime} fullData={performanceData} field={"avgNavigationStartTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Navigation End Time" data={performanceData[0].avgNavigationEndTime} fullData={performanceData} field={"avgNavigationEndTime"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="TTFB" data={performanceData[0].avgTTFB} fullData={performanceData} field={"avgTTFB"}/>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} >
                   <MetricsCard title="Code Execution Time" data={performanceData[0].avgCodeExecutionTime} fullData={performanceData} field={"avgCodeExecutionTime"}/>
            </Grid>
           </Grid>
           
         
              
            </Grid>
            <Grid style={{
              marginTop:'64px'
            }} conainer>
              <Title>Metric Values Change by Months</Title>
              <GraphCard>
                <StackedAreas fullData={performanceData} fieldLCP={"avgLCP"} />
              </GraphCard>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
