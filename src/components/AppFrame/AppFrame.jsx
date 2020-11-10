import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ErrorBoundary from './../../generic/ErrorBoundary'

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppFrame = (children, props) => {
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const itemsList = [
    {
        text: "Inicio",
        icon: <HomeIcon />,
        onclick: () => history.push('/')
    }, 
    { 
        text: "Contactos",
        icon: <PersonAddIcon />,
        onclick: () => history.push('/contact')
    }, 
    {
        text: "Acerca de",
        icon: < SearchIcon />,
        onclick: () => history.push('/about')
    }
];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container
    justify="center">
        <div className={classes.root}>
        <CssBaseline />
        <AppBar  position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
            >
            <Toolbar>
            <IconButton 
                color="inherit" 
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start" 
                className={clsx(classes.menuButton, {
                [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                SERVICIO NACIONAL DE CONTRATACIÓN PÚBLICA
            </Typography>
            {/* <Button color="inherit" component={Link} to={'/registro'}>REGISTRARSE</Button>
            <Button color="inherit" component={Link} to={'/login'}>INGRESAR</Button> */}
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
                {itemsList.map(( item, index) => {
                    const { text, icon, onClick } = item;
                    return (
                        <ListItem button key={ text } onClick={ onClick }>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
        </Drawer>
        </div>
    </Grid>
  );
};

export default AppFrame;
