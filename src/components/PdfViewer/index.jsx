import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Box, CircularProgress, Collapse, Divider, Grid, IconButton, LinearProgress, Stack, Tooltip, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { map, round } from 'lodash';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CustomCardContainer from '../CustomCardContainer'
import FolderIcon from '@mui/icons-material/Folder';
import Image from 'mui-image';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
// import samplePdf from '../../assets/pdf/sample.pdf'
import styles from './styles.module.css'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import SaveResearchButton from '../SaveResearchButton';
import ShareResearchButton from '../ShareResearch';
import DownloadIcon from '@mui/icons-material/Download';
import { useSnackbar } from "notistack";
import { downloadResearch } from '../../services/research'

function PdfViewer(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openSidePanel, setOpenSidePanel] = useState(true);
  const [previewPages, setPreviewPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);
  const [downloadLoading, setDownloadLoading] = useState(false)

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  const {
    url,
    id,
    title,
    disabled: disabledProp,
  } = props

  const disabled = disabledProp || loading

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);

    getPdfPreviews(pdf).then((previews) => {
      setPreviewPages(previews)
      setLoading(false)
    })
  }

  const getPdfPreviews = async (pdf) => {
    let tmpPreviewPages = []
    for (let index = 1; index <= pdf.numPages; index++) {
      const page = await pdf.getPage(index)
      const viewport = page.getViewport({ scale: 1, });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      await page.render(renderContext).promise

      const imgSrc = canvas.toDataURL("image/png");
      tmpPreviewPages = [...tmpPreviewPages, {
        pageNumber: index,
        src: imgSrc
      }]
    }

    return tmpPreviewPages
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

  const handleDownload = () => {
    setDownloadLoading(true)
    downloadResearch(id, title)
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu um erro ao realizar o download`, {
          variant: "error",
        });
      })
      .finally(() => {
        setDownloadLoading(false)
      });
  }

  return (
    <CustomCardContainer
      bodyMargin={false}
      title={title}
      titleIcon={
        loading
          ? <CircularProgress color="inherit" size={20} />
          : <FolderIcon fontSize='small' />
      }
    >
      <Stack>
        <Box
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            '& svg': {
              m: 1.5,
            },
            '& hr': {
              mx: 0.5,
            },
          }}
          className={styles.toolbar}
        >
          <Tooltip arrow title={openSidePanel ? 'Exibir painel' : 'Esconde painel'}>
            <span>
              <IconButton
                aria-label="toggle-side-panel"
                disabled={disabled}
                onClick={() => { setOpenSidePanel(prev => !prev) }}
                size='small'
              >
                <MenuIcon fontSize='inherit' />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip arrow title="Voltar página">
            <span>
              <IconButton
                aria-label="back-page-button"
                disabled={pageNumber <= 1 || disabled}
                onClick={previousPage}
                size='small'
              >
                <ArrowBackIcon fontSize='inherit' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip arrow title="Próxima página">
            <span>
              <IconButton
                aria-label="next-page-button"
                disabled={pageNumber >= numPages || disabled}
                onClick={nextPage}
                size='small'
              >
                <ArrowForwardIcon fontSize='inherit' />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Typography className={styles.pageNumber}>
            Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography className={styles.zoomText}>
            Zoom {round(zoomScale * 100)}%
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Tooltip arrow title="Aumentar Zoom">
            <span>
              <IconButton
                aria-label="zoom-in-button"
                disabled={zoomScale >= 1.5 || disabled}
                onClick={() => { setZoomScale(prev => prev + 0.1) }}
                size='small'
              >
                <ZoomInIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip arrow title="Reduzir Zoom">
            <span>
              <IconButton
                aria-label="zoom-out-button"
                disabled={zoomScale <= 0.2 || disabled}
                onClick={() => { setZoomScale(prev => prev - 0.1) }}
                size='small'
              >
                <ZoomOutIcon fontSize='small' />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip arrow title="Download">
            <span>
              <IconButton
                aria-label="download-button"
                disabled={disabled || downloadLoading}
                onClick={() => { handleDownload() }}
                size='small'
              >
                {
                  !downloadLoading
                    ? <DownloadIcon fontSize='small' />
                    : <CircularProgress color="inherit" />
                }
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <SaveResearchButton id={id} size="small" disabled={disabled} />
          <Divider orientation="vertical" flexItem />
          <ShareResearchButton id={id} title={title} size="small" disabled={disabled} />
        </Box>
        {loading && <LinearProgress />}
        <Grid container className={styles.viewerBackground}>
          <Collapse orientation="horizontal" in={openSidePanel}>
            <Grid
              item
              className={styles.sidePanelGrid}
            >
              <Stack
                gap={1}
                className={styles.previewStack}
                alignItems="center"
              >
                {
                  map(previewPages, ({ src, pageNumber }) => {
                    return (
                      <Tooltip
                        key={`page-preview-${pageNumber}`}
                        title={`Página ${pageNumber}`}
                        placement="right"
                        arrow
                      >
                        <span>
                          <Image
                            fit='fill'
                            duration={325}
                            width={146}
                            height={190}
                            src={src}
                            className={styles.previewImage}
                            onClick={() => {
                              setPageNumber(pageNumber)
                            }}
                          />
                        </span>
                      </Tooltip>
                    )
                  })
                }
              </Stack>
            </Grid>
          </Collapse>
          <Grid
            xs
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={styles.documentPanel}
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              onItemClick={onItemClick}
              loading="Carregando..."
              noData="Arquivo não especificado"
              error="Não foi possível carregar o arquivo"
            >
              <Page scale={zoomScale} pageNumber={pageNumber || 1} />
            </Document>
          </Grid>
        </Grid>
      </Stack>
    </CustomCardContainer >
  );
}

PdfViewer.defaultProps = {
  id: 0,
  url: '',
  title: '',
  disabled: false
}

PdfViewer.propTypes = {
  id: PropTypes.number,
  url: PropTypes.object,
  title: PropTypes.string,
  disabled: PropTypes.bool,
}

export default PdfViewer;