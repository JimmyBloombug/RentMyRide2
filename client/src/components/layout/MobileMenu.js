import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
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
    backgroundColor: theme.palette.secondary.dark,
  },
  heading: {
    margin: theme.spacing(2, 2, 1),
  },
  headingSpan: {
    color: theme.palette.tertiary.light,
  },
}));

const MobileMenu = (props) => {
  // Context
  const navbarContext = useContext(NavbarContext);
  const { menuOpen, setMenu } = navbarContext;

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
