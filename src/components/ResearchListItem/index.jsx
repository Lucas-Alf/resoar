import React, { Fragment } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { researchType } from '../../pages/research/utils';
import { Box } from '@mui/system';
import { head, map, filter, get, size } from 'lodash';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function ResearchListItem(props) {
  const {
    item: {
      title,
      type,
      thumbnailKey,
      abstract,
      authors,
      advisors,
      year
    }
  } = props

  const theme = useTheme();

  const renderUsers = (list) => {
    const totalSize = size(list) - 1
    return map(list, (item, index) => {
      return (
        <Fragment key={index}>
          <Link style={{ color: theme.palette.text.secondary }} to={`/user/${get(item, 'id')}`}>{get(item, 'name')}</Link>
          {index != totalSize && ", "}
        </Fragment>
      )
    })
  }

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <div className={styles.researchType}>
          <Typography className={styles.researchTypeText} variant="body2" color="text.secondary">
            {get(head(filter(researchType, ['value', type])), 'label', '')}
          </Typography>
        </div>
        <Typography variant="body2" className={styles.title}>
          {title}
        </Typography>
        <Box className={styles.box}>
          <img
            src={`${import.meta.env.VITE_STORAGE_URL}/thumbnail/${thumbnailKey}`}
            className={styles.image}
          />
          <Box className={styles.contentBox}>
            <Typography variant="body2" color="text.secondary" className={styles.abstract}>
              {abstract}
            </Typography>
            <p>
              Publicado em: {year} <br />
              <span className={styles.details}>
                Escrito por: {renderUsers(authors)} <br />
              </span>
              <span className={styles.details}>
                Orientado por: {renderUsers(advisors)}
              </span>
            </p>
          </Box>
        </Box>
      </CardContent>
    </Card >
  );
}

ResearchListItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default ResearchListItem;