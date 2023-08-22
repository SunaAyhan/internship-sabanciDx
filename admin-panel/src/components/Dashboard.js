import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardContainer = styled.div`
 
 height: 200vh;
  padding: 2rem;
  background-color: #FFFFFF;
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  border-radius: 12px;
  height: 5vh;
 
`;const URLMenuItemContainer = styled.div`
  background-color: #44D2F1;
  margin-bottom: 1rem;

  border-radius: 5px;
`;

const FirstMenuItemContainer = styled(MenuItemContainer)`
  background-color: #0E0B9B;
  

`;



const MenuItemText = styled.p`
  font-weight: medium;
  text-align: center;
  font-size: 16px;
  color: #808191;
  margin-left: 8px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  color: #808191; 
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <URLMenuItemContainer>
        <MenuItemText style={{ color: '#ffffff' }}> localhost:3000</MenuItemText>
      </URLMenuItemContainer>
      <FirstMenuItemContainer>
        <MenuItemText style={{ color: '#ffffff' }}>All Page Avarage</MenuItemText>
      </FirstMenuItemContainer>
      
      <MenuItemContainer>
        <IconContainer>
          <HomeIcon />
        </IconContainer>
        <MenuItemText>Home Page</MenuItemText>
      </MenuItemContainer>
      
      <MenuItemContainer>
        <IconContainer>
          <InfoIcon />
        </IconContainer>
        <MenuItemText>About</MenuItemText>
      </MenuItemContainer>
      
      <MenuItemContainer>
        <IconContainer>
          <CategoryIcon />
        </IconContainer>
        <MenuItemText>Products</MenuItemText>
      </MenuItemContainer>
      
      <MenuItemContainer>
        <IconContainer>
          <AccountCircleIcon />
        </IconContainer>
        <MenuItemText>Account</MenuItemText>
      </MenuItemContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
