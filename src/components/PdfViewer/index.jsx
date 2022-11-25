/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';
import CustomCardContainer from '../CustomCardContainer'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import { Box, Card, CircularProgress, Collapse, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import samplePdf from '../../assets/pdf/sample.pdf'
import { get, map } from 'lodash';
import Image from 'mui-image';

function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openSidePanel, setOpenSidePanel] = useState(true);
  const [previewPages, setPreviewPages] = useState([]);

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  const {
    url,
    title,
    disabled,
    loading
  } = props

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);

    getPdfPreviews(pdf).then((previews) => {
      setPreviewPages(previews)
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
          <IconButton
            aria-label="toggle-side-panel"
            disabled={disabled}
            onClick={() => { setOpenSidePanel(prev => !prev) }}
            size='small'
          >
            <Tooltip title={openSidePanel ? 'Exibir painel' : 'Esconde painel'}>
              <MenuIcon fontSize='inherit' />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            aria-label="back-page-button"
            disabled={pageNumber <= 1 || disabled}
            onClick={previousPage}
            size='small'
          >
            <Tooltip title="Voltar página">
              <ArrowBackIcon fontSize='inherit' />
            </Tooltip>
          </IconButton>
          <IconButton
            aria-label="next-page-button"
            disabled={pageNumber >= numPages || disabled}
            onClick={nextPage}
            size='small'
          >
            <Tooltip title="Próxima página">
              <ArrowForwardIcon fontSize='inherit' />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <Typography className={styles.pageNumber}>
            Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
          </Typography>
        </Box>
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
                  map(previewPages, (preview) => {
                    return (
                      <Image
                        key={`page-preview-${get(preview, 'pageNumber')}`}
                        duration={325}
                        width={148}
                        height={192}
                        src={get(preview, 'src')}
                        className={styles.previewImage}
                      />
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
          >
            <Document
              file={samplePdf || url}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              onItemClick={onItemClick}
            >
              <Page pageNumber={pageNumber || 1} />
            </Document>
          </Grid>
        </Grid>
      </Stack>
    </CustomCardContainer >
  );
}

PdfViewer.defaultProps = {
  url: '',
  title: '',
  disabled: false,
  loading: false
}

PdfViewer.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
}

export default PdfViewer;