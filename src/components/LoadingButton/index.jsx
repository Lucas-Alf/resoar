import React from "react";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';
import styles from './styles.module.css'

function LoadingButton(props) {
  const { loading, text, type, variant, disabled, ...rest } = props;
  return (
    <Button
      variant={variant}
      type={type}
      className={styles.loginButton}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (<CircularProgress size={25} className={styles.loadingButton} />) : text}
    </Button>
  )
}

LoadingButton.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  disabled: PropTypes.bool,
  text: PropTypes.string
}

LoadingButton.defaultProps = {
  variant: 'contained',
  loading: false,
  type: 'submit',
  disabled: false,
  text: 'Enviar'
}

export default LoadingButton;