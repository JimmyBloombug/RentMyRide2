import {
  SET_USER_ID,
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
  RESET_CAR_FORM,
} from '../types';

const CarReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };
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
        // state.pictures !== undefined
        //   ? [...state.pictures, action.payload]
        //   : [action.payload],
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
    case SET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case UPLOAD_SUCCESS: {
      return {
        ...state,
        server: action.payload,
        loading: true,
      };
    }
    case UPLOAD_FAIL: {
      return {
        ...state,
        server: action.payload,
        loading: true,
      };
    }
    case RESET_CAR_FORM: {
      return {
        ...state,
      };
    }
    default:
      return;
  }
};

export default CarReducer;
