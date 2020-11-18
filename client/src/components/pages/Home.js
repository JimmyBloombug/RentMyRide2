import React, { Fragment } from 'react';

// Material Ui
import { Box } from '@material-ui/core';
import { makeStyles, theme } from '@material-ui/core/styles';

// Components
import GeoSuggest from '../layout/GeoSuggest';

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
    padding: theme.spacing(5),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  h1: {
    color: theme.palette.primary.main,
    lineHeight: '80%',
    fontSize: '3.2em',
    fontWeight: 500,
  },
  h3: {
    lineHeight: '50%',
    fontSize: '1.7em',
    fontWeight: 400,
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
  // Style
  const classes = useStyles();

  // ======== FUNCTIONS ========

  // handle change
  const handleChange = (element) => {};

  return (
    <section className={classes.heroSection}>
      <div className={classes.heroCont}>
        <h1 className={classes.h1}>Instantly rent cars near you.</h1>
        <h3 className={classes.h3}>
          Rent cars from private lenders up to 60% cheaper
        </h3>
        <Box mt={5}>
          <GeoSuggest />
        </Box>
      </div>
      {/* <img src={map} className={classes.map} /> */}
    </section>
  );
};

export default Home;
