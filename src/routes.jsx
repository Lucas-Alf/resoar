import React from "react";
import LoginLayout from "./components/Layout/LoginLayout"
import AppLayout from "./components/Layout/AppLayout"
import Overview from "./pages/overview/"
import Research from "./pages/research/"
import AddResearch from "./pages/research/Add"
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import ResetPassword from "./pages/login/ResetPasswordForm";
import RecoverForm from "./pages/login/RecoverForm";
import NotFound from "./pages/not-found";

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
      { path: "*", element: <NotFound /> },
      { path: "/app", element: <Overview /> },
      { path: "/app/research", element: <Research /> },
      { path: "/app/research/add", element: <AddResearch /> },
    ]
  }
];

export default routes;
