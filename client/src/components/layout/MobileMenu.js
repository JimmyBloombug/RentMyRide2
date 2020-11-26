import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import {
  Drawer,
  List,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

// Material Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';

// Define Style
const useStyles = makeStyles((theme) => ({
  menuCont: {
    marginRight: theme.spacing(5),
    width: '100%',
    height: '100%',
  },
  heading: {
    margin: theme.spacing(2, 2, 1),
  },
  spanTitle: {
    color: theme.palette.primary.main,
  },
}));

const MobileMenu = (props) => {
  // Style
  const classes = useStyles();

  // Context
  const navbarContext = useContext(NavbarContext);
  const { menuOpen, setMenu, setLoginForm, setRegisterForm } = navbarContext;
  const authContext = useContext(AuthContext);

  // Handle Click
  const handleLogout = () => {
    setMenu(false);
    authContext.logoutUser();
  };

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
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItem>
              <ListItem button onClick={() => setMenu(false)}>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary='Messages' />
              </ListItem>
              <ListItem
                button
                component={Link}
                to='/profile/cars'
                onClick={() => setMenu(false)}
              >
                <ListItemIcon>
                  <DriveEtaIcon />
                </ListItemIcon>
                <ListItemText primary='Your Cars' />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
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
