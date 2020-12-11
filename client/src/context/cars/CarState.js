import React, { useReducer } from 'react';
import axios from 'axios';

import CarContext from './carContext';
import CarReducer from './carReducer';

import {
  SET_LOADING,
  SET_BRAND_ERR,
  SET_MODEL_ERR,
  SET_YEAR_ERR,
  SET_KM_DRIVEN_ERR,
  SET_FUELTYPE_ERR,
  SET_SEATS_ERR,
  SET_COLOR_ERR,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RESET_CAR_FORM,
  SET_USER_CARS,
} from '../types';

const CarState = (props) => {
  const initialState = {
    user_id: undefined,
    brand: undefined,
    model: '',
    year: undefined,
    kmDriven: undefined,
    fuelType: undefined,
    seats: undefined,
    color: undefined,
    pictures: [],
    brandErr: false,
    modelErr: false,
    yearErr: false,
    kmDrivenErr: false,
    fuelTypeErr: false,
    seatsErr: false,
    colorErr: false,
    server: {
      msg: '',
      errors: undefined,
    },
    cars: undefined,
    modal: { open: false, type: '' },
    loading: true,
  };

  const [state, dispatch] = useReducer(CarReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  // Get Cars
  const getCars = async (id) => {
    // set headers
    const config = {
      headers: {
        user_id: id,
      },
    };

    // server request
    const res = await axios.get('server/cars', config);

    // set cars = server response
    dispatch({
      type: SET_USER_CARS,
      payload: res.data,
    });
  };

  // Validate
  const validateInput = (input, type) => {
    if (input === undefined || input === '') {
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
    // validate input
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

    // if validated
    if (
      brandValidated &&
      modelValidated &&
      yearValidated &&
      kmDrivenValidated &&
      fuelTypeValidated &&
      seatsValidated &&
      colorValidated
    ) {
      // Car data
      let formData = new FormData();
      formData.append('user_id', state.user_id);
      formData.append('brand', state.brand);
      formData.append('model', state.model);
      formData.append('year', state.year);
      formData.append('kmDriven', state.kmDriven);
      formData.append('fueltype', state.fuelType);
      formData.append('seats', state.seats);
      formData.append('color', state.color);
      for (let i = 0; i < state.pictures.length; i++) {
        formData.append('pictures', state.pictures[i]);
      }

      setValue(SET_LOADING);

      try {
        // config
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        // add car
        const res = await axios.post('/server/cars', formData, config);

        // update cars array
        getCars(state.user_id);

        dispatch({
          type: UPLOAD_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: UPLOAD_FAIL,
          payload: error.response.data,
        });
      }
    }
  };

  // Reset Form
  const resetCarForm = () => {
    dispatch({
      type: RESET_CAR_FORM,
    });
  };

  return (
    <CarContext.Provider
      value={{
        user_id: state.user_id,
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
        loading: state.loading,
        server: state.server,
        cars: state.cars,
        modal: state.modal,
        setValue,
        getCars,
        submitForm,
        resetCarForm,
      }}
    >
      {props.children}
    </CarContext.Provider>
  );
};

export default CarState;
