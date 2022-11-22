import React, { useState, useEffect } from 'react';
import { Badge, Card, CardContent, Collapse, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { filter, get, isEmpty, isNumber, values as lodashValues } from 'lodash';
import { getInstitution } from '../../services/institution';
import { getUser } from '../../services/user';
import { getKeyword } from '../../services/keyword';
import { getKnowledgeArea } from '../../services/knowledge-area';
import { getResearchAdvanced } from '../../services/research';
import { Autocomplete, makeRequired, makeValidate, TextField } from 'mui-rff';
import { renderOptionInstitution } from '../institution/utils';
import { renderOptionUser, renderTagsUser } from '../user/utils';
import { useSearchParams } from "react-router-dom";
import AutoCompleteServerSide from '../../components/AutocompleteServerSide';
import PaginatedList from '../../components/PagedList';
import ResearchListItem from '../../components/ResearchListItem';
import SearchField from '../../components/SearchField';
import styles from './styles.module.css';
import Yup from '../../components/Validations';
import { researchType, researchLanguages } from '../research/utils';
import LoadingButton from '../../components/LoadingButton';
import FilterIcon from '@mui/icons-material/FilterAlt';
import FilterOffIcon from '@mui/icons-material/FilterAltOff';

function Search() {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("query")

  const [title, setTitle] = useState(queryValue)
  const [titleBuffer, setTitleBuffer] = useState(queryValue)
  const [queryParams, setQueryParams] = useState({ query: queryValue })
  const [showFilter, setShowFilter] = useState(window.screen.width > 900)
  const [filterCount, setFilterCount] = useState(0)

  useEffect(() => {
    const timeOutId = setTimeout(() => setTitleBuffer(title), 500);
    return () => clearTimeout(timeOutId);
  }, [title]);

  useEffect(() => {
    setQueryParams(prevParams => { return { ...prevParams, query: titleBuffer } })
  }, [titleBuffer])

  const initialValues = {
    startYear: undefined,
    finalYear: undefined,
    types: undefined,
    languages: undefined,
    institutionIds: undefined,
    authorIds: undefined,
    keyWordIds: undefined,
    knowledgeAreaIds: undefined,
    advisorIds: undefined
  }

  const schema = Yup.object().shape({
    startYear: Yup
      .number()
      .integer()
      .min(1)
      .max(9999),
    finalYear: Yup
      .number()
      .integer()
      .max(9999)
      .when(['startYear'], {
        is: (startYear) => isNumber(startYear),
        then: Yup.number().min(Yup.ref("startYear"))
      }),
    types: Yup.array(),
    languages: Yup.array(),
    institutionIds: Yup.array(),
    authorIds: Yup.array(),
    keyWordIds: Yup.array(),
    knowledgeAreaIds: Yup.array(),
    advisorIds: Yup.array()
  });

  const validate = makeValidate(schema);
  const required = makeRequired(schema);

  const handleSubmitForm = (values) => {
    setQueryParams(prevParams => { return { query: get(prevParams, 'query', ''), ...values } })
    const propsWithValue = filter(lodashValues(values), x => !isEmpty(x))
    setFilterCount(propsWithValue.length)
  }

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Pesquisar Publicações</Typography>
      <div className={styles.container}>
        <div className={styles.searchDiv}>
          <IconButton
            color="default"
            aria-label="filter"
            component="label"
            sx={{ display: { md: 'none' } }}
            onClick={() => {
              setShowFilter(!showFilter)
            }}
          >
            <Badge
              badgeContent={filterCount}
              color="primary"
              style={{ marginRight: 8 }}
            >
              {
                showFilter
                  ? <FilterOffIcon />
                  : <FilterIcon />
              }
            </Badge>
          </IconButton>
          <SearchField
            name="search-field"
            value={title}
            onChange={setTitle}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Collapse in={showFilter}>
              <Card variant="outlined" className={styles.card}>
                <CardContent>
                  <Typography variant='h6' style={{ marginBottom: 5 }}>Busca Avançada</Typography>
                  <Form
                    onSubmit={handleSubmitForm}
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
                        <Grid container spacing={2}>
                          <Grid item md={6} xs={12}>
                            <TextField
                              label="Ano inicial"
                              name="startYear"
                              size="small"
                              type="number"
                              required={required.startYear}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
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
                          name="types"
                          size={"small"}
                          options={researchType}
                          getOptionValue={option => option.value}
                          getOptionLabel={option => option.label}
                          required={required.types}
                        />
                        <Autocomplete
                          multiple
                          label="Idioma"
                          name="languages"
                          size={"small"}
                          options={researchLanguages}
                          getOptionValue={option => option.value}
                          getOptionLabel={option => option.label}
                          required={required.languages}
                        />
                        <AutoCompleteServerSide
                          multiple
                          label="Instituição"
                          name="institutionIds"
                          size={"small"}
                          helperText='Pesquise pela instituição'
                          fetchFunction={getInstitution}
                          searchField={"name"}
                          getOptionValue={option => get(option, 'id')}
                          getOptionLabel={option => get(option, 'name')}
                          required={required.institutionIds}
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
            </Collapse>
          </Grid>
          <Grid item md={9} xs={12}>
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