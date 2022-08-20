import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from '../../AppBar'
import { isAuthenticated } from '../../../services/auth';
import { Box } from "@mui/material";
import MiniDrawer from "../../MiniDrawer"
import DrawerHeader from "../../DrawerHeader";

function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar toggleDrawer={toggleDrawer} />
        <MiniDrawer open={open} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AppLayout;
