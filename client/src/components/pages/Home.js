import React, { Fragment } from 'react';

// Material Ui
import { makeStyles, theme } from '@material-ui/core/styles';

import hero from '../../assets/landing/hero.jpg';

// Define Style
const useStyles = makeStyles((theme) => ({
  heroSection: {
    width: '100vw',
    height: '100vh',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const Home = () => {
  // Style
  const classes = useStyles();

  return <div className={classes.heroSection}></div>;
};

export default Home;
