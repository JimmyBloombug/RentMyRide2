import {
  SET_CHECK_IN,
  SET_CHECK_IN_ERR,
  SET_CHECK_OUT,
  SET_CHECK_OUT_ERR,
  CLEAR_VALUES,
} from '../types';

const BookingReducer = (state, action) => {
  switch (action.type) {
    case SET_CHECK_IN:
      return {
        ...state,
        checkIn: action.payload,
        checkInErr: false,
      };
    case SET_CHECK_OUT:
      return {
        ...state,
        checkOut: action.payload,
        checkOutErr: false,
      };
    case SET_CHECK_IN_ERR: {
      return {
        ...state,
        checkInErr: true,
      };
    }
    case SET_CHECK_OUT_ERR: {
      return {
        ...state,
        checkOutErr: true,
      };
    }
    case CLEAR_VALUES: {
      return {
        ...state,
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

export default BookingReducer;
