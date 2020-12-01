import React, { useReducer } from 'react';
import axios from 'axios';

// Components
import setAuthToken from '../../utils/setAuthToken';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  SET_SHOW_PW,
  SET_SLIDE,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  SET_PW_RPT_ERR,
  SET_PW_ERR,
  SET_USERNAME_ERR,
  SET_EMAIL_ERR,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_COUNTRY_ERR,
  SET_NUM_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
  RESET_REGISTER,
} from '../types';

// REGEX
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true,
    registerSlide: 1,
    userName: '',
    password: '',
    passwordRpt: '',
    firstName: '',
    lastName: '',
    country: null,
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
    countryErr: false,
    numberErr: false,
    emailErr: false,
    streetErr: false,
    zipErr: false,
    cityErr: false,
    serverErr: undefined,
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

  // ====== REGISTRATION =======

  // Set Password Show
  const setShowPw = (showPw) => {
    dispatch({
      type: SET_SHOW_PW,
      payload: showPw,
    });
  };

  // Validate Username
  const validateUsername = () => {
    if (state.userName === '') {
      dispatch({
        type: SET_USERNAME_ERR,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: SET_USERNAME_ERR,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  // Validate Email
  const validateEmail = () => {
    if (state.email === '' || !state.email.match(emailReg)) {
      dispatch({
        type: SET_EMAIL_ERR,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: SET_EMAIL_ERR,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  // Validate Password
  const validatePassword = () => {
    if (state.password === '' || !state.password.match(passwordReg)) {
      dispatch({
        type: SET_PW_ERR,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: SET_PW_ERR,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  // Validate Password Rpt
  const validatePasswordRpt = () => {
    if (state.passwordRpt === '' || state.passwordRpt !== state.password) {
      dispatch({
        type: SET_PW_RPT_ERR,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: SET_PW_RPT_ERR,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  const validateCountry = () => {
    if (state.country === undefined || state.country === null) {
      dispatch({
        type: SET_COUNTRY_ERR,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: SET_COUNTRY_ERR,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  // Validate Input Lenght
  const validateInput = (input, type) => {
    if (input === '') {
      dispatch({
        type: type,
        payload: true,
      });
      return Promise.resolve(true);
    } else {
      dispatch({
        type: type,
        payload: false,
      });
      return Promise.resolve(false);
    }
  };

  // Search Database for User
  const searchUser = async () => {
    // get config
    const config = {
      headers: {
        username: state.userName,
        email: state.email,
      },
    };

    try {
      // search user
      await axios.get('/server/users', config);
      dispatch({ type: USER_SUCCESS });
      return false;
    } catch (error) {
      dispatch({
        type: USER_FAIL,
        payload: error.response.data,
      });
      return true;
    }
  };

  const validateFirstSlide = async () => {
    // validate
    const userNameValidated = await validateUsername();
    const emailValidated = await validateEmail();
    const passwordValidated = await validatePassword();
    const passwordRptValidated = await validatePasswordRpt();
    const searchUserValidated = await searchUser();

    if (
      !userNameValidated &&
      !emailValidated &&
      !passwordValidated &&
      !passwordRptValidated &&
      !searchUserValidated
    ) {
      // Set is loading
      setValue(SET_LOADING);
    }
  };

  // Register User
  const registerUser = async () => {
    // validate
    const firstNameValidated = await validateInput(
      state.firstName,
      SET_FIRST_NAME_ERR
    );
    const lastNameValidated = await validateInput(
      state.lastName,
      SET_LAST_NAME_ERR
    );
    const countryValidated = await validateCountry();
    const numberValidated = await validateInput(state.number, SET_NUM_ERR);
    const streetValidated = await validateInput(state.street, SET_STREET_ERR);
    const zipValidated = await validateInput(state.zip, SET_ZIP_ERR);
    const cityValidated = await validateInput(state.city, SET_CITY_ERR);

    // if no errors POST
    if (
      !firstNameValidated &&
      !lastNameValidated &&
      !countryValidated &&
      !numberValidated &&
      !streetValidated &&
      !zipValidated &&
      !cityValidated
    ) {
      // Post config
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // User data
      const formData = {
        username: state.userName,
        email: state.email,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        country: state.country,
        number: state.number,
        street: state.street,
        zip: state.zip,
        city: state.city,
      };

      // Set loading
      setValue(SET_LOADING);

      try {
        // register user
        const res = await axios.post('/server/users', formData, config);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.token,
        });

        loadUser();
      } catch (error) {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.errors,
        });
      }
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
        },
      });
    }
  };

  // Reset Register
  const resetRegister = () => {
    dispatch({ type: RESET_REGISTER });
  };

  // ======= LOGIN ========

  // Login user
  const loginUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = {
      email: state.email,
      password: state.password,
    };

    // Set loading
    setValue(SET_LOADING);

    try {
      const res = await axios.post('/server/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });

      loadUser();
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

  // ======= LOGOUT =======
  const logoutUser = () => dispatch({ type: LOGOUT });

  // ======= LOAD USER =======

  const loadUser = async () => {
    // set auth token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // // Set loading
    setValue(SET_LOADING);

    try {
      const res = await axios.get('/server/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        registerSlide: state.registerSlide,
        userName: state.userName,
        email: state.email,
        password: state.password,
        passwordRpt: state.passwordRpt,
        firstName: state.firstName,
        lastName: state.lastName,
        country: state.country,
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
        countryErr: state.countryErr,
        numberErr: state.numberErr,
        streetErr: state.streetErr,
        zipErr: state.zipErr,
        cityErr: state.cityErr,
        serverErr: state.serverErr,
        showPw: state.showPw,
        setShowPw,
        setValue,
        searchUser,
        registerUser,
        loginUser,
        logoutUser,
        loadUser,
        validateUsername,
        validatePassword,
        validatePasswordRpt,
        validateEmail,
        validateInput,
        validateCountry,
        validateFirstSlide,
        setSlide,
        resetRegister,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
