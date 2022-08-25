import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import CustomCard from '../../components/CustomCard';
import styles from './styles.module.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';

function Overview() {
  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4'> Visão Geral</Typography>
      <Stack spacing={5} style={{ marginTop: 25 }}>
        <CustomCard
          title='Projetos'
          screenUrl="projects"
        >
          <div>test</div>
        </CustomCard>
        <CustomCard
          title='Salvos'
          titleIcon={BookmarkIcon}
          screenUrl="/bookmarks"
        >
          <div>test</div>
        </CustomCard>
        <CustomCard
          title='Histórico'
          titleIcon={HistoryIcon}
          screenUrl="/bookmarks"
        >
          <div>test</div>
        </CustomCard>
      </Stack>
    </Container>
  );
}

export default Overview;