import React, { useReducer } from 'react';
import axios from 'axios';

import BookingContext from './bookingContext';
import BookingReducer from './bookingReducer';

const BookingState = (props) => {
  const initialState = {
    checkIn: null,
    checkOut: null,
    server: {
      msg: '',
      errors: undefined,
    },
  };

  const [state, dispatch] = useReducer(BookingReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        server: state.server,
        setValue,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
