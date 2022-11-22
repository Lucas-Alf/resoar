import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Dialog, DialogContent, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DialogTitleWithCloseButton from "../DialogTitleWithCloseButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSnackbar } from 'notistack';

function ShareResearchButton(props) {
  const {
    id,
    title,
    className
  } = props

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClose = () => [
    setOpen(false)
  ]

  const shareUrl = `${window.location.origin}/research/${id}`

  return (
    <>
      <IconButton className={className} onClick={() => { setOpen(true) }}>
        <Tooltip title="Compartilhar">
          <ShareOutlinedIcon />
        </Tooltip>
      </IconButton>
      <Dialog fullWidth maxWidth="sm" onClose={() => handleClose()} open={open}>
        <DialogTitleWithCloseButton
          onClose={() => handleClose()}
        >
          Compartilhar
        </DialogTitleWithCloseButton>
        <DialogContent>
          <Typography>{title}</Typography>
          <TextField
            disabled
            fullWidth
            style={{ marginTop: 10 }}
            id="copy-to-clipboard"
            label="URL de Compartilhamento"
            defaultValue={shareUrl}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copiar">
                    <IconButton onClick={() => {
                      navigator.clipboard.writeText(shareUrl)
                      enqueueSnackbar(`Copiado para a área de transferência`, {
                        variant: "info",
                      });
                    }} >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

ShareResearchButton.defaultProps = {
  id: 0,
  title: '',
  className: '',
}

ShareResearchButton.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  className: PropTypes.string,
}

export default ShareResearchButton