import {
  SET_USER_ID,
  SET_MODAL,
  SET_LOCATION,
  SET_BRAND,
  SET_MODEL,
  SET_YEAR,
  SET_KM_DRIVEN,
  SET_FUELTYPE,
  SET_SEATS,
  SET_COLOR,
  SET_PICTURES,
  SET_BRAND_ERR,
  SET_MODEL_ERR,
  SET_YEAR_ERR,
  SET_KM_DRIVEN_ERR,
  SET_FUELTYPE_ERR,
  SET_SEATS_ERR,
  SET_COLOR_ERR,
  SET_LOADING,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RESET_FORM,
  SET_CAR,
  SET_PRICE,
  SET_BILLING,
  SET_LOCATION_ERR,
  SET_CAR_ERR,
  SET_PRICE_ERR,
  SET_BILLING_ERR,
} from '../types';

const ProfileReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    ///////// RENTAL FORM /////////
    case SET_CAR:
      return {
        ...state,
        car: action.payload,
        carErr: false,
      };
    case SET_PRICE:
      return {
        ...state,
        price: action.payload,
        priceErr: false,
      };
    case SET_BILLING:
      return {
        ...state,
        billing: action.payload,
        billingErr: false,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
        locationErr: false,
      };
    case SET_CAR_ERR:
      return {
        ...state,
        carErr: true,
      };
    case SET_PRICE_ERR:
      return {
        ...state,
        priceErr: true,
      };
    case SET_BILLING_ERR:
      return {
        ...state,
        billingErr: true,
      };
    case SET_LOCATION_ERR:
      return {
        ...state,
        locationErr: true,
      };
    //////// CAR FORM /////////
    case SET_BRAND:
      return {
        ...state,
        brand:
          action.payload !== null
            ? action.payload.label.charAt(0).toUpperCase() +
              action.payload.label.slice(1)
            : undefined,
        brandErr: false,
      };
    case SET_MODEL:
      return {
        ...state,
        model: action.payload,
        modelErr: false,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.payload !== null ? action.payload.label : undefined,
        yearErr: false,
      };
    case SET_KM_DRIVEN:
      return {
        ...state,
        kmDriven: action.payload !== null ? action.payload.km : undefined,
        kmDrivenErr: false,
      };
    case SET_FUELTYPE:
      return {
        ...state,
        fuelType: action.payload !== null ? action.payload.type : undefined,
        fuelTypeErr: false,
      };
    case SET_SEATS:
      return {
        ...state,
        seats: action.payload !== null ? action.payload.num : undefined,
        seatsErr: false,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload !== null ? action.payload.color : undefined,
        colorErr: false,
      };
    case SET_PICTURES:
      return {
        ...state,
        pictures: action.payload,
        pictureErr: false,
      };
    case SET_BRAND_ERR:
      return {
        ...state,
        brandErr: true,
      };
    case SET_MODEL_ERR:
      return {
        ...state,
        modelErr: true,
      };
    case SET_YEAR_ERR:
      return {
        ...state,
        yearErr: true,
      };
    case SET_KM_DRIVEN_ERR:
      return {
        ...state,
        kmDrivenErr: true,
      };
    case SET_FUELTYPE_ERR:
      return {
        ...state,
        fuelTypeErr: true,
      };
    case SET_SEATS_ERR:
      return {
        ...state,
        seatsErr: true,
      };
    case SET_COLOR_ERR:
      return {
        ...state,
        colorErr: true,
      };
    /////////// SERVER //////////
    case SET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case UPLOAD_SUCCESS: {
      return {
        ...state,
        loading: true,
        server: action.payload,
      };
    }
    case UPLOAD_FAIL: {
      return {
        ...state,
        server: action.payload,
        loading: true,
      };
    }
    case RESET_FORM: {
      return {
        ...state,
        car: undefined,
        price: '',
        billing: '',
        location: undefined,
        carErr: false,
        priceErr: false,
        billingErr: false,
        locationErr: false,
        brand: undefined,
        model: '',
        year: undefined,
        kmDriven: undefined,
        fuelType: undefined,
        seats: undefined,
        color: undefined,
        pictures: [],
        brandErr: false,
        modelErr: false,
        yearErr: false,
        kmDrivenErr: false,
        fuelTypeErr: false,
        seatsErr: false,
        colorErr: false,
        server: {
          msg: '',
          errors: undefined,
        },
      };
    }
    default:
      return;
  }
};

export default ProfileReducer;
