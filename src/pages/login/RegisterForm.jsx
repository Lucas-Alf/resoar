import { IconButton, InputAdornment, Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { register } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/styles';
import LoadingButton from "../../components/LoadingButton";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { isEmpty } from "lodash";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function RegisterForm() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  const captchaRef = useRef(null)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
    if (isEmpty(token)) {
      enqueueSnackbar(`Desafio hCaptcha é obrigatário`, {
        variant: "error",
      });
    } else {
      setLoading(true)
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
        setLoading(false)
        setToken("");
        captchaRef.current.resetCaptcha();
      })
    }
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
              type={showPassword ? "text" : "password"}
              size="small"
              required={required.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Repita a senha"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              size="small"
              required={required.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <HCaptcha
              sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
              onVerify={setToken}
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