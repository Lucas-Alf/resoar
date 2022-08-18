import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from '../../AppBar'
import { isAuthenticated } from '../../../services/auth';

function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
