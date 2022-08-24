import { Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { recover } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/styles';
import LoadingButton from "../../components/LoadingButton";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { isEmpty } from "lodash";

function RegisterForm() {
  const theme = useTheme();
  const captchaRef = useRef(null)
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: ''
  }

  const schema = Yup.object().shape({
    email: Yup.string().email().required()
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
      recover({ ...values, token }).then(res => {
        const { data } = res
        if (data.success) {
          enqueueSnackbar(`Email de recuperação enviado com sucesso`, {
            variant: "success",
          });
          navigate("/");
        } else {
          console.error(data.message)
          enqueueSnackbar(data.message, {
            variant: "error",
          });
        }
      }).catch(res => {
        console.error(res)
        enqueueSnackbar(`Ocorreu um erro ao enviar o email de recuperação`, {
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
      <span className={styles.loginText} >Recuperar senha</span>
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
            <HCaptcha
              sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
              onVerify={setToken}
              ref={captchaRef}
            />
            <LoadingButton text="Enviar" loading={loading} className={styles.loginButton} />
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