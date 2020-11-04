import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Components
import MobileMenu from './MobileMenu';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

// Logo
import logoPath from '../../assets/logo/logo.svg';

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
}));

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
            {mdown && <Link to='/'>{title}</Link>}
          </Typography>
          {xsup ? (
            <Fragment>
              <Button component={Link} to='/help' color='inherit'>
                Any Questions?
              </Button>
              <Button component={Link} to='/register' color='inherit'>
                Get started
              </Button>
              <Button component={Link} to='/login' color='inherit'>
                Login
              </Button>
              <Button component={Link} to='/about' color='inherit'>
                About
              </Button>
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
      <MobileMenu anchor='right' />
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Rent My Ride',
};

export default Navbar;
