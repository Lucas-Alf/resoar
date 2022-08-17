import { Stack } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import { resetPassword } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from '@mui/styles';
import LoadingButton from "../../components/LoadingButton";

function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const initialValues = {
    password: '',
    confirmPassword: '',
  }

  const schema = Yup.object().shape({
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "As senhas não conferem.")
      .required()
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const onSubmit = (values) => {
    setLoading(true)

    const token = searchParams.get("token");
    resetPassword(values, token).then(res => {
      const { data } = res
      if (data.success) {
        enqueueSnackbar(`Senha redefinida com sucesso`, {
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
      enqueueSnackbar(`Ocorreu um erro ao redefinir a senha`, {
        variant: "error",
      });
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <span className={styles.loginText} >Redefinição de senha</span>
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
            <LoadingButton text="Confirmar" loading={loading} className={styles.loginButton} />
          </Stack>
        )}
      />
      <div className={styles.footerDiv}>
        <Link to={"/"} style={{ color: theme.palette.primary.main }} className={styles.backText}>Voltar</Link>
      </div>
    </>
  );
}

export default ResetPassword;