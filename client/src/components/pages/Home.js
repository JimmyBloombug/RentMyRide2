import React, { Fragment } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

// Material Ui
import { Box, useTheme, useMediaQuery, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import QuickSearch from '../search/QuickSearch';

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
    padding: theme.spacing(20, 5, 5, 5),
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
  homeCont: {
    backgroundColor: theme.palette.background.default,
    zIndex: 200,
    height: '200vh',
    width: '100vw',
    position: 'absolute',
    boxShadow: '0 0 10px 10px #000c0f',
  },
  homeContSection: {
    paddingTop: theme.spacing(5),
  },
  h3: {
    fontSize: '2em',
  },
  span: {
    color: theme.palette.primary.main,
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
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -450]);

  // const [ref, inView, entry] = useIn

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
            className={classes.h1}
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
            className={classes.heroP}
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
          <Box display='flex' justifyContent='center'>
            <h3 className={classes.h3}>
              Choose from a <span className={classes.span}>varity of cars</span>
            </h3>
          </Box>
        </section>
      </motion.section>
    </Fragment>
  );
};

export default Home;
