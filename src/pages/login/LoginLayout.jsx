import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from './styles.module.css'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RecoverForm from "./RecoverForm";

function LoginLayout() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <>
      <div className={styles.imageContainer}>
        <Grid container>
          <Grid item md={4} xs={false}></Grid>
          <Grid item md={8} xs={12}>
            <div
              className={styles[transitionStage]}
              onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                  setTransitionStage("fadeIn");
                  setDisplayLocation(location);
                }
              }}
            >
              <Routes>
                <Route path="*" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/recover" element={<RecoverForm />} />
              </Routes>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LoginLayout;
