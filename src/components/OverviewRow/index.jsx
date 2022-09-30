import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { get, map } from 'lodash';
import styles from './styles.module.css'
import PropTypes from 'prop-types';
import ResearchCard from '../ResearchCard';
import ResearchSeeMoreCard from '../ResearchSeeMoreCard';
import { useSnackbar } from "notistack";
import { getUserId } from '../../services/auth'

function OverviewRow(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState([])

  const {
    getMethod,
    title,
    url,
    icon,
    icon: Icon
  } = props

  useEffect(() => {
    setLoading(true)
    getMethod({ pageSize: 3, userId: getUserId() })
      .then((request) => {
        setRecords(request.data)
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu um erro ao carregar os dados`, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }, [getMethod, enqueueSnackbar])

  const totalRecords = !loading
    ? `(${get(records, 'totalRecords', '')})`
    : ''

  return (
    <div style={{ marginTop: 25 }}>
      <div className={styles.titleDiv}>
        <Typography variant='h5' className={styles.wrapIcon}>
          <Icon className={styles.iconMargin} />
          {title}
        </Typography>
        <span className={styles.counter}>{totalRecords}</span>
      </div>
      <Grid container gap={2}>
        {map(get(records, 'records', []), (item) => {
          return (
            <Grid item key={item.id}>
              <ResearchCard
                id={item.id}
                title={item.title}
                visibility={item.visibility}
                thumbnailKey={item.thumbnailKey}
              />
            </Grid>
          )
        })}
        <Grid item>
          <ResearchSeeMoreCard url={url} icon={icon} />
        </Grid>
      </Grid>
    </div>
  );
}

OverviewRow.propTypes = {
  getMethod: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}


export default OverviewRow;