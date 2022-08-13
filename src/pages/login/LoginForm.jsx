import { Button, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import logo from '../../assets/img/resoar/colorfull/fullname.png'
import { login } from '../../services/auth'
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";

function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const initialValues = {
    email: '',
    password: ''
  }

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  useEffect(() => {
    localStorage.clear()
  }, [])

  const onSubmit = (values) => {
    setLoading(true)
    login(values).then(res => {
      const { data } = res
      if (data.success) {
        localStorage.setItem('auth', JSON.stringify(get(data, 'data')))
        navigate("/home");
      } else {
        console.error(data.message)
        enqueueSnackbar(data.message, {
          variant: "error",
        });
      }
    }).catch(err => {
      console.error(err)
      enqueueSnackbar(`Ocorreu um erro ao realizar o login`, {
        variant: "error",
      });
    }).finally(() => {
      setLoading(false)
    })
  }

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
            loading={loading}
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
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? (<CircularProgress size={25} className={styles.loadingButton} />) : 'Entrar'}
                </Button>
              </form>
            )}
          />
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