import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Box, Container, Grid, makeStyles } from '@material-ui/core';

// Define Style
const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.background.paper,
    padding: theme.spacing(5, 0),
  },
  logos: {
    maxWidth: 80,
  },
  h5: {
    fontSize: '1.1em',
    color: theme.palette.primary.main,
  },
  p: {
    lineHeight: '1.8em',
  },
  links: {
    marginTop: 10,
  },
  hr: {},
}));

const Footer = () => {
  // ===== STYLE =====
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container width='xl'>
        <Grid container>
          <Grid item xs={12} md={6}>
            <h5 className={classes.h5}>About</h5>
            <p className={classes.p}>
              Rent My Ride is a carsharing platform which enables private car
              owners to lent out there cars while they are not in use. With the
              Rent My Ride platform simply search for cars near your location,
              exchange keys with the owner and be on the road.
            </p>
          </Grid>
          <Grid item xs='auto' md={2}></Grid>
          <Grid item xs={12} md={2}>
            <h5 className={classes.h5}>Find out more</h5>
            <Box display='flex' flexDirection='column'>
              <Link to='/how-it-works'>How does it work?</Link>
              <Link to='/register' className={classes.links}>
                Lent out your car
              </Link>
              <Link to='/contact' className={classes.links}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <h5 className={classes.h5}>Partners</h5>
            <Box display='flex' flexDirection='column'>
              <a href='https://www.geico.com/'>Geico</a>
              <a href='https://www.nationwide.com/' className={classes.links}>
                Nationwide
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
