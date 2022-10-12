import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, FormLabel } from '@mui/material';
import { get, map, join } from 'lodash';
import styles from './styles.module.css'

function AutocompleteAdapter(props) {
  const {
    label,
    size,
    error,
    isError,
    required,
    helperText,
    submitError,
    variant,
    accept,
    onChange: onChangeCallback,
    input: {
      multiple,
      name,
      onChange
    },
    ...rest
  } = props

  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    const files = get(event, 'target.files')
    const fileName = join(map(files, x => x.name), ', ')
    setFileName(fileName)

    onChange(event);

    if (onChangeCallback) {
      onChangeCallback(event);
    }
  }

  const customText = `${helperText} ${required ? ' *' : ''}`
  const textStyle = `MuiInputLabel-root ${styles.fileName} ${isError ? styles.error : null}`

  return (
    <Paper className={`${styles.paper} ${isError ? styles.error : null}`} variant="outlined">
      <div className={styles.fileUpload}>
        <Button size={size} variant={variant} component="label">
          {label}
          <input
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            hidden
            {...rest}
          />
        </Button>
        <FormLabel error={isError} className={textStyle}>
          {isError ? error || submitError : fileName || customText}
        </FormLabel>
      </div>
    </Paper>
  );
}

AutocompleteAdapter.propTypes = {
  error: PropTypes.array,
  input: PropTypes.object,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  submitError: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.any.isRequired,
  variant: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

AutocompleteAdapter.defaultProps = {
  error: [],
  input: {},
  isError: false,
  submitError: ''
}

export default AutocompleteAdapter;