import { Box, Divider, Link, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';

import GroupIcon from '@mui/icons-material/Group';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SellIcon from '@mui/icons-material/Sell';
import { getRouteByName } from '@/router/helpers';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { logout } from '@/api/seguridad/seguridad.reducer';
import { SnackbarGlobal } from '@/components/SnackbarGlobal';
import { PermisoPaginas } from '@/redux/permisos/permisos.state';
import { getPermisos } from '@/redux/permisos/permisos.slice';

interface Menu{pagina: keyof PermisoPaginas, label: string, icon: React.ReactElement, to: string};

export default function DashboardLayout(){
  const dispatch = useAppDispatch();
  const { permisosPaginas } = useAppSelector(st => st.permisos);
  const menu = useMemo<Menu[]>(() => {

    const preMenu: Menu[] =  [
      {pagina: 'LIBRO_PAGINA', label: 'Gestionar Libros', icon: <WebStoriesIcon  color='inherit'/>,to: getRouteByName('dashboard.gestioLibro') },
      {pagina: 'CATEGORIA_PAGINA', label: 'Gestionar Categorías', icon: <SellIcon  color='inherit'/>, to: getRouteByName('dashboard.gestioCategoria') },
      {pagina: 'REPORTES', label: 'Gestionar Reportes', icon: <ArticleIcon  color='inherit'/>, to: getRouteByName('dashboard.gestioReportes') },
      {pagina:  'USUARIO_PAGINA', label: 'Gestionar Usuarios', icon: <GroupIcon  color='inherit'/>, to: getRouteByName('dashboard.gestioUsuarios') },
      //{ label: 'Gestionar Roles', icon: <SecurityIcon  color='inherit'/>, to: getRouteByName('') }
      {pagina:  'USUARIO_PAGINA', label: 'Gestionar Reportes', icon: <BarChartIcon color='inherit'/>, to: getRouteByName('dashboard.gestioReportes') },
    ];
    
    return preMenu.filter( ({pagina}) => {
      return permisosPaginas?.[pagina]?.puedoAcceder || false;
    }); 

  }, [permisosPaginas])


  useEffect(() => {
    dispatch(getPermisos());
  },[])

  return <>
    <MiniDrawer 
      menu={menu}
    />
    <SnackbarGlobal />
  </>;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

function MiniDrawer({
  menu
}: {menu: any}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(getRouteByName('inicio'));
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Stack>
            <Typography variant="h6" noWrap component="div">
                Titulo de la web
            </Typography>
            <Link onClick={(e) => { e.preventDefault(); navigate(getRouteByName('inicio')) }}  component="span" fontSize={'.8em'} color="#fff" style={{cursor: 'pointer'}}>
                ir al sitio web
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((menu: any, index: any) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(menu.to)}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? {justifyContent: 'initial'} : {justifyContent: 'center'}
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 4 } : { mr: 'auto' }
                  ]}
                >
                   {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.label}
                  sx={[ open ? {opacity: 1} : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleLogout}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? {justifyContent: 'initial'} : {justifyContent: 'center'}
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' }
                  ]}
                >
                   <ExitToAppIcon color='error'/>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography color='error'>Salir</Typography>}
                  sx={[ open ? {opacity: 1} : { opacity: 0 }]}
                />
              </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
)
}