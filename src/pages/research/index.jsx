import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import styles from './styles.module.css'
import { getResearch } from '../../services/research'
import { getUserId } from '../../services/auth'
import PaginatedList from '../../components/PagedList';
import ResearchListItem from '../../components/ResearchListItem';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function Research() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [titleBuffer, setTitleBuffer] = useState("")
  const [queryParams, setQueryParams] = useState({ userId: getUserId() })

  useEffect(() => {
    const timeOutId = setTimeout(() => setTitleBuffer(title), 500);
    return () => clearTimeout(timeOutId);
  }, [title]);

  useEffect(() => {
    setQueryParams(prevParams => { return { ...prevParams, title: titleBuffer } })
  }, [titleBuffer])

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Minhas Publicações</Typography>
      <div className={styles.container}>
        <Grid container spacing={1}>
          <Grid item xs>
            <TextField
              id="search-field"
              label="Filtrar publicações"
              size='small'
              value={title}
              onChange={event => setTitle(event.target.value)}
              className={styles.searchField}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex", width: "120px" }}>
            <Button
              color='inherit'
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => { navigate("/research/add") }}
            >
              Incluir
            </Button>
          </Grid>
        </Grid>
      </div>
      <PaginatedList
        className={styles.listMargin}
        getMethod={getResearch}
        component={ResearchListItem}
        queryParams={queryParams}
      />
    </Container>
  );
}

export default Research;