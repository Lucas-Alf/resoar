import React, { useEffect, useState } from 'react';
// import { isAuthenticated, getToken } from '../../services/auth'
import { get, split } from 'lodash';
import CustomCardContainer from '../../components/CustomCardContainer'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useSnackbar } from "notistack";
import { getResearchById } from '../../services/research'
import FolderIcon from '@mui/icons-material/Folder';
import { CircularProgress, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import samplePdf from '../../assets/sample.pdf';
import styles from './styles.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';

function Viewer() {
  const { enqueueSnackbar } = useSnackbar();
  // const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [research, setResearch] = useState({})
  const [researchLoading, setResearchLoading] = useState(true)

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  // useEffect(() => {
  //   setFile({
  //     url: `${import.meta.env.VITE_API_URL}/research/download/${split(window.location.pathname, '/')[3]}`,
  //     httpHeaders: isAuthenticated && {
  //       'Authorization': `bearer ${getToken()}`
  //     }
  //   })
  // }, [])

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }

  const onItemClick = ({ pageNumber: itemPageNumber }) => {
    setPageNumber(itemPageNumber);
  }

  return (
    <CustomCardContainer
      bodyMargin={false}
      title={get(research, 'title', '...')}
      titleIcon={
        researchLoading
          ? <CircularProgress color="inherit" size={20} />
          : <FolderIcon fontSize='small' />
      }
    >
      <>
        <div className={styles.viewerToolbar}>
          <ListItem>
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconButton
                aria-label="Voltar"
                disabled={pageNumber <= 1 || researchLoading}
                onClick={previousPage}
                size='small'
              >
                <ArrowBackIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconButton
                aria-label="Avançar"
                disabled={pageNumber >= numPages || researchLoading}
                onClick={nextPage}
                size='small'
              >
                <ArrowForwardIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={
                `Página ${pageNumber || (numPages ? 1 : '--')} de ${numPages || '--'}`
              }
            />
          </ListItem>
        </div>
        <div>
          <Document
            // file={file}
            file={samplePdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            onItemClick={onItemClick}
          >
            <Page pageNumber={pageNumber || 1} />
          </Document>
        </div>
      </>
    </CustomCardContainer >
  );
}

export default Viewer;