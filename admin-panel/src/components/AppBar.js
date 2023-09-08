import React, { useState } from 'react';
import styled from "styled-components";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import zIndex from "@mui/material/styles/zIndex";
import { Grid,Modal, Paper, Typography, Button } from "@mui/material";
import Dropdown from "./DropDown/Dropdown";
import { Link } from 'react-router-dom';

const ButtonAdd = styled(Button)`
&&&{
  font-family: Poppins;

  padding: 16px;
  color: #ffff;
  background-color: #b27de3;
  text-transform: none;

  &:hover {
    background-color: #0E0B9B; 
    cursor: pointer;
  }

}
 
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
  const redirectToPropertiesPage = () => {

    window.location.href = '/properties'; // Sayfayı yönlendir
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
            <Grid item xs={10}>
             <a href='/home' ><img
                src="logo.jpg"
                style={{
                  height: "56px",
                  marginLeft: "8px",
                }}
              /></a>
              
            </Grid>
            
            <Grid item xs={2}>
          
        <ButtonAdd onClick={redirectToPropertiesPage} >Add Property</ButtonAdd>
                {/* <Dropdown /> */}
            
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
