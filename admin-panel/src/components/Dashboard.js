import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardContainer = styled.div`
  height: 100vh;
  padding: 2rem;
  background-color: #FFFFFF;
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  height: 8vh;
`;

const FirstMenuItemContainer = styled(MenuItemContainer)`
  background-color: #0E0B9B;
  height: 4vh;
`;

const MenuItemText = styled.p`
  font-weight: medium;
  text-align: center;
  font-size: 16px;
  color: #808191;
  margin-left: 8px;
  font-family: Poppins;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  color: #808191; 
`;

const ResponsiveDashboardContainer = styled(DashboardContainer)`
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ResponsiveMenuItemContainer = styled(MenuItemContainer)`
  height: 6vh;

  @media (max-width: 768px) {
    height: 4vh;
  }
`;

const Dashboard = () => {
  return (
    <ResponsiveDashboardContainer>
      <FirstMenuItemContainer>
        <MenuItemText style={{ color: '#ffffff' }}>All Page Average</MenuItemText>
      </FirstMenuItemContainer>

      <ResponsiveMenuItemContainer>
        <IconContainer>
          <HomeIcon />
        </IconContainer>
        <MenuItemText>Home Page</MenuItemText>
      </ResponsiveMenuItemContainer>

      <ResponsiveMenuItemContainer>
        <IconContainer>
          <InfoIcon />
        </IconContainer>
        <MenuItemText>About</MenuItemText>
      </ResponsiveMenuItemContainer>

      <ResponsiveMenuItemContainer>
        <IconContainer>
          <CategoryIcon />
        </IconContainer>
        <MenuItemText>Products</MenuItemText>
      </ResponsiveMenuItemContainer>

      <ResponsiveMenuItemContainer>
        <IconContainer>
          <AccountCircleIcon />
        </IconContainer>
        <MenuItemText>Account</MenuItemText>
      </ResponsiveMenuItemContainer>
    </ResponsiveDashboardContainer>
  );
};

export default Dashboard;
