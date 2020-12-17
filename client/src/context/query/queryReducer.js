import {
  SET_LOCATION,
  SET_CHECK_IN,
  SET_CHECK_OUT,
  SET_RENTAL,
  SET_RENTALS,
  SET_CARS,
} from '../types';

const QueryReducer = (state, action) => {
  switch (action.type) {
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
    case SET_RENTAL:
      return {
        ...state,
        rental: action.payload,
      };
    case SET_RENTALS: {
      return {
        ...state,
        rentals: action.payload,
      };
    }
    case SET_CARS: {
      return {
        ...state,
        cars: action.payload,
      };
    }
    default:
      return;
  }
};

export default QueryReducer;
