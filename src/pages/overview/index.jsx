import { Container, Stack, Typography } from '@mui/material';
import React, { } from 'react';
import styles from './styles.module.css'
import OverviewRow from '../../components/OverviewRow';
import { getResearch } from '../../services/research';
import { getUserSavedResearch } from '../../services/user-saved-research';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

function Overview() {
  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Visão Geral</Typography>
      <Stack spacing={2}>
        <OverviewRow
          title="Minhas Publicações"
          icon={FolderIcon}
          getMethod={getResearch}
          url="/research"
        />
        <OverviewRow
          title="Salvos"
          icon={BookmarkBorderOutlinedIcon}
          getMethod={getUserSavedResearch}
          url="/bookmarks"
        />
      </Stack>
    </Container >
  );
}

export default Overview;