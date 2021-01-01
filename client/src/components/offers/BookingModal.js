import React, { Fragment, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Material UI
import {
  Modal,
  Box,
  Typography,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

// Material UI Icons
import CloseIcon from '@material-ui/icons/Close';

// Components
import Success from '../layout/Success';
import Loading from '../layout/Loading';
import Alerts from '../layout/Alerts';

// Assets
import ServerErrorSVG from '../../assets/featback/server_error.svg';

// Context
import BookingContext from '../../context/booking/bookingContext';
import AlertContext from '../../context/alert/alertContext';
import { SET_MODAL } from '../../context/types';

// Define Style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  cont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  form: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: '0px',
    top: '10px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  h3: {
    fontWeight: '600',
    marginTop: theme.spacing(3),
  },
  span: {
    color: theme.palette.primary.main,
  },
  spanErr: {
    color: theme.palette.error.main,
  },
  web: {
    width: 500,
  },
  mobile: {
    width: 350,
  },
  imgButton: {
    backgroundColor: 'rgba(256, 256, 256, .5) !important',
    color: 'black !important',
    borderRadius: '2px !important',
  },
  loadingGif: {
    height: '200px',
    marginBottom: theme.spacing(12),
  },
  successGif: {
    height: '200px',
  },
  errorIcon: {
    height: '100px',
    width: '100px',
    color: theme.palette.error.main,
  },
  message: {
    fontSize: '1.4em',
    textAlign: 'center',
  },
  h4: {
    fontSize: '1.6em',
    fontWeight: '500',
    color: theme.palette.primary.main,
    marginBottom: 0,
  },
  p: {
    fontSize: '1.3em',
    textAlign: 'center',
  },
}));

const BookingModal = (props) => {
  // ===== CONTEXT ======
  const bookingContext = useContext(BookingContext);
  const { loading, bookingModalOpen, server, setValue } = bookingContext;
  const alertContext = useContext(AlertContext);
  const { alerts, setAlert, clearAlerts } = alertContext;

  // ===== FUNCTIONS ======
  // Alerts
  useEffect(() => {
    console.log(server);
    if (server.errors !== undefined) {
      server.errors.forEach((element) => {
        setAlert(element.msg, 'error', 0);
      });
    } else if (server === 'Internal Server Error') {
      setAlert(server, 'error', 0);
    }
  }, [server]);

  console.log(alerts);

  // Handle Close
  const handleClose = async () => {
    await clearAlerts();
    setValue(SET_MODAL);
    if (server.errors === undefined) {
      props.history.push(`/`);
    }
  };

  // ===== STYLE =====
  // Theme
  const theme = useTheme();

  // Media Queries
  let sup = useMediaQuery(theme.breakpoints.up('sm'));

  // Classes
  const classes = useStyles();

  return (
    <Modal
      open={bookingModalOpen}
      onClose={handleClose}
      aria-labelledby='profile-form'
      className={classes.modal}
    >
      <motion.div
        transition={{
          delay: 0.2,
          duration: 0.3,
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        className={classes.modal}
      >
        <div className={clsx(classes.cont, sup ? classes.web : classes.mobile)}>
          <Button className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </Button>
          <h3 className={classes.h3}>
            <span
              className={alerts.length === 0 ? classes.span : classes.spanErr}
            >
              Booking
            </span>
          </h3>
          {alerts.length > 0 && loading ? (
            // Server Error
            <Fragment>
              <img
                src={ServerErrorSVG}
                alt='error'
                className={classes.errorIcon}
              />
              <Box mt={2}>
                <Typography className={classes.message}>
                  Opps! Looks like something went{' '}
                  <span className={classes.spanErr}>wrong</span>
                </Typography>
              </Box>
              <Box mt={2} width='100%'>
                <Alerts />
              </Box>
            </Fragment>
          ) : alerts.length === 0 && loading ? (
            // Server Success
            <Fragment>
              <Success classes={classes} />
              <Typography className={classes.message}>
                The offer
                <span className={classes.span}> was booked successfully</span>.
                It can be found in your profile. Please contact the owner for
                further information.
              </Typography>
              <Box mt={4}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Fragment>
          ) : (
            <Loading classes={classes.loadingGif} />
          )}
        </div>
      </motion.div>
    </Modal>
  );
};

export default withRouter(BookingModal);
