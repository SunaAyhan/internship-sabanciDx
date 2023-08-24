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

const Title = styled.p`
  color: #0e0b9b;
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
     
        {/* <Grid item xs={2} sm={2} md={2} lg={2}   >
          <Dashboard  />
        </Grid>
          */}
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
              spacing={2}
            >
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <MetricsCard />
              </Grid>
            </Grid>
            <Grid style={{
              marginTop:'48px'
            }} conainer>
              <Title>Metric Values Change</Title>
              <GraphCard>
                <StackedAreas />
              </GraphCard>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
