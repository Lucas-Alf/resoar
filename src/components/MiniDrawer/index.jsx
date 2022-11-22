import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import DrawerHeader from '../DrawerHeader';
import { useNavigate } from "react-router-dom";
import { Tooltip } from '@mui/material';

const drawerWidth = 260;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ open }) {
  const navigate = useNavigate();

  const menus = [
    {
      title: "Visão Geral",
      icon: <DashboardIcon />,
      onClick: () => { navigate("/overview"); }
    },
    {
      title: "Pesquisar Publicações",
      icon: <SearchIcon />,
      onClick: () => { navigate("/search"); }
    },
    {
      title: "Minhas Publicações",
      icon: <FolderIcon />,
      onClick: () => { navigate("/research"); }
    },
    {
      title: "Publicações Salvas",
      icon: <BookmarkIcon />,
      onClick: () => { navigate("/bookmarks"); }
    }
  ]

  const configs = [
    {
      title: "Minha conta",
      icon: <PersonIcon />,
      onClick: () => { navigate("/account"); }
    },
    {
      title: "Sair",
      icon: <LogoutIcon />,
      onClick: () => {
        window.setTheme('light')
        localStorage.clear()
        navigate("/");
      }
    }
  ]

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        {menus.map((itemMenu, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? itemMenu.title : ''} placement='right'>
              <ListItemButton
                onClick={itemMenu.onClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {itemMenu.icon}
                </ListItemIcon>
                <ListItemText primary={itemMenu.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {configs.map((configMenu, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? configMenu.title : ''} placement='right'>
              <ListItemButton
                onClick={configMenu.onClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {configMenu.icon}
                </ListItemIcon>
                <ListItemText primary={configMenu.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}


MiniDrawer.propTypes = {
  open: PropTypes.bool.isRequired
}
