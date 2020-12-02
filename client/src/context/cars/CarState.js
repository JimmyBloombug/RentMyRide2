import React, { useReducer } from 'react';
import axios from 'axios';

import CarContext from './carContext';
import CarReducer from './carReducer';

import {
  SET_BRAND_ERR,
  SET_MODEL_ERR,
  SET_YEAR_ERR,
  SET_KM_DRIVEN_ERR,
  SET_FUELTYPE_ERR,
  SET_SEATS_ERR,
  SET_COLOR_ERR,
  SET_PICTURES_ERR,
  SET_PICTURES,
} from '../types';

const CarState = (props) => {
  const initialState = {
    brand: undefined,
    model: '',
    year: undefined,
    kmDriven: undefined,
    fuelType: undefined,
    seats: undefined,
    color: {},
    pictures: [],
    brandErr: false,
    modelErr: false,
    yearErr: false,
    kmDrivenErr: false,
    fuelTypeErr: false,
    seatsErr: false,
    colorErr: false,
    picturesErr: false,
  };

  const [state, dispatch] = useReducer(CarReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // Validate
  const validateInput = (input, type) => {
    if (input === undefined || input === '' || input === {} || input === []) {
      dispatch({
        type: type,
      });
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  };

  // Submit
  const submitForm = async () => {
    const brandValidated = await validateInput(state.brand, SET_BRAND_ERR);
    const modelValidated = await validateInput(state.model, SET_MODEL_ERR);
    const yearValidated = await validateInput(state.year, SET_YEAR_ERR);
    const kmDrivenValidated = await validateInput(
      state.kmDriven,
      SET_KM_DRIVEN_ERR
    );
    const fuelTypeValidated = await validateInput(
      state.fuelType,
      SET_FUELTYPE_ERR
    );
    const seatsValidated = await validateInput(state.seats, SET_SEATS_ERR);
    const colorValidated = await validateInput(state.color, SET_COLOR_ERR);
    const picturesValidated = await validateInput(
      state.pictures,
      SET_PICTURES_ERR
    );
  };

  return (
    <CarContext.Provider
      value={{
        brand: state.brand,
        model: state.model,
        year: state.year,
        kmDriven: state.kmDriven,
        fuelType: state.fuelType,
        seats: state.seats,
        color: state.color,
        pictures: state.pictures,
        brandErr: state.brandErr,
        modelErr: state.modelErr,
        yearErr: state.yearErr,
        kmDrivenErr: state.kmDrivenErr,
        fuelTypeErr: state.fuelTypeErr,
        seatsErr: state.seatsErr,
        colorErr: state.colorErr,
        picturesErr: state.picturesErr,
        setValue,
        submitForm,
      }}
    >
      {props.children}
    </CarContext.Provider>
  );
};

export default CarState;
