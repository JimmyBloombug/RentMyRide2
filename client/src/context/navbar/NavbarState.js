import React, { useReducer } from 'react';

import NavbarContext from './navbarContext';
import NavbarReducer from './navbarReducer';

import { SET_MENU } from '../types';

export const NavbarState = (props) => {
  const initialState = {
    menuOpen: false,
  };

  const [state, dispatch] = useReducer(NavbarReducer, initialState);

  // SET MENU
  const setMenu = (menuOpen) => {
    dispatch({
      type: SET_MENU,
      payload: menuOpen,
    });
  };

  return (
    <NavbarContext.Provider
      value={{
        menuOpen: state.menuOpen,
        setMenu,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};

export default NavbarState;
