import { Button, Card, Grid,Modal, Paper  } from "@mui/material";
import React , { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const StyledCard = styled(Card)`
  padding: 16px;
  border-radius: 16px !important;
  box-shadow: none !important;

`;
const DetailButton = styled(Button)`
&&{
      
  border-radius: 8px;
  box-shadow: none;
  align-items:center;
  justify-content:center;
  text-transform: none;
  background-color: #b27de3;
  color: #ffffff;
  padding: 0px;
  width: 100%;
  font-family: Poppins;


 &:hover {
      background-color: #0E0B9B; 
      
    }
}


`;
const MetricName = styled.p`
  color: #0e0b9b;
  font-size: 24px;
  font-weight: bold;
  align-items:center;
  justify-content:center;
  margin: 0px;
  text-align: center;
  font-family: Poppins;
`;
const MetricValue = styled.p`
  color: #0e0b9b;
  font-size: 24px;
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
    background: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color: "#333",
    padding: "8px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    zIndex:"10000 !important"
  },
};
const MetricsCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div>
      <StyledCard>
        <Grid container spacing={2} alignItems={'center'} style={{
             alignItems:'center',
             justifyContent:'center',
             display:'flex',
             marginBottom:'16px'
        }} >
          <Grid item >
              <MetricName>FCP:</MetricName>
            </Grid>
            <Grid
              item
            >
              <MetricValue>110</MetricValue>
            </Grid>
          </Grid>
          <Grid container style={{
            justifyContent:'center', alignItems:'center', display:'flex'
          }} > <DetailButton onClick={handleDetailClick} >Detail <ArrowOutwardIcon style={{
            marginLeft:'8px'
          }} /> </DetailButton></Grid>
         
          {/* <Grid item xs={8}>
            <BasicPie />
          </Grid> */}
       
      </StyledCard>
      <Modal open={isModalOpen} onClose={handleCloseModal} onClick={handleCloseModal}>
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <PopupCard>
            <ChartContainer>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                    color:'#e68b89'

                  },
                ]}
                width={500}
                height={300}
                
                options={{
                  series: {
                    tooltip: customTooltipStyles.tooltip,
                    zIndex: 1500,
                  },
                }}
              />
            </ChartContainer>
          </PopupCard>
        </div>
      </Modal>
    </div>
  );
};

export default MetricsCard;
