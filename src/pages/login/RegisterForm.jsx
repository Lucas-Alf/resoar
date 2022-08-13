import { Button, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import logo from '../../assets/img/resoar/colorfull/fullname.png'
import { register } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"

function RegisterForm() {
  const navigate = useNavigate();
  const captchaRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "As senhas não conferem.")
      .required()
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const onSubmit = (values) => {
    setLoading(true)
    const token = captchaRef.current.getValue();
    register({ ...values, token }).then(res => {
      const { data } = res
      if (data.success) {
        enqueueSnackbar(`Usuário cadastrado com sucesso`, {
          variant: "success",
        });
        navigate("/");
      } else {
        console.error(data.message)
        enqueueSnackbar(data.message, {
          variant: "error",
        });
      }
    }).catch(err => {
      console.error(err)
      enqueueSnackbar(`Ocorreu um erro ao realizar o cadastro`, {
        variant: "error",
      });
    }).finally(() => {
      captchaRef.current.reset();
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
      <Card sx={{ minWidth: 330, maxWidth: 330 }}>
        <CardContent>
          <img src={logo} className={styles.logoImage} />
          <span className={styles.loginText} >Nova conta</span>
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
                      label="Nome"
                      name="name"
                      size="small"
                      required={required.name}
                    />
                  </Grid>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Repita a senha"
                      name="confirmPassword"
                      type="password"
                      size="small"
                      required={required.confirmPassword}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      ref={captchaRef}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? (<CircularProgress size={25} className={styles.loadingButton} />) : 'Cadastrar-se'}
                </Button>
              </form>
            )}
          />
          <div className={styles.footerDiv}>
            <Link to={"/"} className={styles.backText}>Voltar</Link>
          </div>
          <span className={styles.copyrightText} >Copyright © RESOAR {new Date().getFullYear()}</span>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RegisterForm;