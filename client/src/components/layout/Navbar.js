import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <header>
      <nav>
        <Link className='title' to='/'>
          {title}
        </Link>
        <div className='navitems'>
          <Link className='navitem' to='/'>
            Home
          </Link>
          <Link className='navitem' to='/help'>
            Any Questions
          </Link>
          <Link className='navitem' to='/help'>
            Login
          </Link>
          <Link className='navitem ' to='/help'>
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Rent My Ride',
};

export default Navbar;
