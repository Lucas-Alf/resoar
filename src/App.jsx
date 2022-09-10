import React, { useState, createRef, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import routes from "./routes";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { Close as CloseIcon } from "@mui/icons-material";
import { ptBR } from '@mui/x-data-grid';
import { ptBR as pickersPtBR } from '@mui/x-date-pickers';
import { ptBR as corePtBR } from '@mui/material/locale';


export default function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const theme = createTheme(
    mode === 'light'
      ? lightTheme
      : darkTheme,
    ptBR,
    pickersPtBR,
    corePtBR
  )

  const snackbarRef = createRef();
  const onClickDismiss = (key) => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  useEffect(() => {
    window.theme = mode;
    window.toggleTheme = () => {
      const newMode = mode === 'light' ? 'dark' : 'light'
      setMode(newMode);
      localStorage.setItem('theme', newMode)
      window.theme = newMode;
    };

    window.setTheme = (theme) => {
      setMode(theme);
      localStorage.setItem('theme', theme)
      window.theme = theme;
    };
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        ref={snackbarRef}
        TransitionComponent={Slide}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <CloseIcon htmlColor="white" />
          </IconButton>
        )}
      >
        <CssBaseline />
        {useRoutes(routes)}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
