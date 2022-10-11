/* eslint-disable no-unused-vars */
import { Avatar, Box, Chip, Container, Typography } from '@mui/material';
import { Autocomplete, makeRequired, makeValidate, TextField } from 'mui-rff';
import React, { useEffect, useState } from 'react';
import Yup from '../../components/Validations';
import styles from './styles.module.css'
import { addResearch } from '../../services/research'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import { Stack } from '@mui/system';
import LoadingButton from '../../components/LoadingButton';
import { languages, visibility, researchType } from './utils'
import { getInstitution } from '../../services/institution'
import { getUser } from '../../services/user'
import { get } from 'lodash';
import AutoCompleteServerSide from '../../components/AutocompleteServerSide';

function Add() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const initialValues = {
    title: '',
    abstract: '',
    year: undefined,
    type: undefined,
    visibility: undefined,
    language: undefined,
    institutionId: undefined,
    authorIds: [],
    advisorIds: []
  }

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    year: Yup.number().integer().min(1).max(9999).required(),
    type: Yup.number().required(),
    visibility: Yup.number().positive().integer().required(),
    language: Yup.number().positive().integer().required(),
    institutionId: Yup.number().positive().integer().required(),
    authorIds: Yup.array().min(1).required(),
    advisorIds: Yup.array()
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const onSubmit = (values) => {
    setLoading(true)
    addResearch({ ...values }).then(res => {
      const { data } = res
      if (data.success) {
        navigate("/app/research");
      } else {
        console.error(data.message)
        enqueueSnackbar(data.message, {
          variant: "error",
        });
      }
    }).catch(err => {
      console.error(err)
      enqueueSnackbar(`Ocorreu um erro ao salvar a publicação`, {
        variant: "error",
      });
    }).finally(() => {
      setLoading(false)
    })
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
              <Autocomplete
                label="Tipo de publicação"
                name="type"
                size={"small"}
                disableClearable
                options={researchType}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                required={required.type}
              />
              <Autocomplete
                label="Visibilidade"
                name="visibility"
                size={"small"}
                disableClearable
                options={visibility}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                required={required.visibility}
              />
              <Autocomplete
                label="Idioma"
                name="language"
                size={"small"}
                disableClearable
                options={languages}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                required={required.language}
              />
              <AutoCompleteServerSide
                label="Instituição"
                name="institutionId"
                size={"small"}
                searchField={"name"}
                fetchFunction={getInstitution}
                getOptionValue={option => get(option, 'id')}
                getOptionLabel={option => get(option, 'name')}
                required={required.institutionId}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
                    {option.name}
                  </Box>
                )}
              />
              <AutoCompleteServerSide
                multiple
                label="Autores"
                name="authorIds"
                size={"small"}
                helperText='Pesquise pelo nome do autor...'
                fetchFunction={getUser}
                searchField={"name"}
                getOptionValue={option => get(option, 'id')}
                getOptionLabel={option => get(option, 'name')}
                required={required.authorIds}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
                    {option.name}
                  </Box>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      key={option.id}
                      label={option.name}
                      avatar={<Avatar alt={option.name} src={option.imagePath} />}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
              <AutoCompleteServerSide
                multiple
                label="Orientadores"
                name="advisorIds"
                size={"small"}
                helperText='Pesquise pelo nome do orientador...'
                fetchFunction={getUser}
                searchField={"name"}
                getOptionValue={option => get(option, 'id')}
                getOptionLabel={option => get(option, 'name')}
                required={required.advisorIds}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
                    {option.name}
                  </Box>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      key={option.id}
                      label={option.name}
                      avatar={<Avatar alt={option.name} src={option.imagePath} />}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
              <TextField
                label="Arquivo"
                name="file"
                size="small"
              // required={required.file}
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