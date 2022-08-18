import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from '../../AppBar'

function AppLayout() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
