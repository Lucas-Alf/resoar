import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { Add as AddIcon } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const handleSearch = (evt) => {
    if (evt.key === "Enter") {
      if (!isEmpty(evt.target.value)) {
        navigate(`/search?query=${evt.target.value}`);
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Dark Mode"
            sx={{ mr: 2 }}
            onClick={() => window.toggleTheme()}
          >
            {window.currentTheme === "dark"
              ? <DarkModeIcon />
              : <LightModeIcon />
            }
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            RESOAR
          </Typography>
          <Box sx={{ flexGrow: 0.7 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Pesquisar…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="add"
              onClick={() => {
                navigate("/add");
              }}
              color="inherit"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

PrimarySearchAppBar.propTypes = {

}