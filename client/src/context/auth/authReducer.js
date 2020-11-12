import {
  SET_USERNAME,
  SET_EMAIL,
  SET_PW,
  SET_PW_RPT,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_NUM,
  SET_STREET,
  SET_COUNTRY,
  SET_ZIP,
  SET_CITY,
  SET_SHOW_PW,
  SET_USERNAME_ERR,
  SET_EMAIL_ERR,
  SET_PW_ERR,
  SET_PW_RPT_ERR,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_COUNTRY_ERR,
  SET_NUM_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SET_SLIDE,
  SET_LOADING,
  RESET_REGISTER,
} from '../types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        registerStage: 1,
        userName: action.payload,
        userNameErr: false,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
      };
    case SET_EMAIL:
      return {
        ...state,
        registerStage: 1,
        email: action.payload,
        emailErr: false,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
      };
    case SET_PW:
      return {
        ...state,
        registerStage: 1,
        password: action.payload,
        passwordErr: false,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
      };
    case SET_PW_RPT:
      return {
        ...state,
        registerStage: 1,
        passwordRpt: action.payload,
        passwordRptErr: false,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
      };
    case SET_FIRST_NAME:
      return {
        ...state,
        registerStage: 2,
        firstName: action.payload,
        firstNameErr: false,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        registerStage: 2,
        lastName: action.payload,
        lastNameErr: false,
      };
    case SET_COUNTRY:
      return {
        ...state,
        registerStage: 2,
        country: action.payload,
        countryErr: false,
      };
    case SET_NUM:
      return {
        ...state,
        registerStage: 2,
        number: action.payload,
        numberErr: false,
      };
    case SET_STREET:
      return {
        ...state,
        registerStage: 2,
        street: action.payload,
        streetErr: false,
      };
    case SET_ZIP:
      return {
        ...state,
        registerStage: 2,
        zip: action.payload,
        zipErr: false,
      };
    case SET_CITY:
      return {
        ...state,
        registerStage: 2,
        city: action.payload,
        cityErr: false,
      };
    case SET_SHOW_PW:
      return {
        ...state,
        showPw: action.payload,
      };
    case SET_USERNAME_ERR:
      return {
        ...state,
        userNameErr: action.payload,
      };
    case SET_EMAIL_ERR:
      return {
        ...state,
        emailErr: action.payload,
      };
    case SET_PW_ERR:
      return {
        ...state,
        passwordErr: action.payload,
      };
    case SET_PW_RPT_ERR:
      return {
        ...state,
        passwordRptErr: action.payload,
      };
    case SET_FIRST_NAME_ERR:
      return {
        ...state,
        firstNameErr: action.payload,
      };
    case SET_LAST_NAME_ERR:
      return {
        ...state,
        lastNameErr: action.payload,
      };
    case SET_COUNTRY_ERR:
      return {
        ...state,
        countryErr: action.payload,
      };
    case SET_NUM_ERR:
      return {
        ...state,
        numberErr: action.payload,
      };
    case SET_STREET_ERR:
      return {
        ...state,
        streetErr: action.payload,
      };
    case SET_ZIP_ERR:
      return {
        ...state,
        zipErr: action.payload,
      };
    case SET_CITY_ERR:
      return {
        ...state,
        cityErr: action.payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        serverErr: null,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: true,
        serverErr: action.payload,
      };
    case USER_SUCCESS:
      return {
        ...state,
        userExists: {
          takenName: '',
          takenEmail: '',
        },
        loading: true,
      };
    case USER_FAIL:
      return {
        ...state,
        userExists: action.payload,
        loading: true,
      };
    case SET_SLIDE:
      if (action.payload.type === 'next') {
        return {
          ...state,
          loading: true,
          registerSlide: action.payload.slide,
        };
      } else {
        return {
          ...state,
          registerSlide: action.payload.slide,
          registerFail: null,
        };
      }
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };
    case RESET_REGISTER:
      return {
        ...state,
        firstName: '',
        userName: '',
        password: '',
        passwordRpt: '',
        lastName: '',
        email: '',
        country: null,
        number: '',
        street: '',
        zip: '',
        city: '',
        userNameErr: '',
        emaiErr: '',
        passwordErr: '',
        passwordRptErr: '',
        firstNameErr: '',
        lastNameErr: '',
        countryErr: '',
        numberErr: '',
        streetErr: '',
        zipErr: '',
        cityErr: '',
        userExists: { takenName: '', takenEmail: '' },
        serverErr: null,
        registerSlide: 1,
      };
    default:
      return;
  }
};

export default AuthReducer;
