import React from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'react-final-form';
import FileUploadAdapter from './FileUploadAdapter';
import { showErrorOnChange } from 'mui-rff';

function FileUpload(props) {
  const {
    name,
    size,
    label,
    accept,
    required,
    multiple,
    className,
    helperText,
    placeholder,
    ...otherProps
  } = props

  const { meta } = useField(name)
  const { error, submitError } = meta;
  const isError = showErrorOnChange({ meta });

  return (
    <Field
      name={name}
      size={size}
      label={label}
      error={error}
      accept={accept}
      isError={isError}
      multiple={multiple}
      required={required}
      className={className}
      helperText={helperText}
      placeholder={placeholder}
      submitError={submitError}
      component={FileUploadAdapter}
      {...otherProps}
    />
  );
}

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  required: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.any,
  multiple: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
}

FileUpload.defaultProps = {
  size: 'normal',
  variant: 'outlined',
  multiple: false,
  helperText: 'Nenhum arquivo selecionado'
}

export default FileUpload;