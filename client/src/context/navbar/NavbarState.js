import React, { useReducer } from 'react';

import NavbarContext from './navbarContext';
import NavbarReducer from './navbarReducer';

import { SET_MENU, SET_LOGIN_FORM, SET_REGISTER_FORM } from '../types';

const NavbarState = (props) => {
  const initialState = {
    menuOpen: false,
    loginFormOpen: false,
    registerFormOpen: false,
  };

  const [state, dispatch] = useReducer(NavbarReducer, initialState);

  // SET MENU
  const setMenu = (menuOpen) => {
    dispatch({
      type: SET_MENU,
      payload: menuOpen,
    });
  };

  // SET LOGIN
  const setLoginForm = (loginFormOpen) => {
    dispatch({
      type: SET_LOGIN_FORM,
      payload: loginFormOpen,
    });
  };

  // SET REGISTER
  const setRegisterForm = (registerFormOpen) => {
    dispatch({
      type: SET_REGISTER_FORM,
      payload: registerFormOpen,
    });
  };

  return (
    <NavbarContext.Provider
      value={{
        menuOpen: state.menuOpen,
        loginFormOpen: state.loginFormOpen,
        registerFormOpen: state.registerFormOpen,
        setMenu,
        setLoginForm,
        setRegisterForm,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};

export default NavbarState;
