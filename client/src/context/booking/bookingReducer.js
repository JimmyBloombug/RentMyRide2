import {
  SET_CHECK_IN,
  SET_CHECK_IN_ERR,
  SET_CHECK_OUT,
  SET_CHECK_OUT_ERR,
  CLEAR_VALUES,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
  SET_MODAL,
  SET_LOADING,
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
    case SET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case BOOKING_SUCCESS: {
      // console.log('in BookingReducer Booking_Success: ' + action.payload);
      return {
        ...state,
        loading: true,
        bookingModalOpen: true,
        server: action.payload,
      };
    }
    case BOOKING_FAIL: {
      // console.log('in BookingReducer Booking_Fail: ' + action.payload);
      return {
        ...state,
        loading: true,
        bookingModalOpen: true,
        server: action.payload,
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        bookingModalOpen: false,
        server: {
          msg: '',
          errors: undefined,
        },
      };
    }
    case CLEAR_VALUES: {
      return {
        ...state,
        checkIn: null,
        checkOut: null,
        checkInErr: false,
        checkOutErr: false,
        bookingModalOpen: false,
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
