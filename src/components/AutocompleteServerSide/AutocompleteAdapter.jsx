import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { get, isEmpty, isFunction, filter, last, map } from 'lodash';
import { useSnackbar } from 'notistack';

function AutocompleteAdapter(props) {
  const {
    label,
    error,
    isError,
    required,
    creatable,
    helperText,
    searchField,
    submitError,
    fetchFunction,
    getOptionValue,
    createFunction,
    onChange: onChangeCallback,
    input: {
      multiple,
      onChange,
      name
    },
    ...rest
  } = props

  const [value, setValue] = useState(multiple ? [] : null)
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
        if (creatable) {
          const searchValue = get(queryParams, searchField, '')
          const totalRecords = get(request, 'data.totalRecords', [])
          if (!isEmpty(searchValue) && totalRecords === 0) {
            setOptions([{ id: null, create: true, [searchField]: `Adicionar "${searchValue}"` }])
          } else {
            setOptions(get(request, 'data.records', []))
          }
        } else {
          setOptions(get(request, 'data.records', []))
        }
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

  const handleCreate = (event, value, reason, details) => {
    setLoading(true)
    const defaultErrorMessage = 'Ocorreu um erro ao adicionar o registro'
    createFunction({ [searchField]: get(queryParams, searchField, '') })
      .then((request) => {
        const isSuccess = get(request, 'data.success', false)
        if (isSuccess) {
          const newId = get(request, 'data.data.id')
          let newValue = { ...value, id: newId, create: false }
          if (multiple) {
            newValue = filter(value, x => !x.create)
            newValue = [...newValue, {
              id: newId,
              [searchField]: get(queryParams, searchField, ''),
              create: false,
            }]
          }
          const newDetails = {
            ...details,
            option: multiple
              ? last(newValue)
              : newValue
          }
          onChangeFunc(event, newValue, reason, newDetails)
        } else {
          enqueueSnackbar(get(request, 'data.message', defaultErrorMessage), {
            variant: "error"
          })
        }
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar(defaultErrorMessage, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getValue = (values) => {
    if (!getOptionValue) {
      return values;
    }

    if (multiple) {
      return values ? map(values, getOptionValue) : null
    } else {
      return values ? getOptionValue(values) : null
    }
  }

  const onChangeFunc = (event, value, reason, details) => {
    const isCreate = multiple
      ? !isEmpty(filter(value, x => x.create, []))
      : get(value, 'create', false)

    if (creatable && isFunction(createFunction) && isCreate) {
      handleCreate(event, value, reason, details)
    } else {
      const gotValue = getValue(value);
      onChange(gotValue);
      setValue(value)

      if (onChangeCallback) {
        onChangeCallback(event, gotValue, reason, details);
      }
    }
  };

  let creatableProps = {}
  if (creatable) {
    creatableProps = {
      selectOnFocus: true,
      clearOnBlur: true,
      handleHomeEndKeys: true
    }
  }

  return (
    <Autocomplete
      multiple={multiple}
      onChange={onChangeFunc}
      value={value}
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
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...rest}
      {...creatableProps}
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
  searchField: PropTypes.string.isRequired,
  creatable: PropTypes.bool.isRequired,
  createFunction: PropTypes.func
}

AutocompleteAdapter.defaultProps = {
  error: [],
  input: {},
  isError: false,
  submitError: ''
}

export default AutocompleteAdapter;