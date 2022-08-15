import { Button, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import { TextField, makeValidate, makeRequired } from "mui-rff";
import React, { useState } from "react";
import { Form } from "react-final-form";
import styles from './styles.module.css'
import Yup from '../../components/Validations'
import logo from '../../assets/img/resoar/colorfull/fullname.png'
import { resetPassword } from '../../services/auth'
import { useSnackbar } from "notistack";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from '@mui/styles';

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
    <Grid
      container
      className={styles.root}
      alignItems="center"
      justify="center"
    >
      <Card sx={{ minWidth: 330, maxWidth: 330 }}>
        <CardContent>
          <img src={logo} className={styles.logoImage} />
          <span className={styles.loginText} >Redefinição de senha</span>
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
                </Grid>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? (<CircularProgress size={25} className={styles.loadingButton} />) : 'Confirmar'}
                </Button>
              </form>
            )}
          />
          <div className={styles.footerDiv}>
            <Link to={"/"} style={{ color: theme.palette.primary.main }} className={styles.backText}>Voltar</Link>
          </div>
          <span className={styles.copyrightText} >Copyright © RESOAR {new Date().getFullYear()}</span>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ResetPassword;