import { SET_CHECK_IN, SET_CHECK_OUT } from '../types';

const BookingReducer = (state, action) => {
  switch (action.type) {
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

export default BookingReducer;
