import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  FormControl,
  TextField,
  InputLabel,
  FilledInput,
  Grid,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// Components
import Alerts from '../layout/Alerts';

// Lists
import carBrands from '../../constants/carbrands.json';
import fuelTypes from '../../constants/fueltypes.json';
import kmSelect from '../../constants/kmselect.json';
import numSelect from '../../constants/numselect.json';
import colorSelect from '../../constants/colorselect.json';

const CarForm = (props) => {
  // ===== STATES ======

  // ===== FUNCTIONS ======
  // Generate years
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1900; i--) {
    years.push({ label: `${i}` });
  }

  // ====== STYLE ======
  // Theme
  const theme = useTheme();

  // Media Queries
  let smup = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <form className={props.classes.form}>
      <Alerts />
      <Grid container spacing={smup ? 2 : 0}>
        <Grid item xs={12} sm={6}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='brand'
              options={carBrands}
              // onFocus={(e, value) => handleChange(SET_COUNTRY, value)}
              // onChange={(e, value) => handleChange(SET_COUNTRY, value)}
              // onBlur={() => validateCountry()}
              autoHighlight
              getOptionLabel={(option) =>
                option.label.charAt(0).toUpperCase() + option.label.slice(1)
              }
              renderOption={(option) => (
                <Fragment>
                  {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                </Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Brand'
                  variant='filled'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  // error={countryErr}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant='filled' fullWidth color='primary'>
            <InputLabel
              htmlFor='model'
              color='primary'
              // error={userNameErr || userExists.takenName !== ''}
            >
              Model
            </InputLabel>
            <FilledInput
              id='model'
              // value={userName}
              // onFocus={props.onChange(SET_USERNAME)}
              // onChange={props.onChange(SET_USERNAME)}
              // onBlur={() => validateUsername()}
              // error={userNameErr || userExists.takenName !== ''}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='car-year'
              options={years}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label='Year' variant='filled' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='km'
              options={kmSelect}
              autoHighlight
              getOptionLabel={(option) => option.km}
              renderInput={(params) => (
                <TextField {...params} label='Kilometers' variant='filled' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={5}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='fuel-type'
              options={fuelTypes}
              autoHighlight
              getOptionLabel={(option) => option.type}
              renderInput={(params) => (
                <TextField {...params} label='Fuel' variant='filled' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='seat-number'
              options={numSelect}
              autoHighlight
              getOptionLabel={(option) => option.num}
              renderInput={(params) => (
                <TextField {...params} label='Seats' variant='filled' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant='filled' fullWidth color='primary'>
            <Autocomplete
              id='color'
              options={colorSelect}
              autoHighlight
              getOptionLabel={(option) => option.color}
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
                <TextField {...params} label='Color' variant='filled' />
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
          // onClick={() => props.onClick('next')}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

CarForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default CarForm;
