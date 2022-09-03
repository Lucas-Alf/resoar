import React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import logoImage from '../../assets/img/resoar/colorfull/fullname.webp'
import PropTypes from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { getShortUserName } from '../../services/auth'
import { Typography } from "@mui/material";
import styles from './styles.module.css'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.12),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.13),
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

export default function SearchAppBar({ toggleDrawer }) {
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
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Hidden mdDown>
          <img src={logoImage} width={140} className={window.theme == 'dark' ? styles.whiteImage : null} />
        </Hidden>
        <Box sx={{ flexGrow: 0.8 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="disabled" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar…"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={handleSearch}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <Typography variant="body2" style={{ fontWeight: 600 }}>{getShortUserName()}</Typography>
        </Hidden>
        <Box>
          <IconButton
            aria-label="Dark Mode"
            onClick={() => window.toggleTheme()}
          >
            {window.theme === "dark"
              ? <DarkModeIcon />
              : <LightModeIcon color="primary" />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

SearchAppBar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired
}
