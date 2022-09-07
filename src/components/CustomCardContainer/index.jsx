import React from "react";
import PropTypes from 'prop-types';
import { Divider, Hidden, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import styles from './styles.module.css'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

export default function CustomCardContainer(props) {
  const {
    title,
    bodyMargin,
    children,
    screenUrl,
    titleIcon: TitleIcon
  } = props

  return (
    <Paper variant="outlined">
      <div className={styles.horizontalList}>
        <ListItem>
          <ListItemIcon style={{ minWidth: 30 }}>
            <TitleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
        {
          !isEmpty(screenUrl) && (
            <>
              <Hidden smDown>
                <Link to={screenUrl} className={styles.link}>
                  <ListItem style={{ cursor: 'pointer', paddingRight: 0 }}>
                    <ListItemText primary="Ver tudo" className={styles.seeMore} />
                    <ListItemIcon style={{ minWidth: 28 }}>
                      <ArrowForwardIcon fontSize='small' />
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </Hidden>
              <Hidden smUp>
                <div style={{ paddingTop: 13, paddingRight: 13 }}>
                  <Link to={screenUrl} className={styles.link}>
                    <ArrowForwardIcon fontSize='small' />
                  </Link>
                </div>
              </Hidden>
            </>
          )
        }
      </div>
      <Divider />
      <div className={bodyMargin && styles.box}>
        {children}
      </div>
    </Paper>
  );
}

CustomCardContainer.defaultProps = {
  titleIcon: FolderIcon,
  bodyMargin: true
}

CustomCardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.object,
  screenUrl: PropTypes.string,
  bodyMargin: PropTypes.bool,
  children: PropTypes.element
}
