import React, { Fragment } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { researchType } from '../../pages/research/utils';
import { Box } from '@mui/system';
import { head, map, filter, get, size } from 'lodash';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';

function ResearchListItem(props) {
  const {
    item: {
      id,
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
        <Box
          sx={{
            '& a': {
              color: theme.palette.text.primary
            },
            '& a:visited': {
              color: '#5e5e5e'
            }
          }}
        >
          <Link to={`/research/${id}`} className={styles.title}>
            {title}
          </Link>
        </Box>
        <Box className={styles.box}>
          <Link to={`/research/${id}`}>
            <Image
              className={styles.image}
              duration={325}
              width={148}
              height={192}
              src={`${import.meta.env.VITE_STORAGE_URL}/thumbnail/${thumbnailKey}`}
            />
          </Link>
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