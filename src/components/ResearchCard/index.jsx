import React from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Divider, Tooltip, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from "react-router-dom";
import styles from './styles.module.css'

export default function ResearchCard(props) {
  const {
    id,
    title,
    thumbnailKey
  } = props

  return (
    <Card sx={{ maxWidth: 192 }}>
      <Tooltip title={title} followCursor>
        <Link to={`/research/${id}`} className={styles.link}>
          <CardMedia
            component="img"
            height="273"
            image={`${import.meta.env.VITE_STORAGE_URL}/thumbnail/${thumbnailKey}`}
            className={styles.image}
            alt={title}
          />
          <Divider />
          <CardContent className={styles.cardContent}>
            <Typography variant="body2" className={styles.title}>
              {title}
            </Typography>
          </CardContent>
        </Link>
      </Tooltip>
    </Card >
  );
}

ResearchCard.defaultProps = {
  titleIcon: FolderIcon,
  bodyMargin: true
}

ResearchCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailKey: PropTypes.string.isRequired
}
