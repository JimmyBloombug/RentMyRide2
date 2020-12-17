import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import {
  Box,
  Container,
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

// Define Style
const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.background.paper,
    marginTop: theme.spacing(5),
    padding: theme.spacing(5, 0),
  },
  logos: {
    maxWidth: 80,
  },
  h5: {
    fontSize: '1.1em',
    color: theme.palette.primary.main,
  },
  center: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  p: {
    lineHeight: '1.8em',
  },
  links: {
    marginTop: 10,
  },
  centerMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: theme.spacing(5),
  },
}));

const Footer = () => {
  // ===== STYLE =====
  const classes = useStyles();
  const theme = useTheme();
  const xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h5 className={classes.h5}>About</h5>
            <p className={classes.p}>
              Rent My Ride is a carsharing platform which enables private car
              owners to lent out there cars while they are not in use. With the
              Rent My Ride platform simply search for cars near your location,
              exchange keys with the owner and be on the road.
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={xsdown ? classes.centerMobile : classes.center}
          >
            <div>
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
            </div>
            <div>
              <h5 className={classes.h5}>Social Media</h5>
              <Box display='flex' flexDirection='column'>
                <a href='https://www.facebook.com/'>Facebook</a>
                <a href='https://www.twitter.com/' className={classes.links}>
                  Twitter
                </a>
                <a href='https://www.instagram.com/' className={classes.links}>
                  Instagram
                </a>
              </Box>
            </div>
            <div>
              <h5 className={classes.h5}>Partners</h5>
              <Box display='flex' flexDirection='column'>
                <a href='https://www.geico.com/'>Geico</a>
                <a href='https://www.nationwide.com/' className={classes.links}>
                  Nationwide
                </a>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
