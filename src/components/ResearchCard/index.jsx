import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import styles from './styles.module.css';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Image from 'mui-image';
import { useNavigate } from 'react-router-dom'
import ShareResearchButton from "../ShareResearch";

export default function ResearchCard(props) {
  const {
    id,
    title,
    thumbnailKey,
    visibility
  } = props

  const navigate = useNavigate();

  const renderImage = () => {
    return (
      <Image
        className={styles.image}
        duration={325}
        height={180}
        src={`${import.meta.env.VITE_STORAGE_URL}/thumbnail/${thumbnailKey}`}
      />
    )
  }

  return (
    <Card sx={{ width: 345 }} variant="outlined" className={styles.card}>
      <CardMedia
        component={renderImage}
        alt={title}
        className={styles.image}
      />
      <Divider />
      <CardContent>
        <Tooltip title={title}>
          <Typography variant="body2" color="text.secondary" className={styles.title}>
            {title}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          startIcon={<VisibilityOutlinedIcon />}
          color="inherit"
          onClick={() => { navigate(`/research/${id}`) }}
        >
          Acessar
        </Button>
        {
          visibility == 1
            ?
            <>
              <ShareResearchButton
                id={id}
                title={title}
                className={styles.iconToRight}
              />
              <IconButton>
                <Tooltip title="Público">
                  <PublicOutlinedIcon />
                </Tooltip>
              </IconButton>
            </>
            :
            <IconButton className={styles.iconToRight}>
              <Tooltip title="Privado">
                <LockOutlinedIcon />
              </Tooltip>
            </IconButton>
        }
      </CardActions>
    </Card>
  );
}

ResearchCard.defaultProps = {
  titleIcon: FolderIcon,
  bodyMargin: true
}

ResearchCard.propTypes = {
  id: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailKey: PropTypes.string.isRequired
}
