import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

// Components
import MobileMenu from './MobileMenu';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

// Logo
import logoPath from '../../assets/logo/logo.svg';
import { red } from '@material-ui/core/colors';

// Define Style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    boxShadow: 'none',
    color: 'white',
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
    color: theme.palette.secondary.main,
  },
}));

// Menu Items
const menuItems = [
  { menuText: 'Login', key: 'login', href: 'login', icon: <VpnKeyIcon /> },
  {
    menuText: 'Register',
    key: 'register',
    href: 'register',
    icon: <DriveEtaIcon />,
  },
  { menuText: 'Search', key: 'search', href: 'search', icon: <SearchIcon /> },
  { menuText: 'How it works', key: 'help', href: 'help', icon: <HelpIcon /> },
  { menuText: 'About', key: 'about', href: 'about', icon: <InfoIcon /> },
];

const Navbar = ({ title }) => {
  // Menu Button
  const navbarContext = useContext(NavbarContext);
  const { setMenu } = navbarContext;

  // Theme
  const theme = useTheme();

  // MediaQueries
  let mdown = useMediaQuery(theme.breakpoints.up('md'));
  let xsup = useMediaQuery(theme.breakpoints.up('xs'));

  // Style
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='transparent' className={classes.navbar}>
        <Toolbar>
          <img
            src={logoPath}
            alt='rent-my-ride_logo'
            className={classes.logo}
          />
          <Typography variant='h6' className={`${classes.title} title`}>
            {mdown && (
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
              <Button component={Link} to='/search' color='inherit'>
                Search
              </Button>
              <Button component={Link} to='/about' color='inherit'>
                About
              </Button>
              <Button component={Link} to='/login' color='inherit'>
                Login
              </Button>
              <Box ml={3}>
                <Button
                  component={Link}
                  to='/register'
                  color='secondary'
                  variant='contained'
                >
                  List your car
                </Button>
              </Box>
            </Fragment>
          ) : (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => setMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <MobileMenu menuItems={menuItems} />
    </div>
  );
};

export default Navbar;
