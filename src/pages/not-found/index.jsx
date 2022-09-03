import { Container, Typography } from '@mui/material';
import React from 'react';
import styles from './styles.module.css'

function NotFound() {
  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography color="primary" variant='h3'> 404</Typography>
      <Typography variant='h4'> Página não encontrada</Typography>
    </Container>
  );
}

export default NotFound;