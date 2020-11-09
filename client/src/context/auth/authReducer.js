import {
  SET_USERNAME,
  SET_EMAIL,
  SET_PW,
  SET_PW_RPT,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_STREET,
  SET_ZIP,
  SET_CITY,
  SET_SHOW_PW,
  SET_USERNAME_ERR,
  SET_EMAIL_ERR,
  SET_PW_ERR,
  SET_PW_RPT_ERR,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_SUCCESS,
  USER_FAIL,
  SET_SLIDE,
} from '../types';

// REGEX
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.payload,
        userNameErr: false,
        userExists: {
          ...state.userExists,
          takenName: '',
        },
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
        emailErr: false,
        userExists: {
          ...state.userExists,
          takenEmail: '',
        },
      };
    case SET_PW:
      return {
        ...state,
        password: action.payload,
        passwordErr: false,
      };
    case SET_PW_RPT:
      return {
        ...state,
        passwordRpt: action.payload,
        passwordRptErr: false,
      };
    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
        firstNameErr: false,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
        lastNameErr: false,
      };
    case SET_STREET:
      return {
        ...state,
        street: action.payload,
        streetErr: false,
      };
    case SET_ZIP:
      return {
        ...state,
        zip: action.payload,
        zipErr: false,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
        cityErr: false,
      };
    case SET_SHOW_PW:
      return {
        ...state,
        showPw: action.payload,
      };
    case SET_USERNAME_ERR:
      if (state.userName === '') {
        return {
          ...state,
          userNameErr: true,
        };
      } else {
        return {
          ...state,
          userNameErr: false,
        };
      }
    case SET_EMAIL_ERR:
      if (state.email === '' || !state.email.match(emailReg)) {
        return {
          ...state,
          emailErr: true,
        };
      } else {
        return {
          ...state,
          emailErr: false,
        };
      }
    case SET_PW_ERR:
      if (state.password === '' || !state.password.match(passwordReg)) {
        return {
          ...state,
          passwordErr: true,
        };
      } else {
        return {
          ...state,
          passwordErr: false,
        };
      }
    case SET_PW_RPT_ERR:
      if (state.passwordRpt === '' || state.passwordRpt !== state.password) {
        return {
          ...state,
          passwordRptErr: true,
        };
      } else {
        return {
          ...state,
          passwordRptErr: false,
        };
      }
    case SET_FIRST_NAME_ERR:
      if (state.firstName === '') {
        return {
          ...state,
          firstNameErr: true,
        };
      } else {
        return {
          ...state,
          firstNameErr: false,
        };
      }
    case SET_LAST_NAME_ERR:
      if (state.lastName === '') {
        return {
          ...state,
          lastNameErr: true,
        };
      } else {
        return {
          ...state,
          lastNameErr: false,
        };
      }
    case SET_STREET_ERR:
      if (state.street === '') {
        return {
          ...state,
          streetErr: true,
        };
      } else {
        return {
          ...state,
          streetErr: false,
        };
      }
    case SET_ZIP_ERR:
      if (state.zip === '' || isNaN(state.zip)) {
        return {
          ...state,
          zipErr: true,
        };
      } else {
        return {
          ...state,
          zipErr: false,
        };
      }
    case SET_CITY_ERR:
      if (state.city === '') {
        return {
          ...state,
          cityErr: true,
        };
      } else {
        return {
          ...state,
          cityErr: false,
        };
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        userExists: { takenName: '', takenEmail: '' },
        firstName: '',
        userName: '',
        password: '',
        passwordRpt: '',
        lastName: '',
        email: '',
        street: '',
        zip: '',
        city: '',
        registerSlide: 1,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerErr: action.payload,
      };
    case USER_SUCCESS:
      return {
        ...state,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
        loading:
          !state.userNameErr &&
          !state.emailErr &&
          !state.passwordErr &&
          !state.passwordRptErr
            ? false
            : true,
      };
    case USER_FAIL:
      return {
        ...state,
        userExists: action.payload,
      };
    case SET_SLIDE:
      return {
        ...state,
        registerSlide: action.payload,
        loading: true,
      };
    default:
      return;
  }
};

export default AuthReducer;
