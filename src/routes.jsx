import React from "react";
import LoginLayout from "./components/Layout/LoginLayout"
import AppLayout from "./components/Layout/AppLayout"
import Overview from "./pages/overview/Overview"
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import ResetPassword from "./pages/login/ResetPasswordForm";
import RecoverForm from "./pages/login/RecoverForm";

const routes = [
  {
    element: <LoginLayout />, children: [
      { path: "/", element: <LoginForm /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/recover", element: <RecoverForm /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ]
  },
  {
    element: <AppLayout />, children: [
      { path: "/app", element: <Overview /> },
    ]
  }
];

export default routes;
