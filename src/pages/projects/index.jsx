import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import styles from './styles.module.css'
import { getResearch } from '../../services/research'
import { DataGrid } from '@mui/x-data-grid';
import { get } from 'lodash';
import { useSnackbar } from "notistack";

function Projects() {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      sortable: false
    },
    {
      field: 'title',
      headerName: 'Titulo',
      flex: 1,
      sortable: false,

    }
  ];

  useEffect(() => {
    getResearch({ page, pageSize })
      .then((request) => {
        setRecords(get(request.data, 'records', []))
        setTotalRecords(get(request.data, 'totalRecords', 0))
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu um erro ao carregar os dados`, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }, [enqueueSnackbar, page, pageSize])

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography variant='h4' color="primary"> Minhas Publicações</Typography>
      <Box className={styles.dataGridBox}>
        <DataGrid
          pagination
          paginationMode="server"
          loading={loading}
          columns={columns}
          disableColumnFilter
          page={page}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onPageChange={setPage}
          rowCount={totalRecords}
          rows={records}
        />
      </Box>
    </Container >
  );
}

export default Projects;