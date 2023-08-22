import { Card, Container, Grid } from "@mui/material";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import ButtonAppBar from "../components/AppBar";
import DoughnutChart from "../components/DoughnutChart";
import BasicPie from "../components/DoughnutChart";
import { JsonFunction } from "react-router-dom";
import BarsDataset from "../components/BarChart";
import StackedAreas from "../components/LineChart";

const Title = styled.p`
  color: #0e0b9b;
  font-size: 1.333rem;
  font-weight: bold;
`;
const MetricName = styled.p`
  color: #0e0b9b;
  font-size: 18px;
  font-weight: bold;
  alignItems:'center',
  justifyContent:'center'
  margin: 0px;
  text-align: center;
`;
const MetricValue = styled.p`
  color: #0e0b9b;
  font-size: 18px;
  font-weight: bold;
  margin: 0px;
`;
const MetricsCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 15px !important;
  box-shadow: none !important;
`;
const GraphCard = styled(Card)`
  padding: 1rem;
  border-radius: 15px !important;
  box-shadow: none !important;
  margin-top: 1rem !important;
`;

const Home = () => {
  return (
    <div>
      <ButtonAppBar />
      <Grid container spacing={2} alignItems="flex-start">
        <Grid  item xs={2}>
          <Dashboard />
        </Grid>
        <Grid item xs={10}>
          <Container>
            {" "}
            <Title>Current Performance</Title>
            <Grid style={{
              marginBottom: '1rem'
            }} container spacing={2}>
              <Grid item xs={3}>
                <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Response Time
</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>FCP</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Connection Time</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Response Time</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Navigation Type</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Navigation End Time</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>LCP</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
              <Grid item xs={3}>
              <MetricsCard>
                  <Grid container>
                    <Grid item xs={4}>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricName>Load Event Time</MetricName>
                      </Grid>
                      <Grid
                        style={{
                          margin: "0px",
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        container
                      >
                        <MetricValue>110</MetricValue>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <BasicPie />
                    </Grid>
                  </Grid>
                </MetricsCard>
              </Grid>
            </Grid>

<Grid conainer>
  <GraphCard>
    <Title>
    Metric Values Change
    </Title>
    <BarsDataset/>
  </GraphCard>
</Grid>
<Grid conainer>
  <GraphCard>
    <Title>
    Metric Values Change
    </Title>
    <StackedAreas/>
  </GraphCard>
</Grid>

          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
