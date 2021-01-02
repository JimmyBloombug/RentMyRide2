import React, { useReducer } from 'react';
import axios from 'axios';

import BookingContext from './bookingContext';
import BookingReducer from './bookingReducer';
import {
  SET_CHECK_IN_ERR,
  SET_CHECK_OUT_ERR,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
  CLEAR_VALUES,
  SET_LOADING,
} from '../types';

const BookingState = (props) => {
  const initialState = {
    checkIn: null,
    checkOut: null,
    checkInErr: false,
    checkOutErr: false,
    bookingModalOpen: false,
    server: {
      msg: '',
      errors: undefined,
    },
    loading: true,
  };

  const [state, dispatch] = useReducer(BookingReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // Validate Input
  const validateInput = async (input, type) => {
    if (input === null || input == 'Invalid Date') {
      dispatch({
        type: type,
      });
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  };

  // Booking
  const submitBooking = async (rental_id) => {
    let checkInValidated = await validateInput(state.checkIn, SET_CHECK_IN_ERR);
    let checkOutValidated = await validateInput(
      state.checkOut,
      SET_CHECK_OUT_ERR
    );

    if (checkInValidated && checkOutValidated) {
      try {
        // Data
        const formData = {
          rental_id: rental_id,
          checkIn: state.checkIn,
          checkOut: state.checkOut,
        };

        // config
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // set loading
        setValue(SET_LOADING);

        // add booking
        const res = await axios.post('server/bookings/user', formData, config);

        // console.log('in BookingState: ' + res.data);

        // booking success
        dispatch({
          type: BOOKING_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        // booking error
        console.log(error);
        dispatch({
          type: BOOKING_FAIL,
          payload: error.response.data,
        });
      }
    }
  };

  // clear
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        checkInErr: state.checkInErr,
        checkOutErr: state.checkOutErr,
        bookingModalOpen: state.bookingModalOpen,
        server: state.server,
        loading: state.loading,
        setValue,
        submitBooking,
        clearValues,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
