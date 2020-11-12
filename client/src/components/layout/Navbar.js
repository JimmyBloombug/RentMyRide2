import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Icons
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';

// Components
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MobileMenu from './MobileMenu';

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
}));

// Menu Items Mobile Menu
const menuItems = [
  { menuText: 'Search', key: 'search', href: '/search', icon: <SearchIcon /> },
  { menuText: 'How it works', key: 'help', href: '/help', icon: <HelpIcon /> },
  { menuText: 'About', key: 'about', href: '/about', icon: <InfoIcon /> },
];

const Navbar = () => {
  // ======= CONTEXT =======
  // Navbar Context
  const navbarContext = useContext(NavbarContext);
  const { setMenu, setLoginForm, setRegisterForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const { token, loadUser } = authContext;

  // ======= FUNCTIONS =======

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

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
              <Button component={Link} to='/help' color='inherit'>
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
              {/* <Fragment>
                <Box ml={3}>
                  <Button
                    component={Link}
                    to={'/profile'}
                    startIcon={<AccountCircleIcon />}
                    onClick={() => setRegisterForm(true)}
                    color='primary'
                    variant='contained'
                  >
                    Profile
                  </Button>
                </Box>
              </Fragment> */}
            </Fragment>
          ) : (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='primary'
              aria-label='menu'
              onClick={() => setMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <MobileMenu menuItems={menuItems} loggedIn={token ? true : false} />
      <Login />
      <Register />
    </div>
  );
};

export default Navbar;
