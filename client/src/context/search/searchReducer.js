import { SET_LOCATION, SET_CHECK_IN, SET_CHECK_OUT } from '../types';

const SearchReducer = (state, action) => {
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
    default:
      return;
  }
};

export default SearchReducer;
