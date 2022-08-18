import React from "react";
import LoginLayout from "./components/Layout/LoginLayout"
import AppLayout from "./components/Layout/AppLayout"

const routes = [
  { path: "/*", element: <LoginLayout /> },
  { path: "/app", element: <AppLayout /> }
];

export default routes;
