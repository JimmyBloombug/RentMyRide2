import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import HelpIcon from '@material-ui/icons/Help';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

const MobileMenu = (props) => {
  const navbarContext = useContext(NavbarContext);
  const { menuOpen, setMenu } = navbarContext;

  return (
    <div>
      <Drawer
        anchor={props.anchor}
        open={menuOpen}
        onClose={() => setMenu(false)}
        variant='temporary'
      >
        <List>
          {props.menuItems.map((item) => {
            return (
              <ListItem button key={item.value}>
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText primary={item.menuText} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

MobileMenu.propTypes = {
  anchor: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
};

MobileMenu.defaultProps = {
  anchor: 'bottom',
  menuItems: [
    { menuText: 'Login', value: 'login', icon: <VpnKeyIcon /> },
    { menuText: 'Get Started', value: 'register', icon: <DriveEtaIcon /> },
    { menuText: 'Any Questions', value: 'help', icon: <HelpIcon /> },
    { menuText: 'About', value: 'about', icon: <InfoIcon /> },
  ],
};

export default MobileMenu;
