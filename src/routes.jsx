import React from "react";
import LoginLayout from "./components/Layout/LoginLayout"
import AppLayout from "./components/Layout/AppLayout"
import Overview from "./pages/overview/"
import Research from "./pages/research/"
import ResearchAdd from "./pages/research/Add"
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import ResetPassword from "./pages/login/ResetPasswordForm";
import RecoverForm from "./pages/login/RecoverForm";
import NotFound from "./pages/not-found";
import Search from "./pages/search";
import Bookmarks from "./pages/bookmarks";
import ResearchDetails from "./pages/research/Details";
import ResearchViewer from "./pages/research/Viewer";

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
      { path: "/overview", element: <Overview /> },
      { path: "/research", element: <Research /> },
      { path: "/research/add", element: <ResearchAdd /> },
      { path: "/research/viewer/*", element: <ResearchViewer /> },
      { path: "/research/*", element: <ResearchDetails /> },
      { path: "/search", element: <Search /> },
      { path: "/bookmarks", element: <Bookmarks /> },
    ]
  }
];

export default routes;
