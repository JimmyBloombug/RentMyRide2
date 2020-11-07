import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SET_SHOW_PW } from '../types';

export const AuthState = (props) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    password: '',
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

  // CLEAR ERROR
  const clearError = (type) => {
    dispatch({
      type: type,
    });
  };

  // // REGISTER VALIDATION
  // const validateRegister = (type) => {
  //   switch (type) {
  //     case 'firstName':
  //       if (state.firstName === '') {
  //         dispatch({
  //           type: SET_FIRST_NAME_ERR,
  //         });
  //       }
  //     case 'lastName':
  //       if (state.lastName === '') {
  //         dispatch({
  //           type: SET_LAST_NAME_ERR,
  //         });
  //       }
  //     case 'email':
  //       if (state.email === '' || !state.email.match(emailReg)) {
  //         dispatch({
  //           type: SET_EMAIL_ERR,
  //         });
  //       }
  //     case 'street':
  //       if (state.street === '') {
  //         dispatch({
  //           type: SET_STREET_ERR,
  //         });
  //       }
  //     case 'zip':
  //       if (state.zip === '') {
  //         dispatch({
  //           type: SET_ZIP_ERR,
  //         });
  //       }
  //     case 'city':
  //       if (state.city === '') {
  //         dispatch({
  //           type: SET_CITY_ERR,
  //         });
  //       }

  //     default:
  //       return;
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        street: state.street,
        zip: state.zip,
        city: state.city,
        password: state.password,
        firstNameErr: state.firstNameErr,
        lastNameErr: state.lastNameErr,
        emailErr: state.emailErr,
        streetErr: state.streetErr,
        zipErr: state.zipErr,
        cityErr: state.cityErr,
        showPw: state.showPw,
        setShowPw,
        setValue,
        validateRegister,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
