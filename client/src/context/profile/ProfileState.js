import React, { useReducer } from 'react';
import axios from 'axios';

import ProfileContext from './profileContext';
import ProfileReducer from './profileReducer';

import {
  SET_LOADING,
  SET_CAR_ERR,
  SET_PRICE_ERR,
  SET_BILLING_ERR,
  SET_LOCATION_ERR,
  SET_BRAND_ERR,
  SET_MODEL_ERR,
  SET_YEAR_ERR,
  SET_KM_DRIVEN_ERR,
  SET_FUELTYPE_ERR,
  SET_SEATS_ERR,
  SET_COLOR_ERR,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  RESET_FORM,
  DELETE_FAIL,
  DELETE_SUCCESS,
} from '../types';

const ProfileState = (props) => {
  const initialState = {
    modal: { open: false, type: '' },
    loading: true,
    // rental form
    car: undefined,
    price: '',
    billing: '',
    location: undefined,
    carErr: false,
    priceErr: false,
    billingErr: false,
    locationErr: false,
    // car form
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
    // server response
    serverModalOpen: false,
    server: {
      msg: '',
      errors: undefined,
    },
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
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
  const submitForm = async (type) => {
    if (type === 'rentalSubmit') {
      // validate input
      const carValidated = await validateInput(state.car, SET_CAR_ERR);
      const priceValidated = await validateInput(state.price, SET_PRICE_ERR);
      const locationValidated = await validateInput(
        state.location,
        SET_LOCATION_ERR
      );
      const validateBilling = await validateInput(
        state.billing,
        SET_BILLING_ERR
      );

      // if validated POST
      if (
        carValidated &&
        priceValidated &&
        validateBilling &&
        locationValidated
      ) {
        // Rental data
        const formData = {
          car: state.car,
          price: state.price,
          billing: state.billing,
          location: state.location,
        };

        setValue(SET_LOADING);

        try {
          // config
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

          // add rental offer
          const res = await axios.post(
            '/server/rentals/user',
            formData,
            config
          );

          console.log('Add rental offer: ' + res.data);

          // upload success
          dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data,
          });
        } catch (error) {
          // upload fail
          dispatch({
            type: UPLOAD_FAIL,
            payload: error.response.data,
          });
        }
      }
    } else {
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

      // if validated POST
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
          const res = await axios.post('/server/cars/user', formData, config);

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
    }
  };

  // Delete entry
  const deleteFromDatabase = async (id, route) => {
    setValue(SET_LOADING);
    try {
      // config
      const config = {
        headers: {
          id,
        },
      };

      // delete entry
      const res = await axios.delete(`/server/${route}/delete`, config);

      dispatch({
        type: DELETE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Reset Form
  const resetForm = () => {
    dispatch({
      type: RESET_FORM,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        modal: state.modal,
        loading: state.loading,
        // rental form
        car: state.location,
        price: state.price,
        billing: state.billing,
        location: state.location,
        carErr: state.carErr,
        priceErr: state.priceErr,
        billingErr: state.billingErr,
        locationErr: state.locationErr,
        // car form
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
        // server
        serverModalOpen: state.serverModalOpen,
        server: state.server,
        // functions
        setValue,
        submitForm,
        resetForm,
        deleteFromDatabase,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
