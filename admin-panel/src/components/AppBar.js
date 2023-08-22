import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import zIndex from '@mui/material/styles/zIndex';


export default function ButtonAppBar() {
  return (
    <Box style={{ flexGrow: 1, backgroundColor:'#ffffff' }}>
      <AppBar style={{
        backgroundColor:'#ffffff',
        boxShadow:'none'
        
      }} position="relative">
        <Toolbar style={{
            padding:'0px'
        }} >
          <img src="logo.jpg" style={{
            height:'3rem'
          }} />
    
        </Toolbar>
      </AppBar>
    </Box>
  );
}
