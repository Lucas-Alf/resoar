import { Button, CircularProgress, Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useRef, useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { recover } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import { useTheme } from '@mui/styles';

function RegisterForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const captchaRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar();
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
    setLoading(true)
    const token = captchaRef.current.getValue();
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
      captchaRef.current.reset();
      setLoading(false)
    })
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
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
            />
            <Button
              variant="contained"
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? (<CircularProgress size={25} className={styles.loadingButton} />) : 'Enviar'}
            </Button>
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