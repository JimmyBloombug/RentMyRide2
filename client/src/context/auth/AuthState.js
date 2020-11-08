import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  SET_SHOW_PW,
  SET_USER_EXISTS,
  SET_SLIDE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';

export const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loadingSlide: true,
    loadingRegister: true,
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
    authErr: null,
    showPw: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // Set Password Show
  const setShowPw = (showPw) => {
    dispatch({
      type: SET_SHOW_PW,
      payload: showPw,
    });
  };

  // Validate Register
  const validateRegister = (type) => {
    dispatch({
      type: type,
    });
  };

  // Search Database
  const searchUser = async () => {
    try {
      // search user
      const res = await axios.get('/server/users', {
        headers: {
          username: state.username,
          email: state.email,
        },
      });

      dispatch({ type: SET_USER_EXISTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
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

  // Register User
  const registerUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = {
      username: state.userName,
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      street: state.street,
      zip: state.zip,
      city: state.city,
    };

    try {
      // register user
      const res = await axios.post('/server/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loadingSlide: state.loadingSlide,
        loadingRegister: state.loadingRegister,
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
        authErr: state.authErr,
        showPw: state.showPw,
        setShowPw,
        setValue,
        validateRegister,
        searchUser,
        setSlide,
        registerUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
