import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import styles from './styles.module.css'
import { getUserSavedResearch } from '../../services/user-saved-research'
import { getUserId } from '../../services/auth'
import PaginatedList from '../../components/PagedList';
import ResearchListItem from '../../components/ResearchListItem';

function Bookmarks() {
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
      <Typography variant='h4' color="primary"> Publicações Salvas </Typography>
      <div className={styles.container}>
        <TextField
          id="search-field"
          label="Filtrar publicações"
          size='small'
          value={title}
          onChange={event => setTitle(event.target.value)}
          className={styles.searchField}
        />
      </div>
      <PaginatedList
        className={styles.listMargin}
        getMethod={getUserSavedResearch}
        component={ResearchListItem}
        queryParams={queryParams}
      />
    </Container>
  );
}

export default Bookmarks;