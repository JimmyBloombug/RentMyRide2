import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// Material Ui
import {
  Divider,
  Button,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  makeStyles,
  Container,
} from '@material-ui/core';

// Components
import QuickSearch from '../search/QuickSearch';
import CarCards from '../cars/CarCards';
import Footer from '../layout/Footer';

// Assets
import heroBG from '../../assets/landing/carbg.mp4';

// Define Style
const useStyles = makeStyles((theme) => ({
  heroBGCont: {
    width: '100vw',
    height: '100vh',
    zIndex: -20,
    position: 'fixed',
    left: 0,
    top: 0,
    filter: 'blur(5px) brightness(0.2) hue-rotate(260deg)',
    overflowX: 'hidden',
  },
  heroBG: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
  heroSection: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  heroCont: {
    // marginTop: theme.spacing(10),
    padding: theme.spacing(0, 5, 10, 5),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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
  homeCont: {
    backgroundColor: theme.palette.background.default,
    zIndex: 200,
    width: '100vw',
    position: 'absolute',
    boxShadow: '0 0 10px 10px #000c0f',
  },
  homeContSection: {
    padding: theme.spacing(5, 5, 0, 5),
  },
  h3: {
    fontSize: '2.1em',
    fontWeight: 500,
  },
  h4: {
    fontSize: '1.6em',
    fontWeight: '500',
    color: theme.palette.primary.main,
  },
  span: {
    color: theme.palette.primary.main,
  },
  p: {
    fontSize: '1.3em',
  },
  svgCont: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  svg: {
    maxWidth: '100%',
    maxHeight: '400px',
    display: 'block',
  },
  h1Mobile: {
    fontSize: '3em',
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
  heroPMobile: {
    fontSize: '1.7em',
    fontWeight: 400,
    marginTop: theme.spacing(1),
  },
}));

const Home = () => {
  // ======== STYLE ========
  const classes = useStyles();

  // Theme
  const theme = useTheme();

  // Media Queries
  let mdup = useMediaQuery(theme.breakpoints.up('md'));
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ======== FUNCTIONS ========
  // Parallax
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 300], [0, -500]);

  return (
    <Fragment>
      <motion.section
        className={classes.heroSection}
        style={!xsdown ? { y: y1 } : null}
      >
        <div className={classes.heroBGCont}>
          <video
            src={heroBG}
            className={classes.heroBG}
            muted
            autoPlay
            loop
          ></video>
        </div>
        <div className={classes.heroCont}>
          <motion.h1
            transition={{
              duration: 0.3,
              type: 'spring',
              damping: 10,
              stiffness: 60,
            }}
            initial={{ y: '-50px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={xsdown ? classes.h1Mobile : classes.h1}
          >
            Instantly rent cars near you
          </motion.h1>
          <motion.p
            transition={{
              duration: 0.3,
              delay: 0.3,
              type: 'spring',
              damping: 10,
              stiffness: 60,
            }}
            initial={{ y: '-50px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={xsdown ? classes.heroPMobile : classes.heroP}
          >
            Cars from private lenders up to 60% cheaper
          </motion.p>
          <Box mt={6} width={mdup ? '900px' : '100%'}>
            <motion.div
              transition={{
                duration: 0.4,
                delay: 0.6,
                type: 'tween',
                damping: 12,
                stiffness: 10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QuickSearch />
            </motion.div>
          </Box>
        </div>
      </motion.section>
      <motion.section
        className={classes.homeCont}
        style={!xsdown ? { y: y2 } : null}
      >
        <section className={classes.homeContSection}>
          <Container maxWidth='lg'>
            <Box display='flex' justifyContent='center'>
              <h3 className={classes.h3}>
                Choose from a{' '}
                <span className={classes.span}>varity of cars</span>
              </h3>
            </Box>
            <Box display='flex' justifyContent='center' mt={2}>
              <CarCards />
              <CarCards />
              <CarCards />
            </Box>
          </Container>
        </section>
        <section className={classes.homeContSection}>
          <Container maxWidth='lg'>
            <Box display='flex' justifyContent='center'>
              <h3 className={classes.h3}>
                Featured
                <span className={classes.span}> offers</span>
              </h3>
            </Box>
            <Box display='flex' justifyContent='center' mt={2}>
              <CarCards />
              <CarCards />
              <CarCards />
            </Box>
          </Container>
        </section>
        {/* <section className={classes.homeContSection}>
          <Container maxWidth='lg'>
            <Box mb={4}>
              <h3 className={classes.h3}>You own a car?</h3>
              <h4 className={classes.h4}>No hidden costs</h4>
              <p className={classes.p}>
                Lent out your car without hidden costs.
              </p>
              <h4 className={classes.h4}>Everything is up to you</h4>
              <p className={classes.p}>You decide how much you charge.</p>
              <h4 className={classes.h4}>Earn up to 800$ per month</h4>
              <p className={classes.p}>
                All trips are insured by our partners.
              </p>
            </Box>
            <Button
              component={Link}
              to='/profile/cars'
              variant='outlined'
              color='primary'
            >
              List a car
            </Button>
            <Box mb={4}>
              <h3 className={classes.h3}>How does it work?</h3>
              <h4 className={classes.h4}>No subscription needed</h4>
              <p className={classes.p}>Book a car and acces it 24/7.</p>
              <h4 className={classes.h4}>Prices by the hour, day or week</h4>
              <p className={classes.p}>Rent as long as you need.</p>
              <h4 className={classes.h4}>Powered by locals</h4>
              <p className={classes.p}>
                Thousands of cars available from people near you.
              </p>
            </Box>
            <Button
              component={Link}
              to='/how-does-it-work'
              variant='outlined'
              color='primary'
            >
              See how it works
            </Button>
          </Container>
        </section> */}
        <Footer />
      </motion.section>
    </Fragment>
  );
};

export default Home;
