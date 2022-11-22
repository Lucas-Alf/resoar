import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useSnackbar } from 'notistack';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { getUserSavedResearchExists, addUserSavedResearch, deleteUserSavedResearch } from '../../services/user-saved-research'
import { get } from "lodash";

function SaveResearchButton(props) {
  const {
    id,
    className,
    ...otherProps
  } = props

  const { enqueueSnackbar } = useSnackbar();
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getUserSavedResearchExists(id)
      .then((request) => {
        const isSuccess = get(request, 'data.success', false)
        if (isSuccess) {
          setSaved(get(request, 'data.data.exists'))
        } else {
          enqueueSnackbar(get(request, 'data.message'), {
            variant: "error"
          })
        }
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar("Ocorreu um erro ao buscar os dados", {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, enqueueSnackbar])

  const handleToggleResearch = () => {
    const toggleSavedFunction = saved
      ? deleteUserSavedResearch
      : addUserSavedResearch

    setLoading(true)
    toggleSavedFunction(id)
      .then((request) => {
        const isSuccess = get(request, 'data.success', false)
        if (isSuccess) {
          setSaved(!saved)
        }
        enqueueSnackbar(get(request, 'data.message'), {
          variant: isSuccess
            ? "info"
            : "error"
        })
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(`Ocorreu ao ${saved ? "remover" : "salvar"} a publicação`, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }

  let label;
  let icon;
  if (loading) {
    label = "Carregando"
    icon = <CircularProgress color="inherit" size={20} />
  } else {
    if (saved) {
      label = "Esquecer publicação"
      icon = <BookmarkRemoveIcon />
    } else {
      label = "Salvar publicação"
      icon = <BookmarkAddIcon />
    }
  }

  return (
    <>
      <IconButton
        className={className}
        disabled={loading}
        onClick={() => { handleToggleResearch() }}
        {...otherProps}
      >
        <Tooltip title={label}>
          {icon}
        </Tooltip>
      </IconButton>
    </>
  );
}


SaveResearchButton.propTypes = {
  id: PropTypes.number,
  className: PropTypes.string
}

export default SaveResearchButton