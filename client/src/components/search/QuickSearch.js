import React, { Fragment, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Date
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// Material UI
import {
  TextField,
  CircularProgress,
  Grid,
  IconButton,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

// Material Icons
import SearchIcon from '@material-ui/icons/Search';

// Context
import SearchContext from '../../context/search/searchContext';
import { SET_LOCATION, SET_CHECK_IN, SET_CHECK_OUT } from '../../context/types';

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

const QuickSearch = () => {
  // ====== CONTEXT ======
  const searchContext = useContext(SearchContext);
  const { checkIn, checkOut, setValue } = searchContext;

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
        const res = await axios.get(
          `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${GEOCODE_API}&text=${locationInput}&size=${RES_NUM}`
        );
        // geo result
        const result = await res.data.features;

        console.log(res.data);

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

  const handleDateChange = (date, value, type) => {
    setValue(type, date);
  };

  // ====== STYLE =======
  const classes = useStyles();

  return (
    <form className='quickSearchCont'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <KeyboardDateTimePicker
                  fullWidth
                  autoOk
                  ampm={false}
                  variant='inline'
                  inputVariant='outlined'
                  disablePast
                  format='MM/dd/yyyy HH:mm'
                  id='date-picker'
                  label='Check In'
                  value={checkIn}
                  onChange={(date, value) =>
                    handleDateChange(date, value, SET_CHECK_IN)
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'Check in day',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDateTimePicker
                  fullWidth
                  autoOk
                  ampm={false}
                  variant='inline'
                  inputVariant='outlined'
                  disablePast
                  format='MM/dd/yyyy HH:mm'
                  id='date-picker'
                  label='Check Out'
                  value={checkOut}
                  onChange={(date, value) =>
                    handleDateChange(date, value, SET_CHECK_OUT)
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'Check out day',
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Box display='flex' alignItems='center' height='100%'>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuickSearch;
