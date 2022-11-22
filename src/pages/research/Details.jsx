import { Button, Container, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
import { getResearchById } from '../../services/research'
import { filter, get, head, split, toNumber } from 'lodash';
import { useSnackbar } from "notistack";
import { useTheme, alpha } from "@mui/material/styles";
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  FormatQuote as FormatQuoteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import Image from 'mui-image';
import { researchType, researchLanguages } from '../../pages/research/utils';
import { renderUserList } from '../../pages/user/utils';
import ShareResearchButton from '../../components/ShareResearch';
import SaveResearchButton from '../../components/SaveResearchButton';

function Details() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [research, setResearch] = useState({})
  const [researchLoading, setResearchLoading] = useState(true)
  const researchId = split(window.location.pathname, '/')[2]

  const theme = useTheme()

  useEffect(() => {
    setResearchLoading(true)
    getResearchById(researchId)
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
  }, [researchId, enqueueSnackbar])

  if (researchLoading) {
    return <LinearProgress />
  }

  const {
    id,
    title,
    type,
    abstract,
    thumbnailKey,
    language,
    year,
    authors,
    advisors
  } = research

  return (
    <>
      <div style={{ backgroundColor: alpha(theme.palette.common.black, 0.12) }} className={styles.greyBlock}>
        <Container className={styles.container} maxWidth="lg">
          <div className={styles.toolbarButtons}>
            <Button
              color='inherit'
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => { navigate(-1) }}
            >
              Voltar
            </Button>
            <SaveResearchButton
              id={toNumber(researchId)}
              style={{ marginLeft: 'auto' }}
            />
            <Tooltip title="Exportar citação">
              <IconButton
                aria-label="Exportar citação"
                onClick={() => {
                  enqueueSnackbar(`Função ainda não implementada :(`, {
                    variant: 'warning',
                  });
                }}
              >
                <FormatQuoteIcon />
              </IconButton>
            </Tooltip>
            <ShareResearchButton
              id={id}
              title={title}
              className={styles.iconToRight}
            />
          </div>
          <div className={styles.detailsBlock}>
            <Image
              className={styles.image}
              duration={325}
              width={163}
              height={230}
              fit="fill"
              src={`${import.meta.env.VITE_STORAGE_URL}/thumbnail/${thumbnailKey}`}
            />
            <div className={styles.detailsTextBlock}>
              <Typography variant="body2" color="text.secondary">
                {get(head(filter(researchType, ['value', type])), 'label', '')}
              </Typography>
              <Typography variant="h6">
                {title}
              </Typography>
              <p>
                Publicado em: {year} <br />
                <span>
                  Idioma: {get(head(filter(researchLanguages, ['value', language])), 'label', '')} <br />
                </span>
                <span>
                  Escrito por: {renderUserList(authors, theme)} <br />
                </span>
                <span>
                  Orientado por: {renderUserList(advisors, theme)}
                </span>
              </p>
            </div>
          </div>
          <div style={{ marginTop: 15 }}>
            <Button
              color='warning'
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => { navigate(-1) }}
            >
              Visualizar
            </Button>
            <Button
              color='inherit'
              variant="contained"
              startIcon={<DownloadIcon />}
              style={{ marginLeft: 15 }}
              onClick={() => { navigate(-1) }}
            >
              Download
            </Button>
          </div>
        </Container>
      </div>
      <Container className={styles.container} maxWidth="lg">
        <div className={styles.abstractBlock}>
          <Typography variant="h6">
            Resumo
          </Typography>
          <p>{abstract}</p>
        </div>
      </Container>
    </>
  );
}

export default Details;