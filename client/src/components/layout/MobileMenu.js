import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { Divider, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

const useStyles = makeStyles((theme) => ({
  menuCont: {
    marginRight: theme.spacing(5),
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.tertiary.light,
  },
  heading: {
    margin: theme.spacing(2, 2, 1),
  },
  headingSpan: {
    color: theme.palette.secondary.light,
  },
}));

const MobileMenu = (props) => {
  // Context
  const navbarContext = useContext(NavbarContext);
  const { menuOpen, setMenu, setLoginForm, setRegisterForm } = navbarContext;

  // Style
  const classes = useStyles();

  return (
    <Drawer
      anchor={props.anchor}
      open={menuOpen}
      onClose={() => setMenu(false)}
      variant='temporary'
    >
      <div className={classes.menuCont}>
        <div className={classes.heading}>
          <Typography variant='h6'>
            RentMy<span className={classes.headingSpan}>Ride</span>
          </Typography>
        </div>
        <List>
          {props.loggedIn ? (
            <Fragment>
              <ListItem
                button
                component={Link}
                to={'/profile'}
                onClick={() => {
                  setMenu(false);
                  setLoginForm(true);
                }}
              >
                <ListItemIcon>{props.icons.profileIcon}</ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
            </Fragment>
          ) : (
            <Fragment>
              <ListItem
                button
                onClick={() => {
                  setMenu(false);
                  setLoginForm(true);
                }}
              >
                <ListItemIcon>{props.loginIcon}</ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setMenu(false);
                  setRegisterForm(true);
                }}
              >
                <ListItemIcon>{props.registerIcon}</ListItemIcon>
                <ListItemText primary='Register' />
              </ListItem>
            </Fragment>
          )}
        </List>
        <Divider />
        <List>
          {props.menuItems.map((item) => {
            return (
              <ListItem
                button
                component={Link}
                to={item.href}
                key={item.key}
                onClick={() => setMenu(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.menuText} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

MobileMenu.propTypes = {
  icons: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

MobileMenu.defaultProps = {
  loggedIn: false,
  anchor: 'right',
};

export default MobileMenu;
