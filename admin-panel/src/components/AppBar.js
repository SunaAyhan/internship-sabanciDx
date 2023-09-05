import React, { useState } from 'react';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import zIndex from "@mui/material/styles/zIndex";
import styled from "styled-components";
import { Grid,Modal, Paper, Typography } from "@mui/material";
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
function generateRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 8; // Kod uzunluğunu istediğiniz gibi ayarlayabilirsiniz
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export default function ButtonAppBar() {
  const [uniqueCode, setUniqueCode] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleGenerateCode = () => {
    const randomCode = generateRandomCode();
    setUniqueCode(randomCode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(uniqueCode)
      .then(() => {
        alert('Kod kopyalandı: ' + uniqueCode);
      })
      .catch((error) => {
        console.error('Kopyalama başarısız oldu:', error);
        alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın: ' + uniqueCode);
      });
  };
  return (
    <div>
    <Box style={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
      <AppBar
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          padding: "8px",
        }}
        position="relative"
      >
        <Toolbar
          style={{
            padding: "0px",
          }}
        >
          <Grid alignItems={"center"} container>
            <Grid item xs={9}>
              {" "}
              <img
                src="logo.jpg"
                style={{
                  height: "56px",
                  marginLeft: "8px",
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Dropdown />
              {/* <URLMenuItemContainer>
                <MenuItemText >
                  {" "}
                  localhost:3000
                </MenuItemText>
              </URLMenuItemContainer> */}
            </Grid>
            <Grid item xs={1}>
              <Button onClick={handleGenerateCode}>Mülk Ekle</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '16px',
          }}
        >
          <Typography variant="h6">Eşsiz Kod</Typography>
          <Typography variant="body1">{uniqueCode}</Typography>
          <Button onClick={handleCopyCode}>Kopyala</Button>
        </Paper>
      </Modal>
    </div>
  );
}
