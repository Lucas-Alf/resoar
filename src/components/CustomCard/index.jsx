import React from "react";
import PropTypes from 'prop-types';
import { Divider, ListItem, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import styles from './styles.module.css'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  const navigate = useNavigate();

  const {
    title,
    bodyMargin,
    children,
    screenUrl,
    titleIcon: TitleIcon
  } = props

  return (
    <Paper variant="outlined">
      <Stack direction={"row"}>
        <ListItem>
          <ListItemIcon style={{ minWidth: 30 }}>
            <TitleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
        {
          !isEmpty(screenUrl) && (
            <ListItem style={{ cursor: 'pointer' }} onClick={() => { navigate(screenUrl) }}>
              <ListItemText primary="Ver tudo" className={styles.seeMore} />
              <ListItemIcon style={{ minWidth: 30 }}>
                <ArrowForwardIcon fontSize='small' />
              </ListItemIcon>
            </ListItem>
          )
        }
      </Stack>
      <Divider />
      <div className={bodyMargin && styles.box}>
        {children}
      </div>
    </Paper>
  );
}

CustomCard.defaultProps = {
  titleIcon: FolderIcon,
  bodyMargin: true
}

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.object,
  screenUrl: PropTypes.string,
  bodyMargin: PropTypes.bool,
  children: PropTypes.element
}
