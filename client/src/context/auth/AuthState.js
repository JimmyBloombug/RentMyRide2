import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SET_SHOW_PW, SET_USER_EXISTS, SET_SLIDE } from '../types';

export const AuthState = (props) => {
  const initialState = {
    loadingSlide: true,
    registerSlide: 1,
    userName: '',
    password: '',
    passwordRpt: '',
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    userExists: {},
    userNameErr: false,
    passwordErr: false,
    passwordRptErr: false,
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    streetErr: false,
    zipErr: false,
    cityErr: false,
    showPw: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // SET SHOW PASSWORD
  const setShowPw = (showPw) => {
    dispatch({
      type: SET_SHOW_PW,
      payload: showPw,
    });
  };

  // VALIDATE REGISTER
  const validateRegister = (type) => {
    dispatch({
      type: type,
    });
  };

  // Search Database
  const searchUser = async () => {
    try {
      const res = await axios.get('/server/users', {
        headers: {
          username: state.username,
          email: state.email,
        },
      });

      dispatch({ type: SET_USER_EXISTS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  // Set Slide
  const setSlide = () => {
    if (state.registerSlide === 1) {
      dispatch({
        type: SET_SLIDE,
        payload: state.registerSlide + 1,
      });
    } else if (state.registerSlide === 2) {
      dispatch({
        type: SET_SLIDE,
        payload: state.registerSlide - 1,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loadingSlide: state.loadingSlide,
        registerSlide: state.registerSlide,
        userName: state.userName,
        email: state.email,
        password: state.password,
        passwordRpt: state.passwordRpt,
        firstName: state.firstName,
        lastName: state.lastName,
        street: state.street,
        zip: state.zip,
        city: state.city,
        userExists: state.userExists,
        userNameErr: state.userNameErr,
        emailErr: state.emailErr,
        passwordErr: state.passwordErr,
        passwordRptErr: state.passwordRptErr,
        firstNameErr: state.firstNameErr,
        lastNameErr: state.lastNameErr,
        streetErr: state.streetErr,
        zipErr: state.zipErr,
        cityErr: state.cityErr,
        showPw: state.showPw,
        setShowPw,
        setValue,
        validateRegister,
        searchUser,
        setSlide,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
