import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import {
  TextField,
  CircularProgress,
  Grid,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';

// Material Icons
import SearchIcon from '@material-ui/icons/Search';

// Context
import QueryContext from '../../context/query/queryContext';
import { SET_LOCATION } from '../../context/types';

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

const QuickSearch = (props) => {
  // ====== CONTEXT ======
  const queryContext = useContext(QueryContext);
  const { setValue } = queryContext;

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
        if (active && result) {
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

  // Go to search
  const handleSubmit = () => {
    props.history.push('/search');
  };

  // ====== STYLE =======
  const classes = useStyles();
  const theme = useTheme();
  // Media Queries
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <form
      className='quickSearchCont'
      style={{ display: 'flex', justifyContent: 'center' }}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2} style={{ width: 600 }}>
        <Grid item xs={12} sm={11}>
          <Autocomplete
            id='geolocation'
            className={classes.location}
            style={{ width: 400 }}
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
        <Grid item xs={12} sm={1}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='100%'
          >
            {!xsdown ? (
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            ) : (
              <Button
                onClick={handleSubmit}
                variant='outlined'
                color='primary'
                size='large'
              >
                Search
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(QuickSearch);
