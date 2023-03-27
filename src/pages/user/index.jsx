import { Avatar, Collapse, Container, IconButton, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'
import { getUserById } from '../../services/user'
import { get, isEmpty, split } from 'lodash';
import { useSnackbar } from "notistack";
import { useTheme, alpha } from "@mui/material/styles";
import { getUserId } from '../../services/auth'
import CardWithToolbar from '../../components/CardWithToolbar';
import PaginatedList from '../../components/PagedList';
import ResearchListItem from '../../components/ResearchListItem';
import { getResearch } from '../../services/research'
import FilterIcon from '@mui/icons-material/FilterAlt';

function User() {
  let userId = split(window.location.pathname, '/')[2]
  if (isEmpty(userId)) {
    userId = getUserId()
  }

  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({})
  const [userLoading, setUserLoading] = useState(true)
  const [showAuthorFilter, setShowAuthorFilter] = useState(false)
  const [showAdvisorFilter, setShowAdvisorFilter] = useState(false)

  const [authorTitle, setAuthorTitle] = useState("")
  const [authorTitleBuffer, setAuthorTitleBuffer] = useState("")
  const [authorQuery, setAuthorQuery] = useState()

  const [advisorTitle, setAdvisorTitle] = useState("")
  const [advisorTitleBuffer, setAdvisorTitleBuffer] = useState("")
  const [advisorQuery, setAdvisorQuery] = useState()

  useEffect(() => {
    const timeOutId = setTimeout(() => setAuthorTitleBuffer(authorTitle), 500);
    return () => clearTimeout(timeOutId);
  }, [authorTitle]);

  useEffect(() => {
    setAuthorQuery(prevParams => { return { ...prevParams, title: authorTitleBuffer } })
  }, [authorTitleBuffer])

  useEffect(() => {
    const timeOutId = setTimeout(() => setAdvisorTitleBuffer(advisorTitle), 500);
    return () => clearTimeout(timeOutId);
  }, [advisorTitle]);

  useEffect(() => {
    setAdvisorQuery(prevParams => { return { ...prevParams, title: advisorTitleBuffer } })
  }, [advisorTitleBuffer])

  useEffect(() => {
    setUserLoading(true)
    setAuthorQuery({ userId })
    setAdvisorQuery({ advisorId: userId })
    getUserById(userId)
      .then((response) => {
        if (get(response, 'data.success', false)) {
          setUser(get(response, 'data.data'))
        } else {
          enqueueSnackbar(get(response, 'data.message'), {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu um erro ao carregar os dados`, {
          variant: "error",
        });
      })
      .finally(() => {
        setUserLoading(false)
      })
  }, [userId, enqueueSnackbar])

  if (userLoading) {
    return <LinearProgress />
  }

  const {
    name,
    imagePath
  } = user

  return (
    <>
      <div
        style={{
          backgroundImage: window.theme === 'light'
            ? `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='80' patternTransform='scale(3) rotate(40)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(22, 0%, 100%, 1)'/><path d='M-4.798 13.573C-3.149 12.533-1.446 11.306 0 10c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(174,20.8%,19.8%,1)' fill='none'/><path d='M-4.798 33.573C-3.149 32.533-1.446 31.306 0 30c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(6,56.8%,49%,1)' fill='none'/><path d='M-4.798 53.573C-3.149 52.533-1.446 51.306 0 50c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(184,65.5%,28.4%,1)' fill='none'/><path d='M-4.798 73.573C-3.149 72.533-1.446 71.306 0 70c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(7,52.6%,30.6%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`
            : `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='80' patternTransform='scale(3) rotate(40)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 7%, 1)'/><path d='M-4.798 13.573C-3.149 12.533-1.446 11.306 0 10c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(174,20.8%,19.8%,1)' fill='none'/><path d='M-4.798 33.573C-3.149 32.533-1.446 31.306 0 30c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(6,56.8%,49%,1)' fill='none'/><path d='M-4.798 53.573C-3.149 52.533-1.446 51.306 0 50c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(184,65.5%,28.4%,1)' fill='none'/><path d='M-4.798 73.573C-3.149 72.533-1.446 71.306 0 70c2.812-2.758 6.18-4.974 10-5 4.183.336 7.193 2.456 10 5 2.86 2.687 6.216 4.952 10 5 4.185-.315 7.35-2.48 10-5 1.452-1.386 3.107-3.085 4.793-4.176'  stroke-width='3' stroke='hsla(7,52.6%,30.6%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`
        }}
        className={styles.greyBlock}
      >
        <Container maxWidth="lg">
          <div className={styles.detailsBlock}>
            <Avatar
              alt={name}
              src={
                !isEmpty(imagePath)
                  ? `${import.meta.env.VITE_STORAGE_URL}/resoar/profile/${imagePath}`
                  : null
              }
              sx={{
                width: 152,
                height: 152,
                border: `solid 5px ${alpha(theme.palette.common.white, 0.12)}`
              }}
            />
            <div className={styles.userName}>
              <Typography variant="h5" noWrap>
                {name}
              </Typography>
            </div>
          </div>
        </Container>
      </div>
      <Container className={styles.container} maxWidth="lg">
        <Stack gap={2}>
          <CardWithToolbar
            title={"Participação como autor"}
            toolbarItems={
              <>
                <Collapse orientation="horizontal" in={showAuthorFilter}>
                  <TextField
                    id="author-search-field"
                    label="Filtrar titulo"
                    size='small'
                    variant='standard'
                    value={authorTitle}
                    onChange={event => setAuthorTitle(event.target.value)}
                  />
                </Collapse>
                <IconButton
                  aria-label="show-author-filter"
                  onClick={() => { setShowAuthorFilter(prev => !prev) }}
                  className={styles.filterIcon}
                >
                  <FilterIcon />
                </IconButton>
              </>
            }
          >
            <PaginatedList
              getMethod={getResearch}
              component={ResearchListItem}
              queryParams={authorQuery}
              defaultPageSize={5}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </CardWithToolbar>
          <CardWithToolbar
            title={"Participação como orientador"}
            toolbarItems={
              <>
                <Collapse orientation="horizontal" in={showAdvisorFilter}>
                  <TextField
                    id="advisor-search-field"
                    label="Filtrar titulo"
                    size='small'
                    variant='standard'
                    value={advisorTitle}
                    onChange={event => setAdvisorTitle(event.target.value)}
                  />
                </Collapse>
                <IconButton
                  aria-label="show-advisor-filter"
                  onClick={() => { setShowAdvisorFilter(prev => !prev) }}
                  className={styles.filterIcon}
                >
                  <FilterIcon />
                </IconButton>
              </>
            }
          >
            <PaginatedList
              getMethod={getResearch}
              component={ResearchListItem}
              queryParams={advisorQuery}
              defaultPageSize={10}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </CardWithToolbar>
        </Stack>
      </Container>
    </>
  );
}

export default User;