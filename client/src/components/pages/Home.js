import React, { Fragment } from 'react';

// Material Ui
import { Box, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import QuickSearch from '../search/QuickSearch';
// Assets
import map from '../../assets/landing/map.svg';

// Define Style
const useStyles = makeStyles((theme) => ({
  heroSection: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  heroCont: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    height: '100%',
    display: 'flex',
    justifyContent: 'fle-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  h1: {
    color: theme.palette.primary.main,
    fontSize: '3.6em',
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },
  heroP: {
    fontSize: '2em',
    fontWeight: 400,
    marginTop: theme.spacing(0),
  },
  map: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    right: -180,
    bottom: -120,
  },
}));

const Home = () => {
  // ======== STYLE ========
  const classes = useStyles();

  // Theme
  const theme = useTheme();

  // Media Queries
  let mdup = useMediaQuery(theme.breakpoints.up('md'));

  // ======== FUNCTIONS ========

  // handle change
  const handleChange = (element) => {};

  return (
    <section className={classes.heroSection}>
      <div className={classes.heroCont}>
        <h1 className={classes.h1}>Instantly rent cars near you.</h1>
        <p className={classes.heroP}>
          Cars from private lenders up to 60% cheaper.
        </p>
        <Box mt={6} width={mdup ? '900px' : '100%'}>
          {/* <GeoSuggest />
          <Datepicker /> */}
          <QuickSearch />
        </Box>
      </div>
      {/* <img src={map} className={classes.map} /> */}
    </section>
  );
};

export default Home;
