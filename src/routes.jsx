import React from "react";
import LoginLayout from "./pages/login/LoginLayout"

const routes = [
  { path: "/*", element: <LoginLayout /> }
];

export default routes;
