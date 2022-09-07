import { Container, Stack, Typography } from '@mui/material';
import React, { } from 'react';
import CustomCardContainer from '../../components/CustomCardContainer';
import styles from './styles.module.css'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import MyPublications from './MyPublications';

function Overview() {
  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4'> Visão Geral</Typography>
      <Stack spacing={5} style={{ marginTop: 25 }}>
        <MyPublications />
        <CustomCardContainer
          title='Salvos'
          titleIcon={BookmarkIcon}
          screenUrl="/bookmarks"
        >
          <div>test</div>
        </CustomCardContainer>
        <CustomCardContainer
          title='Histórico'
          titleIcon={HistoryIcon}
          screenUrl="/bookmarks"
        >
          <div>test</div>
        </CustomCardContainer>
      </Stack>
    </Container >
  );
}

export default Overview;