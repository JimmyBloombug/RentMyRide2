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
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileInfoUser: {
    fontWeight: 600,
    fontSize: '1.1em',
  },
  profileLogout: {
    color: theme.palette.error.main,
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
          {authContext.isAuthenticated ? (
            <Fragment>
              <ListItem className={classes.profileInfo}>
                <ListItemIcon></ListItemIcon>
                Signed in as
                <span className={classes.profileInfoUser}>
                  {authContext.user !== null && authContext.user.username}
                </span>
              </ListItem>
              <Divider />
              <ListItem
                button
                component={Link}
                to='/profile'
                onClick={() => setMenu(false)}
              >
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
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>
              <ListItem
                button
                onClick={handleLogout}
                className={classes.profileLogout}
              >
                <ListItemIcon className={classes.profileLogout}>
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
  anchor: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

MobileMenu.defaultProps = {
  anchor: 'right',
};

export default MobileMenu;
