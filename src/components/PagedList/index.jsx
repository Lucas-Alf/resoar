import React, { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import { get, map } from 'lodash';
import { useSnackbar } from "notistack";
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import ListSkeleton from './skeleton';

function PagedList(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const {
    getMethod,
    queryParams,
    component: Component,
    ...otherProps
  } = props

  useEffect(() => {
    getMethod({ page, pageSize, ...queryParams })
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

  return (
    <div {...otherProps}>
      {
        !loading
          ? (
            <>
              <Stack spacing={1}>
                {map(records, (item) => {
                  return (<Component key={item.id} item={item} />)
                })}
              </Stack>
              <TablePagination
                component="div"
                count={totalRecords}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )
          : <ListSkeleton />
      }
    </div>
  );
}

PagedList.propTypes = {
  getMethod: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  queryParams: PropTypes.object
}

PagedList.defaultProps = {
  queryParams: {}
}


export default PagedList;