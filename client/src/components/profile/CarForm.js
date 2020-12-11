import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

// Material UI
import {
  FormControl,
  TextField,
  InputLabel,
  FilledInput,
  Typography,
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

// Lists
import carBrands from '../../constants/carbrands.json';
import fuelTypeList from '../../constants/fueltypes.json';
import kmSelect from '../../constants/kmselect.json';
import numSelect from '../../constants/numselect.json';
import colorSelect from '../../constants/colorselect.json';

// Context
import ProfileContext from '../../context/profile/profileContext';
import AlertContext from '../../context/alert/alertContext';

// Types
import {
  SET_BRAND,
  SET_MODEL,
  SET_YEAR,
  SET_KM_DRIVEN,
  SET_FUELTYPE,
  SET_SEATS,
  SET_COLOR,
  SET_PICTURES,
} from '../../context/types';

const CarForm = (props) => {
  // ===== CONTEXT ======
  const profileContext = useContext(ProfileContext);
  const {
    brand,
    model,
    year,
    kmDriven,
    fuelType,
    seats,
    color,
    pictures,
    brandErr,
    modelErr,
    yearErr,
    kmDrivenErr,
    fuelTypeErr,
    seatsErr,
    colorErr,
    server,
    loading,
    setValue,
    submitForm,
  } = profileContext;

  const alertContext = useContext(AlertContext);
  const { alerts, setAlert, clearAlerts } = alertContext;

  // ===== STATES ======

  // ===== FUNCTIONS ======

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

  // Generate years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push({ label: `${i}` });
  }

  const handleClick = async (type) => {
    await clearAlerts();
  };

  // Handle Change
  const handleChange = (type) => (e) => {
    setValue(type, e.target.value);
  };

  // Handle Submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitForm();
  };

  // ====== STYLE ======
  // Theme
  const theme = useTheme();

  // Media Queries
  let smup = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Fragment>
      {loading ? (
        server.msg === 'Your car has been saved successfully' ? (
          <Fragment>
            <Success classes={props.classes} />
            <Typography className={props.classes.message}>
              Your <span className={props.classes.span}> has been added!</span>
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
            <Grid container spacing={smup ? 2 : 0}>
              <Grid item xs={12} sm={6}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='brand'
                    options={carBrands}
                    onChange={(e, value) => setValue(SET_BRAND, value)}
                    autoHighlight
                    getOptionLabel={(option) =>
                      option.label.charAt(0).toUpperCase() +
                      option.label.slice(1)
                    }
                    getOptionSelected={(option) =>
                      option.label.charAt(0).toUpperCase() +
                        option.label.slice(1) ===
                      brand
                    }
                    renderOption={(option) => (
                      <Fragment>
                        {option.label.charAt(0).toUpperCase() +
                          option.label.slice(1)}
                      </Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Brand'
                        variant='filled'
                        inputProps={{
                          ...params.inputProps,
                        }}
                        error={brandErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <InputLabel htmlFor='model' color='primary' error={modelErr}>
                    Model
                  </InputLabel>
                  <FilledInput
                    id='model'
                    value={model}
                    onChange={handleChange(SET_MODEL)}
                    error={modelErr}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='car-year'
                    options={years}
                    onChange={(e, value) => setValue(SET_YEAR, value)}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option) => option.label === year}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                        }}
                        label='Year'
                        variant='filled'
                        error={yearErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='km'
                    options={kmSelect}
                    onChange={(e, value) => setValue(SET_KM_DRIVEN, value)}
                    autoHighlight
                    getOptionLabel={(option) => option.km}
                    getOptionSelected={(option) => option.km === kmDriven}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Kilometers'
                        variant='filled'
                        error={kmDrivenErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={5}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='fuel-type'
                    options={fuelTypeList}
                    onChange={(e, value) => setValue(SET_FUELTYPE, value)}
                    autoHighlight
                    getOptionLabel={(option) => option.type}
                    getOptionSelected={(option) => option.type === fuelType}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Fuel'
                        variant='filled'
                        error={fuelTypeErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='seat-number'
                    options={numSelect}
                    onChange={(e, value) => setValue(SET_SEATS, value)}
                    autoHighlight
                    getOptionLabel={(option) => option.num}
                    getOptionSelected={(option) => option.num === seats}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Seats'
                        variant='filled'
                        error={seatsErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant='filled' fullWidth color='primary'>
                  <Autocomplete
                    id='color'
                    options={colorSelect}
                    onChange={(e, value) => setValue(SET_COLOR, value)}
                    autoHighlight
                    getOptionLabel={(option) => option.color}
                    getOptionSelected={(option) => option.color === color}
                    renderOption={(option) => (
                      <Fragment>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            marginRight: 10,
                            backgroundColor: option.hex,
                          }}
                        ></div>
                        {option.color}
                      </Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Color'
                        variant='filled'
                        error={colorErr}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ImageUploader
                  buttonClassName={props.classes.imgButton}
                  withIcon={false}
                  withPreview={false}
                  label={
                    pictures.length === 0 ? (
                      'Max file size: 5mb, accepted: jpg, jpeg, png'
                    ) : (
                      <div style={{ display: 'flex' }}>
                        {pictures.map((el, index) => {
                          return (
                            <div key={index} style={{ marginRight: 8 }}>
                              {el.name}
                            </div>
                          );
                        })}
                      </div>
                    )
                  }
                  onChange={(pictureFiles, pictureDataURLs) => {
                    setValue(SET_PICTURES, pictureFiles);
                  }}
                  buttonText='Choose Images'
                  imgExtension={['.jpg', '.png', 'jpeg']}
                  fileContainerStyle={{
                    backgroundColor: 'rgba(0, 0, 0, .5',
                    height: 100,
                  }}
                />
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
          </form>
        )
      ) : (
        <Loading classes={props.classes.loadingGif} />
      )}
    </Fragment>
  );
};

CarForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CarForm;
