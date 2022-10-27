import React, { forwardRef } from "react";
import PropTypes from 'prop-types';
import Search from './Search'
import SearchIconWrapper from './SearchIconWrapper'
import StyledInputBase from './StyledInputBase'
import SearchIcon from "@mui/icons-material/Search";

const SearchField = forwardRef((props, ref) => {
  const {
    name,
    value,
    handleSearch,
    onChange,
    ...otherProps
  } = props

  return (
    <Search ref={ref} {...otherProps}>
      <SearchIconWrapper>
        <SearchIcon color="disabled" />
      </SearchIconWrapper>
      <StyledInputBase
        id={`${name}-input`}
        name={name}
        type="text"
        value={value}
        placeholder="Pesquisar…"
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleSearch}
      />
    </Search>
  );
})

SearchField.displayName = "SearchField"

SearchField.defaultProps = {
  value: '',
  handleSearch: () => { },
  onChange: () => { },
}

SearchField.propTypes = {
  name: PropTypes.string.isRequired,
  handleSearch: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default SearchField