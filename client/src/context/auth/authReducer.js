import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_STREET,
  SET_ZIP,
  SET_CITY,
  SET_PASSWORD,
  SET_SHOW_PW,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_EMAIL_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
  CLEAR_FIRST_NAME_ERR,
  CLEAR_LAST_NAME_ERR,
  CLEAR_EMAIL_ERR,
  CLEAR_STREET_ERR,
  CLEAR_ZIP_ERR,
  CLEAR_CITY_ERR,
} from '../types';

// EMAIL REGEX
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NavbarReducer = (state, action) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_STREET:
      return {
        ...state,
        street: action.payload,
      };
    case SET_ZIP:
      return {
        ...state,
        zip: action.payload,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SET_SHOW_PW:
      return {
        ...state,
        showPw: action.payload,
      };
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
    case SET_EMAIL_ERR:
      if (state.email === '' || !state.email.match(emailReg)) {
        console.log(state.email);
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
    case CLEAR_FIRST_NAME_ERR:
      return {
        ...state,
        firstNameErr: false,
      };
    case CLEAR_LAST_NAME_ERR:
      return {
        ...state,
        lastNameErr: false,
      };
    case CLEAR_EMAIL_ERR:
      return {
        ...state,
        emailErr: false,
      };
    case CLEAR_STREET_ERR:
      return {
        ...state,
        streetErr: false,
      };
    case CLEAR_ZIP_ERR:
      return {
        ...state,
        zipErr: false,
      };
    case CLEAR_CITY_ERR:
      return {
        ...state,
        cityErr: false,
      };
    default:
      return;
  }
};

export default NavbarReducer;
