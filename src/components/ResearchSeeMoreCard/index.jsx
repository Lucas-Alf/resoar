import React from "react";
import { Avatar, Card, Typography } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function ResearchSeeMoreCard(props) {
  const {
    url,
    text,
    icon: Icon
  } = props

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined" className={styles.card} onClick={() => navigate(url)}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Avatar sx={{ width: 64, height: 64 }} className={styles.avatar} >
            <Icon />
          </Avatar>
          <Typography variant="h6" color="text.secondary">{text}</Typography>
        </div>
      </div>
    </Card>
  );
}

ResearchSeeMoreCard.defaultProps = {
  icon: FolderIcon,
  text: 'Ver mais'
}

ResearchSeeMoreCard.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.object,
  text: PropTypes.string
}
