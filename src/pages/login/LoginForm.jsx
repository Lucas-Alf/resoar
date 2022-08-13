import { Button, Card, CardContent, Grid } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import logo from '../../assets/img/resoar/colorfull/fullname.png'

function LoginForm() {

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = () => { }

  return (
    <Grid
      container
      className={styles.root}
      alignItems="center"
      justify="center"
    >
      <Card sx={{ minWidth: 350 }}>
        <CardContent>
          <img src={logo} className={styles.logoImage} />
          <span className={styles.loginText} >Entre com seu email e senha</span>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      name="email"
                      size="small"
                      required={required.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Senha"
                      name="password"
                      type="password"
                      size="small"
                      required={required.password}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          />
          <Button variant="contained" className={styles.loginButton} >Entrar</Button>
          <div className={styles.footerDiv}>
            <span className={styles.lostPasswordText}>Esqueci a senha</span>
            <span className={styles.registerText}>Registrar-se</span>
          </div>
          <span className={styles.copyrightText} >Copyright © RESOAR {new Date().getFullYear()}</span>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default LoginForm;