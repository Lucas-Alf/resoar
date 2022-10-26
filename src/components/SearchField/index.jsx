import React, { forwardRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from 'prop-types';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.12),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.13),
  },
  width: "100%"
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
}));

const SearchField = forwardRef((props, ref) => {
  const {
    handleSearch,
    value,
    onChange,
    ...otherProps
  } = props

  return (
    <Search ref={ref} {...otherProps}>
      <SearchIconWrapper>
        <SearchIcon color="disabled" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Pesquisar…"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
        onKeyDown={handleSearch}
      />
    </Search>
  );
})

SearchField.displayName = "SearchField"
SearchField.propTypes = {
  handleSearch: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func
}

SearchField.defaultProps = {
  value: '',
  handleSearch: () => { },
  onChange: () => { },
}

export default SearchField