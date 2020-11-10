import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  SET_SHOW_PW,
  SET_SLIDE,
  USER_SUCCESS,
  USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  SET_PW_RPT_ERR,
  SET_PW_ERR,
  SET_USERNAME_ERR,
  SET_EMAIL_ERR,
} from '../types';

export const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    registerStage: 2,
    registerSlide: 2,
    userName: '',
    password: '',
    passwordRpt: '',
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    userExists: {
      takenName: '',
      takenEmail: '',
    },
    userNameErr: false,
    passwordErr: false,
    passwordRptErr: false,
    firstNameErr: false,
    lastNameErr: false,
    numberErr: false,
    emailErr: false,
    streetErr: false,
    zipErr: false,
    cityErr: false,
    registerErr: '',
    showPw: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Set Value
  const setValue = (type, data = undefined) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // ====== REGISTRATION =======

  // Set Password Show
  const setShowPw = (showPw) => {
    dispatch({
      type: SET_SHOW_PW,
      payload: showPw,
    });
  };

  // Validate Register
  const validateRegister = (type) => {
    console.log(type);
    dispatch({
      type: type,
    });
  };

  // Search Database
  const searchUser = async () => {
    let config = {
      headers: {
        username: state.userName,
        email: state.email,
      },
    };

    // Set is loading
    setValue(SET_LOADING);

    // validate all
    validateRegister(SET_USERNAME_ERR);
    validateRegister(SET_EMAIL_ERR);
    validateRegister(SET_PW_ERR);
    validateRegister(SET_PW_RPT_ERR);

    try {
      // search user
      await axios.get('/server/users', config);
      dispatch({ type: USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Set Slide
  const setSlide = (type) => {
    if (type === 'next') {
      dispatch({
        type: SET_SLIDE,
        payload: { type: 'next', slide: state.registerSlide + 1 },
      });
    } else {
      dispatch({
        type: SET_SLIDE,
        payload: {
          type: 'back',
          slide: state.registerSlide - 1,
          stage: state.registerStage - 1,
        },
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
      console.log(error.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // ======= LOGIN ========
  // TODO

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        registerStage: state.registerStage,
        registerSlide: state.registerSlide,
        userName: state.userName,
        email: state.email,
        password: state.password,
        passwordRpt: state.passwordRpt,
        firstName: state.firstName,
        lastName: state.lastName,
        number: state.number,
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
        numberErr: state.numberErr,
        streetErr: state.streetErr,
        zipErr: state.zipErr,
        cityErr: state.cityErr,
        registerErr: state.registerErr,
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
