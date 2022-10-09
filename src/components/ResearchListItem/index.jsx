import React from 'react';
import { Avatar, AvatarGroup, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { researchType } from '../../pages/research/utils';
import { Box } from '@mui/system';
import { head, isEmpty, map, join, size, filter, get } from 'lodash';

function ResearchListItem(props) {
  const {
    item: {
      title,
      type,
      thumbnailKey,
      visibility,
      abstract,
      authors,
      advisors,
      year
    }
  } = props

  const renderAvatar = (list) => {
    return (
      <AvatarGroup max={4}>
        {
          map(list, (item) => {
            if (isEmpty(item.imagePath)) {
              return (
                <Avatar key={item.id} sx={{ width: 34, height: 34 }} alt={item.name}>
                  {head(item.name)}
                </Avatar>
              )
            } else {
              return <Avatar key={item.id} sx={{ width: 34, height: 34 }} alt={item.name} src={item.imagePath} />
            }
          })
        }
      </AvatarGroup>
    )
  }

  return (
    <Card variant="outlined" className={styles.card} sx={{ minWidth: 750 }}>
      <CardContent>
        <div className={styles.researchType}>
          <Typography className={styles.researchTypeText} variant="body2" color="text.secondary">
            {get(head(filter(researchType, ['value', type])), 'label', '')}
          </Typography>
          <div className={styles.actionButtons}>
            {
              visibility == 1
                ?
                <>
                  <IconButton className={styles.button}>
                    <Tooltip title="Compartilhar">
                      <ShareOutlinedIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton className={styles.button}>
                    <Tooltip title="Público">
                      <PublicOutlinedIcon />
                    </Tooltip>
                  </IconButton>
                </>
                :
                <IconButton className={styles.button}>
                  <Tooltip title="Privado">
                    <LockOutlinedIcon />
                  </Tooltip>
                </IconButton>
            }
          </div>
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
            <Grid container className={styles.grid}>
              <Grid item xs={12}>
                <span>Publicado em: {year}</span>
              </Grid>
              <Grid item xs={5}>
                <span>Escrito por:</span>
                <div className={styles.authors}>
                  {renderAvatar(authors)}
                  <Typography variant="body2" color="text.secondary" className={styles.textNames}>
                    {join(map(authors, (x) => x.name), ', ')}
                  </Typography>
                </div>
              </Grid>
              {
                size(advisors) > 0
                  ? <Grid item xs={7}>
                    <span>Orientado por:</span>
                    <div className={styles.authors}>
                      {renderAvatar(advisors)}
                      <Typography variant="body2" color="text.secondary" className={styles.textNames}>
                        {join(map(advisors, (x) => x.name), ', ')}
                      </Typography>
                    </div>
                  </Grid>
                  : null
              }
            </Grid>
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