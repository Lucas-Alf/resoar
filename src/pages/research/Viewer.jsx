import React, { useEffect, useState } from 'react';
import { get, split } from 'lodash';
import { useSnackbar } from "notistack";
import { getResearchById } from '../../services/research'
import { getToken, isAuthenticated } from '../../services/auth';
import PdfViewer from '../../components/PdfViewer';
import { LinearProgress } from '@mui/material';

function Viewer() {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [research, setResearch] = useState({})
  const [researchLoading, setResearchLoading] = useState(true)

  useEffect(() => {
    setFile({
      url: `${import.meta.env.VITE_API_URL}/research/download/${split(window.location.pathname, '/')[3]}`,
      httpHeaders: isAuthenticated && {
        'Authorization': `bearer ${getToken()}`
      }
    })
  }, [])

  useEffect(() => {
    setResearchLoading(true)
    getResearchById(split(window.location.pathname, '/')[3])
      .then((response) => {
        if (get(response, 'data.success', false)) {
          setResearch(get(response, 'data.data'))
        } else {
          enqueueSnackbar(get(response, 'data.message'), {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu um erro ao carregar os dados`, {
          variant: "error",
        });
      })
      .finally(() => {
        setResearchLoading(false)
      })
  }, [enqueueSnackbar])

  if (researchLoading) {
    return (
      <LinearProgress />
    )
  }

  return (
    <PdfViewer
      id={get(research, 'id', 0)}
      url={file}
      title={get(research, 'title', '...')}
    />
  );
}

export default Viewer;