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

// Material Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

// Const
import { makeColor } from '../../styles/themeConst';

const useStyles = makeStyles((theme) => ({
  menuCont: {
    marginRight: theme.spacing(5),
    width: '100%',
    height: '100%',
    backgroundColor: makeColor('1,1,1', '1'),
  },
  heading: {
    margin: theme.spacing(2, 2, 1),
  },
  spanTitle: {
    color: theme.palette.primary.main,
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
            RentMy<span className={classes.spanTitle}>Ride</span>
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
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
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
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary='Login' />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setMenu(false);
                  setRegisterForm(true);
                }}
              >
                <ListItemIcon>
                  <DriveEtaIcon />
                </ListItemIcon>
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
  loggedIn: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

MobileMenu.defaultProps = {
  loggedIn: false,
  anchor: 'right',
};

export default MobileMenu;
