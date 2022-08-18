import { Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { register } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import { useTheme } from '@mui/styles';
import LoadingButton from "../../components/LoadingButton";

function RegisterForm() {
  const navigate = useNavigate();
  const theme = useTheme();
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
    <>
      <span className={styles.loginText} >Nova conta</span>
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
              label="Nome"
              name="name"
              size="small"
              required={required.name}
            />
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
            <TextField
              label="Repita a senha"
              name="confirmPassword"
              type="password"
              size="small"
              required={required.confirmPassword}
            />
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
            />
            <LoadingButton text="Cadastrar-se" loading={loading} className={styles.loginButton} />
          </Stack>
        )}
      />
      <div className={styles.footerDiv}>
        <Link to={"/"} style={{ color: theme.palette.primary.main }} className={styles.backText}>Voltar</Link>
      </div>
    </>
  );
}

export default RegisterForm;