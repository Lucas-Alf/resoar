/* eslint-disable no-unused-vars */
import React, { } from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'react-final-form';
import AutocompleteAdapter from './AutocompleteAdapter';
import { showErrorOnChange } from 'mui-rff';

function AutoCompleteServerSide(props) {
  const {
    name,
    type,
    size,
    label,
    required,
    multiple,
    creatable,
    className,
    helperText,
    renderTags,
    placeholder,
    searchField,
    renderOption,
    fetchFunction,
    createFunction,
    getOptionLabel,
    getOptionValue,
    disableClearable,
    ...otherProps
  } = props

  const { input, meta } = useField(name)
  const { error, submitError } = meta;
  const isError = showErrorOnChange({ meta });

  return (
    <Field
      name={name}
      type={type}
      size={size}
      label={label}
      error={error}
      isError={isError}
      multiple={multiple}
      required={required}
      creatable={creatable}
      className={className}
      helperText={helperText}
      renderTags={renderTags}
      placeholder={placeholder}
      submitError={submitError}
      searchField={searchField}
      renderOption={renderOption}
      fetchFunction={fetchFunction}
      createFunction={createFunction}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      disableClearable={disableClearable}
      onChange={(event, option) => (input.onChange(option))}
      component={AutocompleteAdapter}
      {...otherProps}
    />
  );
}

AutoCompleteServerSide.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  required: PropTypes.any.isRequired,
  fetchFunction: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.any,
  autocompleteProps: PropTypes.object,
  renderOption: PropTypes.func,
  renderTags: PropTypes.func,
  disableClearable: PropTypes.bool,
  multiple: PropTypes.bool,
  creatable: PropTypes.bool,
  createFunction: PropTypes.func,
}

AutoCompleteServerSide.defaultProps = {
  type: 'text',
  size: 'normal',
  multiple: false,
  creatable: false,
  createFunction: undefined,
}

export default AutoCompleteServerSide;