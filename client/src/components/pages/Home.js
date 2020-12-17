import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// Material Ui
import {
  // Divider,
  Button,
  Grid,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';

// Components
import QuickSearch from '../search/QuickSearch';
import Cards from '../layout/Cards';
import Slider from '../layout/Slider';
import Footer from '../layout/Footer';

// Assets
import heroBG from '../../assets/landing/carbg.mp4';
import Car1 from '../../assets/home/car1.jpg';
import Car2 from '../../assets/home/car2.jpg';

// Context
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';
import QueryContext from '../../context/query/queryContext';

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
    textAlign: 'center',
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
    padding: theme.spacing(10, 5, 0, 5),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  h3: {
    fontSize: '2.1em',
    fontWeight: 500,
    marginTop: 0,
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
  imgMobile: {
    width: '100%',
  },
}));

const Home = () => {
  // ======== STYLE ========
  const classes = useStyles();

  // Theme
  const theme = useTheme();

  // Media Queries
  let mdup = useMediaQuery(theme.breakpoints.up('md'));
  let mddown = useMediaQuery(theme.breakpoints.down('md'));
  let xsdown = useMediaQuery(theme.breakpoints.down('xs'));

  // ======== CONTEXT =======
  const authContext = useContext(AuthContext);
  const navbarContext = useContext(NavbarContext);
  const queryContext = useContext(QueryContext);
  const { rentals, getRentals } = queryContext;

  // ======== FUNCTIONS ========
  // Parallax
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 300], [0, -500]);

  // get rentals
  useEffect(() => {
    getRentals('', 'public', 'recent', 3);

    if (mddown && !xsdown) {
      getRentals('', 'public', 'recent', 2);
    } else if (xsdown) {
      getRentals('', 'public', 'recent', 3);
    }

    // eslint-disable-next-line
  }, [mddown, xsdown]);

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
            {rentals !== undefined && rentals.length > 0 ? (
              xsdown ? (
                <Slider array={rentals} />
              ) : (
                <Cards array={rentals} bp={{ mdup, mddown, xsdown }} />
              )
            ) : (
              ''
            )}
          </Container>
        </section>
        <section className={classes.homeContSection}>
          <Container maxWidth='lg'>
            <Grid container spacing={xsdown ? 2 : 10}>
              <Grid item xs={12} md={6}>
                {!mdup && (
                  <h3 className={classes.h3}>
                    Your <span className={classes.span}>new way</span> to
                    <span className={classes.span}> rent a car</span> is here
                  </h3>
                )}
                <img
                  className={xsdown ? classes.imgMobile : classes.img}
                  src={Car1}
                  alt='car-landing-1'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {mdup && (
                  <h3 className={classes.h3}>
                    Your <span className={classes.span}>new way</span> to
                    <span className={classes.span}> rent a car</span> is here
                  </h3>
                )}
                <h4 className={classes.h4}>No subscription needed</h4>
                <p className={classes.p}>
                  Book a car and access it 24/7 with your phone
                </p>
                <h4 className={classes.h4}>Prices by the hour, day, or week</h4>
                <p className={classes.p}>Rent for as long as you need</p>
                <h4 className={classes.h4}>Powered by locals</h4>
                <p className={classes.p}>
                  Thousands of cars available from people near you
                </p>
                <Box mt={4}>
                  <Button
                    component={Link}
                    to='how-does-it-work'
                    variant='outlined'
                    color='primary'
                  >
                    How does it work
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
        <section className={classes.homeContSection}>
          <Container maxWidth='lg'>
            <Grid container spacing={xsdown ? 7 : 10}>
              <Grid item xs={12} md={6}>
                <h3 className={classes.h3}>
                  Own a <span className={classes.span}>car</span>? Put it to
                  <span className={classes.span}> work!</span>
                </h3>
                <h4 className={classes.h4}>
                  Choose from a wide range of customers
                </h4>
                <p className={classes.p}>
                  Lent out your car to a wide range of customers worldwide
                </p>
                <h4 className={classes.h4}>
                  You don't use your car every day?
                </h4>
                <p className={classes.p}>
                  Earn up to $800 per month by sharing your car using the Rent
                  My Ride platform
                </p>
                <h4 className={classes.h4}>
                  Don't worry about eventual damage
                </h4>
                <p className={classes.p}>
                  All trips are automatically insured by our partners
                </p>
                {authContext.isAuthenticated ? (
                  <Box mt={4}>
                    <Button
                      component={Link}
                      to='profile'
                      variant='outlined'
                      color='primary'
                    >
                      Add car
                    </Button>
                  </Box>
                ) : (
                  <Box mt={4}>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => navbarContext.setRegisterForm(true)}
                    >
                      Register
                    </Button>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  className={xsdown ? classes.imgMobile : classes.img}
                  src={Car2}
                  alt='car-landing-1'
                />
              </Grid>
            </Grid>
          </Container>
        </section>
        <Footer />
      </motion.section>
    </Fragment>
  );
};

export default Home;
