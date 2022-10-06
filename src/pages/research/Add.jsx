/* eslint-disable no-unused-vars */
import { Container, Typography } from '@mui/material';
import { makeRequired, makeValidate, TextField } from 'mui-rff';
import React, { useState } from 'react';
import Yup from '../../components/Validations';
import styles from './styles.module.css'
import { addResearch } from '../../services/research'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import { Stack } from '@mui/system';
import LoadingButton from '../../components/LoadingButton';

function Add() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const initialValues = {
    title: '',
    abstract: '',
    year: '',
    type: '',
    visibility: '',
    language: '',
    institutionId: '',
    authorIds: [],
    advisorIds: [],
    file: null,
  }

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    year: Yup.number().max(9999).min(1).required(),
    type: Yup.number().required(),
    visibility: Yup.number().required(),
    language: Yup.number().required(),
    institutionId: Yup.number().required(),
    authorIds: Yup.array().min(1).required(),
    advisorIds: Yup.array().required(),
    file: Yup.mixed()
      .test("fileSize", "O arquivo pode ter no máximo 20Mb", (value) => {
        return value[0].size <= 20971520
      })
      .required(),
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const onSubmit = (values) => {
    console.log(values)

    // setLoading(true)
    // addResearch({ ...values }).then(res => {
    //   const { data } = res
    //   if (data.success) {
    //     navigate("/app/research");
    //   } else {
    //     console.error(data.message)
    //     enqueueSnackbar(data.message, {
    //       variant: "error",
    //     });
    //   }
    // }).catch(err => {
    //   console.error(err)
    //   enqueueSnackbar(`Ocorreu um erro ao salvar a publicação`, {
    //     variant: "error",
    //   });
    // }).finally(() => {
    //   setLoading(false)
    // })
  }

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Nova Publicação</Typography>
      <div className={styles.container}>
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
                label="Titulo"
                name="title"
                size="small"
                required={required.title}
              />
              <TextField
                label="Abstract"
                name="abstract"
                size="small"
                required={required.abstract}
              />
              <TextField
                label="Ano"
                name="year"
                size="small"
                type="number"
                required={required.year}
              />
              <TextField
                label="Tipo"
                name="type"
                size="small"
                type="number"
                required={required.type}
              />
              <TextField
                label="Visibilidade"
                name="visibility"
                size="small"
                type="number"
                required={required.visibility}
              />
              <TextField
                label="Idioma"
                name="language"
                size="small"
                type="number"
                required={required.language}
              />
              <TextField
                label="Instituição"
                name="institutionId"
                size="small"
                type="number"
                required={required.institutionId}
              />
              <TextField
                label="Autores"
                name="authorIds"
                size="small"
                required={required.authorIds}
              />
              <TextField
                label="Orientadores"
                name="advisorIds"
                size="small"
                required={required.advisorIds}
              />
              <TextField
                label="Arquivo"
                name="file"
                size="small"
                required={required.file}
              />
              <LoadingButton
                text="Salvar"
                loading={loading}
                className={styles.loginButton}
              />
            </Stack>
          )}
        />
      </div>
    </Container>
  );
}

export default Add;