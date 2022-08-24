import { Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { login } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { useTheme } from '@mui/styles';
import LoadingButton from '../../components/LoadingButton'
import HCaptcha from "@hcaptcha/react-hcaptcha";

function LoginForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const captchaRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null);

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
    if (isEmpty(token)) {
      enqueueSnackbar(`Desafio hCaptcha é obrigatário`, {
        variant: "error",
      });
    } else {
      setLoading(true)
      login({ ...values, token }).then(res => {
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
  }

  return (
    <>
      <span className={styles.loginText}>Entre com seu email e senha</span>
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
            <HCaptcha
              sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
              onVerify={setToken}
              ref={captchaRef}
            />
            <LoadingButton
              text="Entrar"
              loading={loading}
              className={styles.loginButton}
            />
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