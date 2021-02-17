import React, { Fragment, useState, useEffect, useContext } from 'react';

// Material UI
import {
  TextField,
  CircularProgress,
  Grid,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';

// Lists
import kmSelect from '../../constants/kmselect.json';
import fuelTypeList from '../../constants/fueltypes.json';
import numSelect from '../../constants/numselect.json';
import colorSelect from '../../constants/colorselect.json';

// Context
import QueryContext from '../../context/query/queryContext';
import {
  SET_CAR,
  SET_LOCATION,
  SET_KM_DRIVEN,
  SET_FUELTYPE,
  SET_SEATS,
  SET_COLOR,
} from '../../context/types';

// Define Styles
const useStyles = makeStyles((theme) => ({
  location: {
    width: '100% !important',
  },
}));

// get API from env
const GEOCODE_API = process.env.REACT_APP_GEOCODE_API;
// load RES_NUM of cities (default: 5, limit: 10)
const RES_NUM = 5;

const FullSearch = () => {
  // ====== CONTEXT ======
  const queryContext = useContext(QueryContext);
  const { car, kmDriven, seats, color, fuelType, setValue } = queryContext;

  // ====== STATES =======

  // Geolocation
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [locationInput, setlocationInput] = useState('');
  const loading = open && options.length === 0;

  // ====== FUNCTIONS ======

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
  }, [locationInput]);

  // Reset Geo Options on close
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Handle Change
  const handleChange = (element) => {
    setlocationInput(element.target.value);
  };

  // ====== STYLE =======
  const classes = useStyles();

  return (
    <form className='fullSearchCont'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl variant='outlined' fullWidth color='primary'>
            <TextField
              id='searchCar'
              label='Car'
              variant='outlined'
              fullWidth
              onChange={(e) => setValue(SET_CAR, e.target.value)}
              value={car}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id='geolocation'
            className={classes.location}
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(e, option) => setValue(SET_LOCATION, option)}
            getOptionSelected={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Your location'
                variant='outlined'
                onChange={handleChange}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant='outlined' fullWidth color='primary'>
            <Autocomplete
              id='km'
              options={kmSelect}
              onChange={(e, value) => setValue(SET_KM_DRIVEN, value)}
              autoHighlight
              getOptionLabel={(option) => option.km}
              getOptionSelected={(option) => option.km === kmDriven}
              renderInput={(params) => (
                <TextField {...params} label='Kilometers' variant='outlined' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant='outlined' fullWidth color='primary'>
            <Autocomplete
              id='fuel-type'
              options={fuelTypeList}
              onChange={(e, value) => setValue(SET_FUELTYPE, value)}
              autoHighlight
              getOptionLabel={(option) => option.type}
              getOptionSelected={(option) => option.type === fuelType}
              renderInput={(params) => (
                <TextField {...params} label='Fuel' variant='outlined' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant='outlined' fullWidth color='primary'>
            <Autocomplete
              id='seat-number'
              options={numSelect}
              onChange={(e, value) => setValue(SET_SEATS, value)}
              autoHighlight
              getOptionLabel={(option) => option.num}
              getOptionSelected={(option) => option.num === seats}
              renderInput={(params) => (
                <TextField {...params} label='Seats' variant='outlined' />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl variant='outlined' fullWidth color='primary'>
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
                <TextField {...params} label='Color' variant='outlined' />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default FullSearch;
