import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { get, isNumber } from 'lodash';
import { getInstitution } from '../../services/institution';
import { getUser } from '../../services/user';
import { getKeyword } from '../../services/keyword';
import { getKnowledgeArea } from '../../services/knowledge-area';
import { getResearchAdvanced } from '../../services/research';
import { Autocomplete, makeRequired, makeValidate, TextField } from 'mui-rff';
import { renderOptionInstitution } from '../institution/utils';
import { renderOptionUser, renderTagsUser } from '../user/utils';
import { useNavigate, useSearchParams } from "react-router-dom";
import AutoCompleteServerSide from '../../components/AutocompleteServerSide';
import PaginatedList from '../../components/PagedList';
import ResearchListItem from '../../components/ResearchListItem';
import SearchField from '../../components/SearchField';
import styles from './styles.module.css';
import Yup from '../../components/Validations';
import { researchType, languages } from '../research/utils';
import LoadingButton from '../../components/LoadingButton';

function Search() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("query"))
  const [titleBuffer, setTitleBuffer] = useState("")
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    const timeOutId = setTimeout(() => setTitleBuffer(title), 500);
    return () => clearTimeout(timeOutId);
  }, [title]);

  useEffect(() => {
    setQueryParams(prevParams => { return { ...prevParams, query: titleBuffer } })
  }, [titleBuffer])

  const initialValues = {
    initialYear: undefined,
    finalYear: undefined,
    type: undefined,
    language: undefined,
    institutionId: undefined,
    authorIds: undefined,
    keyWordIds: undefined,
    knowledgeAreaIds: undefined,
    advisorIds: undefined
  }

  const schema = Yup.object().shape({
    initialYear: Yup
      .number()
      .integer()
      .min(1)
      .max(9999),
    finalYear: Yup
      .number()
      .integer()
      .max(9999)
      .when(['initialYear'], {
        is: (initialYear) => isNumber(initialYear),
        then: Yup.number().min(Yup.ref("initialYear"))
      }),
    type: Yup.array(),
    language: Yup.array(),
    institutionId: Yup.array(),
    authorIds: Yup.array(),
    keyWordIds: Yup.array(),
    knowledgeAreaIds: Yup.array(),
    advisorIds: Yup.array()
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Pesquisar Publicações</Typography>
      <div className={styles.container}>
        <SearchField
          name="search-field"
          value={title}
          onChange={setTitle}
        />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <Typography variant='h6' style={{ marginBottom: 5 }}>Busca Avançada</Typography>
                <Form
                  onSubmit={() => { }}
                  initialValues={initialValues}
                  validate={validate}
                  loading={false}
                  subscription={{ submitting: true }}
                  render={({ handleSubmit }) => (
                    <Stack
                      id="research-form"
                      component="form"
                      spacing={2}
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <TextField
                            label="Ano inicial"
                            name="initialYear"
                            size="small"
                            type="number"
                            required={required.initialYear}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Ano final"
                            name="finalYear"
                            size="small"
                            type="number"
                            required={required.finalYear}
                          />
                        </Grid>
                      </Grid>
                      <Autocomplete
                        multiple
                        label="Tipo de publicação"
                        name="type"
                        size={"small"}
                        options={researchType}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        required={required.type}
                      />
                      <Autocomplete
                        multiple
                        label="Idioma"
                        name="language"
                        size={"small"}
                        options={languages}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        required={required.language}
                      />
                      <AutoCompleteServerSide
                        multiple
                        label="Instituição"
                        name="institutionId"
                        size={"small"}
                        helperText='Pesquise pela instituição'
                        fetchFunction={getInstitution}
                        searchField={"name"}
                        getOptionValue={option => get(option, 'id')}
                        getOptionLabel={option => get(option, 'name')}
                        required={required.institutionId}
                        renderOption={renderOptionInstitution}
                      />
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
                      <AutoCompleteServerSide
                        multiple
                        label="Palavras chave"
                        name="keyWordIds"
                        size={"small"}
                        helperText='Pesquise pela palavra chave'
                        fetchFunction={getKeyword}
                        searchField={"description"}
                        getOptionValue={option => get(option, 'id')}
                        getOptionLabel={option => get(option, 'description')}
                        required={required.keyWordIds}
                      />
                      <AutoCompleteServerSide
                        multiple
                        label="Áreas do conhecimento"
                        name="knowledgeAreaIds"
                        size={"small"}
                        helperText='Pesquise pela área do conhecimento'
                        fetchFunction={getKnowledgeArea}
                        searchField={"description"}
                        getOptionValue={option => get(option, 'id')}
                        getOptionLabel={option => get(option, 'description')}
                        required={required.knowledgeAreaIds}
                      />
                      <LoadingButton
                        text="Filtrar"
                        variant="outlined"
                        className={styles.submitButton}
                      />
                    </Stack>
                  )}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <PaginatedList
              className={styles.listMargin}
              getMethod={getResearchAdvanced}
              component={ResearchListItem}
              queryParams={queryParams}
            />
          </Grid>
        </Grid>
      </div>
    </Container >
  );
}

export default Search;