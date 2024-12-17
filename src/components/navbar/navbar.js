import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Popover,
  Button,
  Box,
  TextField,
  Container,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppContext } from '../../context/context';
import { apiList } from '../../utils/apiList/api';
import Action from '../../context/action';

const Navbar = () => {
  const {apiGetCall, state : {userProfile}} = useContext(AppContext)
  const userProfileStatus = userProfile?.code && userProfile?.code === 200
  const [profileLoading, setProfileLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleProfileClick = (event) => {
    setProfileLoading(true)
    apiGetCall(apiList.userProfile, Action.userProfile).then(res => {
      console.log(res)
      setProfileLoading(false)
    })
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    console.log('Logged out');
    handleClose();
  };

  const handleEdit = () => {
    console.log('Edit user details');
  };

 

  return (
    <Container position="static">
         <AppBar  sx={{ backgroundColor: '#4a90e2' }}> {/* Mild blue color */}
      <Toolbar sx={{ minHeight: 56 }}> {/* Set a specific height if necessary */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Medical Website
        </Typography>
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircle />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 250, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3 }}>

          { !profileLoading && <Container>
            <Typography variant="h6" sx={{ flexGrow: 1,marginBottom:"1vw" }}>
         Profile
        </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={userProfile?.data?.name}
              sx={{ marginBottom: "1vw" }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={userProfile?.data?.email}
              sx={{ marginBottom: "1vw" }}
            />
           
            <Button onClick={handleLogout} color="secondary" fullWidth variant="outlined" sx={{ marginTop: 1 }}>
              Logout
            </Button>
            </Container>}
            
          </Box>
        </Popover>
      </Toolbar>
    
    </AppBar>
          <Outlet />
    </Container>
   
  );
};

export default Navbar;
