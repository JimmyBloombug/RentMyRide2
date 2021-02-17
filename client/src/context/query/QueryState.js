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
    kmDriven: undefined,
    fuelType: undefined,
    seats: undefined,
    color: undefined,
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

  // Search
  const searchRentals = async () => {
    // set loading
    dispatch({
      type: SET_LOADING,
    });

    // GET QUERIED ENTRIES
    // set headers
    let location = '';
    let kmdriven = '';
    let fueltype = '';
    let color = '';
    let seats = '';

    if (state.location !== null) {
      if (state.location.region !== undefined) {
        location = state.location.region;
      }
    }
    if (state.kmDriven !== undefined) {
      kmdriven = state.kmDriven;
    }
    if (state.fuelType !== undefined) {
      fueltype = state.fuelType;
    }
    if (state.seats !== undefined) {
      seats = state.seats;
    }
    if (state.color !== undefined) {
      color = state.color;
    }

    const config = {
      headers: {
        car: state.car,
        location,
        kmdriven,
        fueltype,
        seats,
        color,
      },
    };

    // console.log(config);

    try {
      // server request
      const res = await axios.get(`server/rentals/search`, config);
      // set rentals = server response
      dispatch({
        type: SET_RENTALS,
        payload: res.data,
      });
    } catch (error) {}
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
        kmDriven: state.kmDriven,
        fuelType: state.fuelType,
        seats: state.seats,
        color: state.color,
        owner: state.owner,
        rental: state.rental,
        rentals: state.rentals,
        cars: state.cars,
        setValue,
        clearValues,
        getRentals,
        searchRentals,
        getCars,
        getOwner,
      }}
    >
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryState;
