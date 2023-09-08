import { Button, Card, Grid, Modal, Paper } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
const StyledCard = styled(Card)`
  padding: 16px;
  border-radius: 16px !important;
  box-shadow: none !important;
  width: 100% !important;
`;
const DetailButton = styled(Button)`
  && {
    border-radius: 8px;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    text-transform: none;
    background-color: #b27de3;
    color: #ffffff;
    padding: 0px;
    width: 100%;
    font-family: Poppins;
    letter-spacing: -1px;
    &:hover {
      background-color: #0e0b9b;
    }
  }
`;
const MetricName = styled.p`
  color: #00000;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin: 0px;
  text-align: center;
  font-family: Poppins;
`;
const MetricValue = styled.p`
  color: #00000;
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
  font-family: Poppins;
`;
const ChartContainer = styled.div`
  width: 500px;
  height: 300px;
`;
const PopupCard = styled(Paper)`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: -1;
`;
const customTooltipStyles = {
  tooltip: {
    background: "pink",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color: "#333",
    padding: "8px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    zIndex: "10000 !important",
  },
};
const MetricsCard = ({ title, data, fullData, field }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const valueFormatter = (date) =>
    date.getHours() === 0
      ? date.toLocaleDateString("fr-FR", {
          month: "2-digit",
          day: "2-digit",
        })
      : date.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
        });

  return (
    <div>
      {" "}
      <StyledCard>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Grid item xs={12} >
            <MetricName>{title}:</MetricName>
          </Grid>
          <br/>
          <Grid item>
            {data ? (
              <MetricValue>{Math.floor(data)}  </MetricValue>
            ) : (
              <MetricValue>No Data</MetricValue>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <DetailButton onClick={handleDetailClick}>
            Detail{" "}
            <TrendingUpIcon
              style={{
                marginLeft: "8px",
              }}
            />{" "}
          </DetailButton>
        </Grid>
      </StyledCard>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        style={{
          zIndex: "0",
        }}
      >
       
          <PopupCard>
            {fullData.length > 0 ? (
              <div> <h3>{title}</h3>
              <LineChart
                xAxis={[
                  {
                    data: fullData.map(({ _id }) => (`${_id?.month}.${_id?.day}.${_id?.year}` )),
                    scaleType: "point",
                    
                  },
                ]}
                series={[
                  {
                    data: fullData.map((data) => (data?.[field])),
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
          </PopupCard>
       
      </Modal>
    </div>
  );
};

export default MetricsCard;
