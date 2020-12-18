import React, { useReducer } from 'react';
import axios from 'axios';

import QueryContext from './queryContext';
import QuueryReducer from './queryReducer';

import { SET_RENTALS, SET_RENTAL, SET_CARS, SET_OWNER } from '../types';

const QueryState = (props) => {
  const initialState = {
    location: {},
    checkIn: null,
    checkOut: null,
    // rental owner,
    owner: undefined,
    // rental
    rental: undefined,
    // rentals
    rentals: undefined,
    // cars
    cars: undefined,
  };

  const [state, dispatch] = useReducer(QuueryReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // get rentals
  const getRentals = async (id, which = 'user', type = 'all', limit = 10) => {
    // set headers
    if (type === 'single') {
      // set headers
      const config = {
        headers: {
          type: type,
          id: id,
        },
      };
      // server request
      const res = await axios.get(`server/rentals/${which}`, config);
      // set rental = server response
      dispatch({
        type: SET_RENTAL,
        payload: res.data,
      });
    } else {
      // set headers
      const config = {
        headers: {
          type: type,
          id: id,
        },
      };
      // server request
      const res = await axios.get(`server/rentals/${which}`, config);
      console.log(res);
      // set rentals = server response
      dispatch({
        type: SET_RENTALS,
        payload: res.data,
      });
    }
  };

  // Get Cars
  const getCars = async () => {
    // server request
    const res = await axios.get('server/cars/user');

    // set cars = server response
    dispatch({
      type: SET_CARS,
      payload: res.data,
    });
  };

  // Get User
  const getOwner = async (user_id) => {
    const config = {
      headers: {
        user_id: user_id,
      },
    };
    // server request
    const res = await axios.get('server/users/public', config);

    dispatch({
      type: SET_OWNER,
      payload: res.data,
    });
  };

  return (
    <QueryContext.Provider
      value={{
        location: state.location,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        owner: state.owner,
        rental: state.rental,
        rentals: state.rentals,
        cars: state.cars,
        setValue,
        getRentals,
        getCars,
        getOwner,
      }}
    >
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryState;
