import { Grid } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
import styles from './styles.module.css'

function Login() {
  return (
    <>
      <div className={styles.imageContainer}>
        <Grid container>
          <Grid item md={4} xs={false}></Grid>
          <Grid item md={8} xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Login;
