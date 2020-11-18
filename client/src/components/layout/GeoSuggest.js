import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Material UI
import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// get API from env
let GEOCODE_API = process.env.REACT_APP_GEOCODE_API;
// load RES_NUM of cities (default: 5, limit: 10)
const RES_NUM = 5;

const GeoSuggest = () => {
  // Geolocation
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState();
  const [value, setValue] = useState('');
  const loading = open && options.length === 0;

  // Location Search on GeocodeAPI
  useEffect(() => {
    let active = true;

    if (value !== '') {
      (async () => {
        // get city
        const res = await axios.get(
          `https://app.geocodeapi.io/api/v1/autocomplete?apikey=${GEOCODE_API}&text=${value}&size=${RES_NUM}`
        );
        // geo result
        const result = await res.data.features;

        // set options
        if (active) {
          setOptions(Object.keys(result).map((key) => result[key].properties));
        }
      })();

      return () => {
        active = false;
      };
    }
  }, [value]);

  // Reset Options on close
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (element) => {
    setValue(element.target.value);
  };

  return (
    <Fragment>
      <Autocomplete
        id='geolocation'
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={(option) => {
          setOpen(false);
        }}
        onChange={(e, option) => setLocation(option)}
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
    </Fragment>
  );
};

export default GeoSuggest;
