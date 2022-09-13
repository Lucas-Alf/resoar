import React, { } from 'react';
import { Container, Typography } from '@mui/material';
import styles from './styles.module.css'
import { getResearch } from '../../services/research'
import PaginatedList from '../../components/PaginatedList';
import ResearchListItem from '../../components/ResearchListItem';

function Projects() {
  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Minhas Publicações</Typography>
      <PaginatedList
        className={styles.container}
        getMethod={getResearch}
        component={ResearchListItem}
      />
    </Container >
  );
}

export default Projects;