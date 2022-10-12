import { Avatar, Box, Chip, Container, Grid, Typography } from '@mui/material';
import { Autocomplete, makeRequired, makeValidate, TextField } from 'mui-rff';
import React, { useState } from 'react';
import Yup from '../../components/Validations';
import styles from './styles.module.css'
import { addResearch } from '../../services/research'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import LoadingButton from '../../components/LoadingButton';
import { languages, visibility, researchType } from './utils'
import { getInstitution } from '../../services/institution'
import { getUser } from '../../services/user'
import { getKeyword, addKeyword } from '../../services/keyword'
import { getKnowledgeArea, addKnowledgeArea } from '../../services/knowledge-area'
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
    title: Yup.string().max(350).required(),
    abstract: Yup.string().max(2500),
    year: Yup.number().integer().min(1).max(9999).required(),
    type: Yup.number().required(),
    visibility: Yup.number().positive().integer().required(),
    language: Yup.number().positive().integer().required(),
    institutionId: Yup.number().positive().integer().required(),
    authorIds: Yup.array().min(1).required(),
    keyWordIds: Yup.array().min(1).required(),
    knowledgeAreaIds: Yup.array().min(1).required(),
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

  const renderOptionUser = (props, option) => (
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
      {option.name}
    </Box>
  )

  const renderTagsUser = (tagValue, getTagProps) =>
    tagValue.map((option, index) => (
      <Chip
        key={option.id}
        label={option.name}
        avatar={<Avatar alt={option.name} src={option.imagePath} />}
        {...getTagProps({ index })}
      />
    ))

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
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={9} lg={10}>
                  <TextField
                    label="Titulo"
                    name="title"
                    size="small"
                    required={required.title}
                  />
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                  <TextField
                    label="Ano"
                    name="year"
                    size="small"
                    type="number"
                    required={required.year}
                  />
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
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
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
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
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                  <AutoCompleteServerSide
                    label="Instituição"
                    name="institutionId"
                    size={"small"}
                    helperText='Pesquise pelo nome do instituição'
                    fetchFunction={getInstitution}
                    searchField={"name"}
                    getOptionValue={option => get(option, 'id')}
                    getOptionLabel={option => get(option, 'name')}
                    disableClearable
                    required={required.institutionId}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <Avatar sx={{ height: 25, width: 25, marginRight: 1 }} alt={option.name} src={option.imagePath} />
                        {option.name}
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
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
                </Grid>
                <Grid item xs={12}>
                  <AutoCompleteServerSide
                    multiple
                    label="Autores"
                    name="authorIds"
                    size={"small"}
                    helperText='Pesquise pelo nome do autor'
                    fetchFunction={getUser}
                    searchField={"name"}
                    getOptionValue={option => get(option, 'id')}
                    getOptionLabel={option => get(option, 'name')}
                    required={required.authorIds}
                    renderOption={renderOptionUser}
                    renderTags={renderTagsUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutoCompleteServerSide
                    multiple
                    label="Orientadores"
                    name="advisorIds"
                    size={"small"}
                    helperText='Pesquise pelo nome do orientador'
                    fetchFunction={getUser}
                    searchField={"name"}
                    getOptionValue={option => get(option, 'id')}
                    getOptionLabel={option => get(option, 'name')}
                    required={required.advisorIds}
                    renderOption={renderOptionUser}
                    renderTags={renderTagsUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutoCompleteServerSide
                    multiple
                    creatable
                    label="Palavras chave"
                    name="keyWordIds"
                    size={"small"}
                    helperText='Pesquise pela palavra chave'
                    fetchFunction={getKeyword}
                    createFunction={addKeyword}
                    searchField={"description"}
                    getOptionValue={option => get(option, 'id')}
                    getOptionLabel={option => get(option, 'description')}
                    required={required.keyWordIds}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={option.description}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutoCompleteServerSide
                    multiple
                    creatable
                    label="Áreas do conhecimento"
                    name="knowledgeAreaIds"
                    size={"small"}
                    helperText='Pesquise pela área do conhecimento'
                    fetchFunction={getKnowledgeArea}
                    createFunction={addKnowledgeArea}
                    searchField={"description"}
                    getOptionValue={option => get(option, 'id')}
                    getOptionLabel={option => get(option, 'description')}
                    required={required.knowledgeAreaIds}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={option.description}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Resumo"
                    name="abstract"
                    size="small"
                    multiline
                    rows={5}
                    required={required.abstract}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    text="Salvar"
                    loading={loading}
                    className={styles.loginButton}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </Container>
  );
}

export default Add;