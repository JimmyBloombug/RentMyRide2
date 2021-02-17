import React, { useReducer } from 'react';
import axios from 'axios';

import QueryContext from './queryContext';
import QueryReducer from './queryReducer';

import {
  SET_RENTALS,
  SET_RENTAL,
  SET_CARS,
  SET_OWNER,
  CLEAR_VALUES,
  SET_LOADING,
} from '../types';

const QueryState = (props) => {
  const initialState = {
    car: '',
    location: {},
    checkIn: null,
    checkOut: null,
    color: undefined,
    fuelType: undefined,
    // rental owner,
    owner: undefined,
    ownerErr: undefined,
    // rental
    rental: undefined,
    rentalErr: undefined,
    // rentals
    rentals: undefined,
    rentalsErr: undefined,
    // cars
    cars: undefined,
    carsErr: undefined,
    loading: true,
  };

  const [state, dispatch] = useReducer(QueryReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // Clear Values
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  // get rentals
  const getRentals = async (id, route = 'user', type = 'all', limit = 10) => {
    if (type === 'single') {
      // GET SINGLE ENTRY
      // set headers
      const config = {
        headers: {
          type: type,
          id: id,
        },
      };
      // server request
      const res = await axios.get(`server/rentals/${route}`, config);
      // set rental = server response
      dispatch({
        type: SET_RENTAL,
        payload: res.data,
      });
    } else if (type === 'search') {
      // set loading
      dispatch({
        type: SET_LOADING,
      });

      // GET QUERIED ENTRIES
      // set headers
      let location = '';
      let checkIn = '';
      let checkOut = '';
      let color = '';
      let fueltype = '';

      if (state.location.region !== undefined) {
        location = state.location.region;
      }
      if (state.checkIn !== null) {
        checkIn = state.checkIn;
      }
      if (state.checkOut !== null) {
        checkOut = state.checkOut;
      }
      if (state.color !== undefined) {
        color = state.color;
      }
      if (state.fuelType !== undefined) {
        fueltype = state.fueltype;
      }

      const config = {
        headers: {
          type,
          car: state.car,
          location,
          checkIn,
          checkOut,
          color,
          fueltype,
        },
      };

      console.log(config);

      // server request
      const res = await axios.get(`server/rentals/${route}`, config);
      // set rentals = server response
      dispatch({
        type: SET_RENTALS,
        payload: res.data,
      });
    } else {
      // GET MULTIPLE ENTRIES
      // set headers
      const config = {
        headers: {
          type: type,
          id: id,
          limit: limit,
        },
      };
      // server request
      const res = await axios.get(`server/rentals/${route}`, config);

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
        car: state.car,
        location: state.location,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        color: state.color,
        fuelType: state.fuelType,
        owner: state.owner,
        rental: state.rental,
        rentals: state.rentals,
        cars: state.cars,
        setValue,
        clearValues,
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
