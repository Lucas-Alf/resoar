import React from "react";
import PropTypes from 'prop-types';
import { Divider, Hidden, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import styles from './styles.module.css'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

function CardWithToolbar(props) {
  const {
    title,
    titleIcon,
    toolbarItems,
    bodyMargin,
    children,
    screenUrl,
    className
  } = props

  return (
    <Paper className={className} variant="outlined">
      <div className={styles.horizontalList}>
        <ListItem>
          <ListItemIcon style={{ minWidth: 30 }}>
            {titleIcon}
          </ListItemIcon>
          <ListItemText primary={title} />
          {toolbarItems}
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
      <div className={bodyMargin ? styles.box : null}>
        {children}
      </div>
    </Paper>
  );
}

CardWithToolbar.defaultProps = {
  titleIcon: <FolderIcon fontSize="small" />,
  bodyMargin: true,
  className: null
}

CardWithToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.object,
  screenUrl: PropTypes.string,
  bodyMargin: PropTypes.bool,
  toolbarItems: PropTypes.element,
  children: PropTypes.element,
  className: PropTypes.string
}

export default CardWithToolbar;