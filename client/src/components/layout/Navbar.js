import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = ({ title }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleOnlick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <nav>
      <div className='title'>
        <Link to='/'>{title}</Link>
      </div>
      <Menu className='navbar' pointing secondary>
        <Menu.Item
          className='navlink'
          name='home'
          as={Link}
          to='/'
          active={activeItem === 'home'}
          onClick={handleOnlick}
        />
        <Menu.Item
          className='navlink'
          name='help'
          as={Link}
          to='/help'
          active={activeItem === 'help'}
          onClick={handleOnlick}
        />
        <Menu.Item
          className='navlink'
          name='about'
          as={Link}
          to='/about'
          active={activeItem === 'about'}
          onClick={handleOnlick}
        />
        <Menu.Item
          className='navlink'
          name='login'
          as={Link}
          to='/login'
          active={activeItem === 'login'}
          onClick={handleOnlick}
        />
        <Menu.Item
          className='navlink'
          name='get started'
          as={Link}
          to='/register'
          active={activeItem === 'get started'}
          onClick={handleOnlick}
        />
      </Menu>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Rent My Ride',
};

export default Navbar;
