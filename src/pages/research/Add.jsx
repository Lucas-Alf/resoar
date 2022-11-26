import { Container, Grid, Typography } from '@mui/material';
import { Autocomplete, makeRequired, makeValidate, TextField } from 'mui-rff';
import React, { useState } from 'react';
import Yup from '../../components/Validations';
import styles from './styles.module.css'
import { addResearch } from '../../services/research'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';
import LoadingButton from '../../components/LoadingButton';
import { researchLanguages, researchVisibility, researchType } from './utils'
import { getInstitution } from '../../services/institution'
import { getUser } from '../../services/user'
import { getKeyword, addKeyword } from '../../services/keyword'
import { getKnowledgeArea, addKnowledgeArea } from '../../services/knowledge-area'
import { get, isEmpty, keys, isArray, forEach, toNumber } from 'lodash';
import AutoCompleteServerSide from '../../components/AutocompleteServerSide';
import FileUpload from '../../components/FileUpload';
import { renderOptionUser, renderTagsUser } from '../user/utils'
import { renderOptionInstitution } from '../institution/utils'

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
    authorIds: undefined,
    keyWordIds: undefined,
    knowledgeAreaIds: undefined,
    advisorIds: undefined,
    file: undefined
  }

  const schema = Yup.object().shape({
    title: Yup.string().max(350).required(),
    abstract: Yup.string().max(5000),
    year: Yup.number().integer().min(1).max(9999).required(),
    type: Yup.number().required(),
    visibility: Yup.number().positive().integer().required(),
    language: Yup.number().positive().integer().required(),
    institutionId: Yup.number().positive().integer().required(),
    authorIds: Yup.array().min(1).required(),
    keyWordIds: Yup.array().min(1).required(),
    knowledgeAreaIds: Yup.array().min(1).required(),
    advisorIds: Yup.array().min(1).required(),
    file: Yup.mixed().required(),
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const generateFormData = (values) => {
    const gridForm = document.getElementById("research-form");
    const formData = new FormData(gridForm);

    forEach(keys(values), (key) => {
      if (key === "file")
        return

      const value = values[key]
      if (formData.has(key))
        formData.delete(key)

      if (key === "year") {
        formData.append(key, toNumber(value))
        return
      }

      if (isArray(value)) {
        forEach(value, (item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, value)
      }
    })

    return formData
  }

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const formData = generateFormData(values)
      const {
        data: {
          success,
          message
        }
      } = await addResearch(formData, { headers: { "Content-Type": "multipart/form-data" } })

      if (!success)
        throw new Error(message)

      enqueueSnackbar(message, { variant: "success" })
      navigate("/research")
    } catch (err) {
      console.error(err)
      const message = !isEmpty(get(err, 'message', ''))
        ? get(err, 'message')
        : `Ocorreu um erro ao salvar a publicação`

      enqueueSnackbar(message, { variant: "error" })
    } finally {
      setLoading(false)
    }
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
          subscription={{ submitting: true }}
          render={({ handleSubmit }) => (
            <Grid
              id="research-form"
              component="form"
              spacing={2}
              onSubmit={handleSubmit}
              noValidate
              container
            >
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
                  options={researchLanguages}
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
                  renderOption={renderOptionInstitution}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={2}>
                <Autocomplete
                  label="Visibilidade"
                  name="visibility"
                  size={"small"}
                  disableClearable
                  options={researchVisibility}
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
                <FileUpload
                  label="Arquivo"
                  name="file"
                  size="small"
                  accept="application/pdf"
                  required={required.file}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  text="Salvar"
                  loading={loading}
                  className={styles.submitButton}
                />
              </Grid>
            </Grid>
          )}
        />
      </div>
    </Container>
  );
}

export default Add;