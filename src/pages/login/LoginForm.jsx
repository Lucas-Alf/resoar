import { Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { login } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useTheme } from '@mui/styles';
import LoadingButton from '../../components/LoadingButton'

function LoginForm() {
  useEffect(() => {
    document.cookie = 'HSID=None; SameSite=None; Secure';
    document.cookie = 'SSID=None; SameSite=None; Secure';
    document.cookie = 'APISID=None; SameSite=None; Secure';
    document.cookie = 'SAPISID=None; SameSite=None; Secure';
    document.cookie = '__Secure-1PAPISID	=None; SameSite=None; Secure';
    document.cookie = 'OTZ=None; SameSite=None; Secure';
    document.cookie = '__Secure-1PSID=None; SameSite=None; Secure';
    document.cookie = 'UULE=None; SameSite=None; Secure';
    document.cookie = 'SIDCC=None; SameSite=None; Secure';
    document.cookie = '__Secure-1PSIDCC=None; SameSite=None; Secure';

    localStorage.clear()
  }, [])

  const theme = useTheme();
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

  const onSubmit = (values) => {
    setLoading(true)
    login(values).then(res => {
      const { data } = res
      if (data.success) {
        localStorage.setItem('authToken', JSON.stringify(get(data, 'data')))
        navigate("/app");
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
    <>
      <span className={styles.loginText} >Entre com seu email e senha</span>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        loading={loading}
        render={({ handleSubmit }) => (
          <Stack
            component="form"
            spacing={2}
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <TextField
              label="Email"
              name="email"
              size="small"
              required={required.email}
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              size="small"
              required={required.password}
            />
            <LoadingButton text="Entrar" loading={loading} className={styles.loginButton} />
          </Stack>
        )}
      />
      <div className={styles.footerDiv}>
        <Link to={"/recover"} style={{ color: theme.palette.primary.main }} className={styles.lostPasswordText}>Esqueci a senha</Link>
        <Link to={"/register"} style={{ color: theme.palette.primary.main }} className={styles.registerText}>Registrar-se</Link>
      </div>
    </>
  );
}

export default LoginForm;