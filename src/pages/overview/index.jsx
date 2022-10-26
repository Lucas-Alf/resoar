import { Container, Stack, Typography } from '@mui/material';
import React, { } from 'react';
import styles from './styles.module.css'
import OverviewRow from '../../components/OverviewRow';
import { getResearch } from '../../services/research';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HistoryIcon from '@mui/icons-material/History';

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
          getMethod={getResearch}
          url="/bookmarks"
        />
        <OverviewRow
          title="Histórico"
          icon={HistoryIcon}
          getMethod={getResearch}
          url="/history"
        />
      </Stack>
    </Container >
  );
}

export default Overview;