import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import EmailIcon from '@material-ui/icons/Email';

// Components
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MobileMenu from './MobileMenu';
import Messages from './Messages';

// Context
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';

// Logo
import logoPath from '../../assets/logo/logo.svg';

// Define Style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    boxShadow: 'none',
    color: 'white',
    padding: theme.spacing(0, 2),
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleSpan: {
    color: theme.palette.primary.main,
  },
  navbarLinks: {
    fontWeight: '700',
  },
  profile: {
    transform: 'translateY(-3px)',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileInfoUser: {
    fontWeight: 600,
  },
  profileLogout: {
    color: theme.palette.error.main,
  },
}));

// Menu Items Mobile Menu
const menuItems = [
  { menuText: 'Search', key: 'search', href: '/search', icon: <SearchIcon /> },
  {
    menuText: 'How it works',
    key: 'how',
    href: '/how-it-works',
    icon: <HelpIcon />,
  },
  { menuText: 'About', key: 'about', href: '/about', icon: <InfoIcon /> },
];

const Navbar = () => {
  // ======= CONTEXT =======
  // Navbar Context
  const navbarContext = useContext(NavbarContext);
  const {
    setMenu,
    setMessagesMenu,
    setLoginForm,
    setRegisterForm,
  } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, logoutUser } = authContext;

  // ======= STATES ========
  const [anchorEl, setAnchorEl] = useState(null);

  // ======= FUNCTIONS =======

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logoutUser();
  };

  // ======= STYLE =======

  // Theme
  const theme = useTheme();

  // MediaQueries
  let mup = useMediaQuery(theme.breakpoints.up('md'));
  let xsup = useMediaQuery(theme.breakpoints.up('xs'));

  // Style
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='transparent' className={classes.navbar}>
        <Toolbar>
          <Link to='/'>
            <img
              src={logoPath}
              alt='rent-my-ride_logo'
              className={classes.logo}
            />
          </Link>
          <Typography variant='h6' className={`${classes.title} title`}>
            {mup && (
              <Link to='/'>
                RentMy<span className={classes.titleSpan}>Ride</span>
              </Link>
            )}
          </Typography>
          {xsup ? (
            <Fragment>
              <Button component={Link} to='/how-does-it-work' color='inherit'>
                How it works
              </Button>
              <Button
                component={Link}
                to='/search'
                color='inherit'
                size='large'
              >
                Search
              </Button>
              <Button component={Link} to='/about' color='inherit'>
                About
              </Button>
              {!isAuthenticated ? (
                <Fragment>
                  <Button color='inherit' onClick={() => setLoginForm(true)}>
                    Login
                  </Button>
                  <Box ml={3}>
                    <Button
                      onClick={() => setRegisterForm(true)}
                      color='primary'
                      variant='contained'
                    >
                      Register
                    </Button>
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Box ml={3} mr={2}>
                    <IconButton
                      edge='start'
                      aria-label='messages'
                      onClick={() =>
                        setMessagesMenu({ open: true, message: '' })
                      }
                    >
                      <EmailIcon />
                    </IconButton>
                  </Box>
                  <Button
                    aria-controls='profile'
                    aria-haspopup='true'
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                    startIcon={<AccountCircleIcon />}
                  >
                    Profile
                  </Button>
                  <Menu
                    id='profile-web'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className={classes.profile}
                  >
                    <MenuItem
                      component={Link}
                      to='/settings'
                      onClick={handleClose}
                      className={classes.profileInfo}
                    >
                      Signed in as
                      <span className={classes.profileInfoUser}>
                        {user !== null && user.username}
                      </span>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      component={Link}
                      to='/profile?tab=bookings'
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.profileLogout}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <IconButton
              edge='end'
              aria-label='menu'
              onClick={() => setMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <MobileMenu
        menuItems={menuItems}
        loggedIn={isAuthenticated ? true : false}
      />
      <Login />
      <Register />
      <Messages />
    </div>
  );
};

export default Navbar;
