import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import zIndex from "@mui/material/styles/zIndex";
import styled from "styled-components";
import { Grid } from "@mui/material";
import Dropdown from "./DropDown/Dropdown";

const URLMenuItemContainer = styled.div`
  

  border-radius: 8px;
 
  
`;
const MenuItemText = styled.p`
  font-weight: medium;
  text-align: center;
  font-size: 16px;
  color: #4e92da;
  margin-left: 8px;
  font-family: Poppins;
  font-weight: medium;
`;

export default function ButtonAppBar() {
  return (
    <Box style={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
      <AppBar
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          padding:"8px"
        }}
        position="relative"
      >
        <Toolbar
          style={{
            padding: "0px",
          }}
        >
          <Grid alignItems={'center'} container>
            <Grid item xs={10} >
              {" "}
              <img
                src="logo.jpg"
                style={{
                  height: "56px",
                  marginLeft: "8px"
                }}
              />
            </Grid>
            <Grid item>
              <Dropdown/>
              {/* <URLMenuItemContainer>
                <MenuItemText >
                  {" "}
                  localhost:3000
                </MenuItemText>
              </URLMenuItemContainer> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
