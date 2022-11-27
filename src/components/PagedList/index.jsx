import React, { useEffect, useState } from 'react';
import { LinearProgress, TablePagination, Typography } from '@mui/material';
import { get, map } from 'lodash';
import { useSnackbar } from "notistack";
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { transformRequestOptions } from '../../services/http-client'
import styles from './styles.module.css'

function PagedList(props) {
  const {
    getMethod,
    queryParams,
    emptyMessage,
    defaultPageSize,
    rowsPerPageOptions,
    component: Component,
    ...otherProps
  } = props

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize || 25)
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    setLoading(true)
    getMethod({ page, pageSize, ...queryParams }, {
      paramsSerializer: params => {
        return transformRequestOptions(params)
      }
    })
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
  }, [enqueueSnackbar, getMethod, page, pageSize, queryParams])

  if (loading) {
    return <LinearProgress />
  }

  if (totalRecords == 0) {
    return (
      <div className={styles.emptyText}>
        <Typography variant='h6'>{emptyMessage}</Typography>
      </div>
    )
  }

  return (
    <div {...otherProps}>
      <Stack spacing={1}>
        {map(records, (item) => {
          return (<Component key={item.id} item={item} />)
        })}
      </Stack>
      <TablePagination
        component="div"
        page={page}
        count={totalRecords}
        rowsPerPage={pageSize}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

PagedList.propTypes = {
  getMethod: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  queryParams: PropTypes.object,
  defaultPageSize: PropTypes.number,
  emptyMessage: PropTypes.string,
  rowsPerPageOptions: PropTypes.array
}

PagedList.defaultProps = {
  queryParams: {},
  defaultPageSize: 25,
  rowsPerPageOptions: [10, 25, 50, 100],
  emptyMessage: 'Nenhum registro encontrado'
}


export default PagedList;