import {
  SET_CAR,
  SET_LOCATION,
  SET_CHECK_IN,
  SET_CHECK_OUT,
  SET_RENTAL,
  SET_RENTALS,
  SET_CARS,
  SET_OWNER,
  CLEAR_VALUES,
  SET_KM_DRIVEN,
  SET_FUELTYPE,
  SET_SEATS,
  SET_COLOR,
  SET_LOADING,
} from '../types';

const QueryReducer = (state, action) => {
  switch (action.type) {
    case SET_CAR: {
      return {
        ...state,
        car: action.payload,
      };
    }
    // open menu
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_CHECK_IN:
      return {
        ...state,
        checkIn: action.payload,
      };
    case SET_CHECK_OUT:
      return {
        ...state,
        checkOut: action.payload,
      };
    case SET_OWNER:
      return {
        ...state,
        owner: action.payload,
      };
    case SET_KM_DRIVEN:
      return {
        ...state,
        kmDriven: action.payload !== null ? action.payload.km : undefined,
      };
    case SET_FUELTYPE:
      return {
        ...state,
        fuelType: action.payload !== null ? action.payload.type : undefined,
      };
    case SET_SEATS:
      return {
        ...state,
        seats: action.payload !== null ? action.payload.num : undefined,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload !== null ? action.payload.color : undefined,
      };
    case SET_RENTAL:
      return {
        ...state,
        rental: action.payload,
      };
    case SET_RENTALS: {
      return {
        ...state,
        rentals: action.payload,
        loading: true,
      };
    }
    case SET_CARS: {
      return {
        ...state,
        cars: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case CLEAR_VALUES: {
      return {
        ...state,
        rental: undefined,
        rentals: undefined,
        owner: undefined,
      };
    }
    default:
      return;
  }
};

export default QueryReducer;
