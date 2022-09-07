import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CustomCardContainer from '../../../components/CustomCardContainer';
import ResearchCard from '../../../components/ResearchCard';
import { get, map } from 'lodash';
import ResearchCardSkeleton from '../../../components/ResearchCard/skeleton';
import { getResearch } from '../../../services/research';

function MyPublications() {
  const [loadingResearch, setLoadingResearch] = useState(false)
  const [researchData, setResearchData] = useState([])

  useEffect(() => {
    setLoadingResearch(true)
    getResearch().then((request) => {
      setResearchData(request.data)
      setLoadingResearch(false)
    })
  }, [])

  const totalRecords = loadingResearch
    ? ''
    : `(${get(researchData, 'totalRecords')})`

  return (
    <CustomCardContainer
      title={`Publicações ${totalRecords}`}
      screenUrl="/research"
    >
      <Grid container gap={2}>
        {
          !loadingResearch
            ? map(get(researchData, 'records', []), (x) => {
              return (
                <Grid item key={x.id}>
                  <ResearchCard
                    id={x.id}
                    title={x.title}
                    thumbnailKey={x.thumbnailKey}
                  />
                </Grid>
              )
            })
            : (
              <>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
                <Grid item>
                  <ResearchCardSkeleton />
                </Grid>
              </>
            )
        }
      </Grid>
    </CustomCardContainer >
  );
}

export default MyPublications;