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
    size,
    disabled,
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
      icon = <BookmarkRemoveIcon fontSize={size} />
    } else {
      label = "Salvar publicação"
      icon = <BookmarkAddIcon fontSize={size} />
    }
  }

  return (
    <>
      <Tooltip {...otherProps} arrow title={label}>
        <span>
          <IconButton
            className={className}
            disabled={loading || disabled}
            onClick={() => { handleToggleResearch() }}
            size={size}
          >
            {icon}
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

SaveResearchButton.defaultProps = {
  size: 'medium',
  disabled: false,
}

SaveResearchButton.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default SaveResearchButton