import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from './styles.module.css'
import logo from '../../../assets/img/resoar/colorfull/fullname.png'

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
          <Grid item lg={4} md={false} xs={false}></Grid>
          <Grid item lg={8} xs={12}>
            <Grid
              container
              className={styles.root}
              alignItems="center"
              justify="center"
            >
              <div
                className={styles[transitionStage]}
                onAnimationEnd={() => {
                  if (transitionStage === "fadeOut") {
                    setTransitionStage("fadeIn");
                    setDisplayLocation(location);
                  }
                }}
              >
                <Card sx={{ width: 335 }}>
                  <CardContent>
                    <img src={logo} className={styles.logoImage} />
                    <Outlet />
                    <span className={styles.copyrightText} >Copyright © RESOAR {new Date().getFullYear()}</span>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LoginLayout;
