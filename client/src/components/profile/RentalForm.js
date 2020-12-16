import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material UI
import {
  Select,
  FormControl,
  TextField,
  InputLabel,
  FilledInput,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// Material UI Icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Assets
import ServerErrorSVG from '../../assets/featback/server_error.svg';

// Components
import Alerts from '../layout/Alerts';
import Loading from '../layout/Loading';
import Success from '../layout/Success';

// Context
import ProfileContext from '../../context/profile/profileContext';
import AlertContext from '../../context/alert/alertContext';

import {
  SET_MODAL,
  SET_CAR,
  SET_PRICE,
  SET_BILLING,
  SET_LOCATION,
} from '../../context/types';

const RentalForm = (props) => {
  // ====== STYLE ======
  // Theme
  const theme = useTheme();

  // Media Queries
  let smup = useMediaQuery(theme.breakpoints.up('sm'));

  // ===== CONTEXT ======
  const profileContext = useContext(ProfileContext);
  const {
    server,
    loading,
    price,
    billing,
    carErr,
    priceErr,
    billingErr,
    locationErr,
    cars,
    setValue,
    submitForm,
    resetForm,
  } = profileContext;

  const alertContext = useContext(AlertContext);
  const { alerts, setAlert, clearAlerts } = alertContext;

  // ===== FUNCTIONS ======
  const carOptions = [];

  // push car names into car options
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].active === false) {
      let option = {};
      option._id = cars[i]._id;
      option.label = cars[i].label;
      option.pictures = cars[i].pictures;
      option.kmDriven = cars[i].kmDriven;
      option.fueltype = cars[i].fueltype;
      option.seats = cars[i].seats;
      option.color = cars[i].color;
      carOptions.push(option);
    }
  }

  // Alerts
  useEffect(() => {
    if (server.msg === 'An error occurred') {
      if (server.errors !== undefined) {
        server.errors.forEach((element) => {
          setAlert(element.msg, 'error', 0);
        });
      }
    }
    // eslint-disable-next-line
  }, [server]);

  // Geolocation
  // get API from env
  const GEOCODE_API = process.env.REACT_APP_GEOCODE_API;
  // load RES_NUM of cities (default: 5, limit: 10)
  const RES_NUM = 5;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [locationInput, setlocationInput] = useState('');
  const loadingLocation = open && options.length === 0;

  // Location Search on GeocodeAPI
  useEffect(() => {
    let active = true;

    if (locationInput !== '') {
      (async () => {
        // get city
        const res = await fetch(
          `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${GEOCODE_API}&text=${locationInput}&size=${RES_NUM}`
        );
        // geo result
        const resJson = await res.json();
        const result = resJson.features;

        // set options
        if (active) {
          setOptions(Object.keys(result).map((key) => result[key].properties));
        }
      })();

      return () => {
        active = false;
      };
    }
    // eslint-disable-next-line
  }, [locationInput]);

  // Reset Geo Options on close
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Handle Change
  const handleChange = (element, type) => {
    setlocationInput(element.target.value);
  };

  const handleClick = async () => {
    await clearAlerts();
    resetForm();
  };

  // Handle Submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitForm('rentalSubmit');
  };

  // Handle Modal
  const handleModal = (evt) => {
    evt.preventDefault();
    // change route
    props.history.push('/profile?tab=cars');
    // change modal
    setValue(SET_MODAL, { open: true, type: 'cars' });
  };

  // Handle Price
  const handlePrice = (e) => {
    if (isNaN(e.target.value) === false) {
      setValue(SET_PRICE, e.target.value);
    }
  };

  return (
    <Fragment>
      {loading ? (
        server.msg === 'Your offer has been saved successfully' ? (
          <Fragment>
            <Success classes={props.classes} />
            <Typography className={props.classes.message}>
              Your offer
              <span className={props.classes.span}> has been added!</span>
            </Typography>
            <Box mt={4}>
              <Button
                size='large'
                color='primary'
                variant='contained'
                onClick={props.handleClose}
              >
                Close
              </Button>
            </Box>
          </Fragment>
        ) : alerts.length > 0 ? (
          <Fragment>
            <img
              src={ServerErrorSVG}
              alt='error'
              className={props.classes.errorIcon}
            />
            <Box mt={2}>
              <Typography className={props.classes.message}>
                Opps! Looks like something went{' '}
                <span className={props.classes.span}>wrong</span>
              </Typography>
            </Box>
            <Box mt={2} width='100%'>
              <Alerts />
            </Box>
            <Box mt={3} flexBasis='end'>
              <Button
                startIcon={<ArrowBackIcon />}
                size='large'
                color='default'
                variant='outlined'
                onClick={handleClick}
              >
                Back
              </Button>
            </Box>
          </Fragment>
        ) : (
          <form className={props.classes.form} onSubmit={handleSubmit}>
            <Alerts />
            {cars.length > 0 ? (
              <Fragment>
                <Grid container spacing={smup ? 2 : 0}>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant='filled' fullWidth color='primary'>
                      <Autocomplete
                        id='rental-car'
                        options={carOptions}
                        onChange={(e, option) => setValue(SET_CAR, option)}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        // getOptionSelected={(option) =>
                        //   option.label === car.label
                        // }
                        renderOption={(option) => (
                          <Fragment>{option.label}</Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Car'
                            variant='filled'
                            inputProps={{
                              ...params.inputProps,
                            }}
                            error={carErr}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant='filled' fullWidth color='primary'>
                      <InputLabel
                        htmlFor='rental-price'
                        color='primary'
                        error={priceErr}
                      >
                        Price
                      </InputLabel>
                      <FilledInput
                        id='rental-price'
                        value={price}
                        onChange={handlePrice}
                        error={priceErr}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant='filled' fullWidth color='primary'>
                      <InputLabel htmlFor='rental-billing' error={billingErr}>
                        Billing
                      </InputLabel>
                      <Select
                        native
                        value={billing}
                        onChange={(e) => setValue(SET_BILLING, e.target.value)}
                        inputProps={{
                          name: 'rental-billing',
                          id: 'rental-billing',
                        }}
                        error={billingErr}
                      >
                        <option aria-label='None' value='' />
                        <option value={'per hour'}>hourly</option>
                        <option value={'per day'}>daily</option>
                        <option value={'per week'}>weekly</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant='filled' fullWidth color='primary'>
                      <Autocomplete
                        id='rental-geolocation'
                        open={open}
                        onOpen={() => {
                          setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        onChange={(e, option) => setValue(SET_LOCATION, option)}
                        getOptionSelected={(option, value) =>
                          option.label === value.label
                        }
                        getOptionLabel={(option) => option.label}
                        options={options}
                        loading={loadingLocation}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Location'
                            variant='filled'
                            onChange={handleChange}
                            error={locationErr}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <Fragment>
                                  {loadingLocation ? (
                                    <CircularProgress
                                      color='inherit'
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <Button
                    size='large'
                    color='primary'
                    variant='contained'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <h4 className={props.classes.h4}>No cars found</h4>
                <p className={props.classes.p}>
                  You haven't added any cars to lent out, yet.
                </p>
                <Box mt={3}>
                  <Button
                    size='large'
                    color='primary'
                    variant='contained'
                    type='click'
                    onClick={handleModal}
                  >
                    Add car
                  </Button>
                </Box>
              </Fragment>
            )}
          </form>
        )
      ) : (
        <Loading classes={props.classes.loadingGif} />
      )}
    </Fragment>
  );
};

RentalForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(RentalForm);
