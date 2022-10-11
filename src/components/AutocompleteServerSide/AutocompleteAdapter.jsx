import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';

function AutocompleteAdapter(props) {
  const {
    label,
    error,
    isError,
    required,
    helperText,
    searchField,
    submitError,
    fetchFunction,
    getOptionValue,
    onChange: onChangeCallback,
    input: {
      multiple,
      onChange,
      name
    },
    ...rest
  } = props


  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchValueBuffer, setSearchValueBuffer] = useState("")
  const [queryParams, setQueryParams] = useState({})
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true)
    fetchFunction(queryParams)
      .then((request) => {
        setOptions(get(request.data, 'records', []))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar, queryParams])

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchValueBuffer(searchValue), 500);
    return () => clearTimeout(timeOutId);
  }, [searchValue]);

  useEffect(() => {
    setQueryParams(prevParams => { return { ...prevParams, [searchField]: searchValueBuffer } })
  }, [searchValueBuffer, searchField])

  const getValue = (values) => {
    if (!getOptionValue) {
      return values;
    }

    if (multiple) {
      return values ? values.map(getOptionValue) : null
    } else {
      return values ? getOptionValue(values) : null
    }
  }

  const onChangeFunc = (event, value, reason, details,) => {
    const gotValue = getValue(value);
    onChange(gotValue);

    if (onChangeCallback) {
      onChangeCallback(event, gotValue, reason, details);
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      onChange={onChangeFunc}
      loading={loading}
      options={options}
      filterOptions={(x) => x}
      onInputChange={(event, value) => { setSearchValue(value) }}
      isOptionEqualToValue={(option, value) => getOptionValue(option) === getOptionValue(value)}
      renderInput={(params) => (
        <TextField
          name={name}
          label={label}
          helperText={isError ? error || submitError : helperText}
          required={required}
          error={isError}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...params}
        />
      )}
      {...rest}
    />
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
  fetchFunction: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchField: PropTypes.string.isRequired
}

AutocompleteAdapter.defaultProps = {
  error: [],
  input: {},
  isError: false,
  submitError: ''
}

export default AutocompleteAdapter;