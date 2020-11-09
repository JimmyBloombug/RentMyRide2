import React, { Fragment, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';

// Components
import RegisterSlide1 from '../auth/RegisterSlide1';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';
import {
  SET_USERNAME,
  SET_PW,
  SET_PW_RPT,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_STREET,
  SET_ZIP,
  SET_CITY,
  SET_USERNAME_ERR,
  SET_PW_ERR,
  SET_PW_RPT_ERR,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_EMAIL_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
} from '../../context/types';

// Define Style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerCont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  h2: {
    color: 'white',
    margin: theme.spacing(3, 0, 5),
    fontWeight: '700',
  },
  h2Span: {},
  registerInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  errorColor: {
    color: theme.palette.error.main,
  },
  input: {
    marginTop: theme.spacing(2),
  },
  radiusRight: {
    borderTopRightRadius: 0,
  },
  radiusLeft: {
    borderTopLeftRadius: 0,
  },
  web: {
    width: 500,
  },
  mobile: {
    width: 350,
  },
}));

const Register = () => {
  // Navbar Context
  const navbarContext = useContext(NavbarContext);
  const { registerFormOpen, setRegisterForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const {
    loading,
    registerSlide,
    userName,
    password,
    passwordRpt,
    firstName,
    lastName,
    email,
    street,
    zip,
    city,
    userExists,
    userNameErr,
    emailErr,
    passwordErr,
    passwordRptErr,
    firstNameErr,
    lastNameErr,
    streetErr,
    zipErr,
    cityErr,
    showPw,
    setShowPw,
    setValue,
    validateRegister,
    searchUser,
    setSlide,
    registerUser,
  } = authContext;

  // Set Slide
  useEffect(() => {
    // if no errors check loading
    if (
      !userNameErr &&
      !emailErr &&
      !passwordErr &&
      !passwordRptErr &&
      userExists.takenName === '' &&
      userExists.takenEmail === ''
    ) {
      // if loading false next slide
      if (!loading) {
        // set slide
        setSlide();
      }
    }
    // eslint-disable-next-line
  }, [loading, userNameErr, emailErr, passwordErr, passwordRptErr, userExists]);

  // validation is running
  const [registerLoading, setRegisterLoading] = useState(true);

  // Set register client validation
  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      street !== '' &&
      zip !== '' &&
      city !== ''
    ) {
      if (!firstNameErr && !lastNameErr && !streetErr && !zipErr && !cityErr) {
        setRegisterLoading(false);
      }
    }
    // if loading false next slide
  }, [
    firstName,
    lastName,
    street,
    zip,
    city,
    firstNameErr,
    lastNameErr,
    streetErr,
    zipErr,
    cityErr,
  ]);

  // Handle Click
  const handleOnClick = (type) => {
    if (type === 'slide') {
      // Validate User Data
      if (registerSlide === 1) {
        validateRegister(SET_USERNAME_ERR);
        validateRegister(SET_EMAIL_ERR);
        validateRegister(SET_PW_ERR);
        validateRegister(SET_PW_RPT_ERR);
        searchUser();
      } else if (registerSlide === 2) {
        // go back one slide
        setSlide();
      }
    } else {
      // Validate User Data
      validateRegister(SET_FIRST_NAME_ERR);
      validateRegister(SET_LAST_NAME_ERR);
      validateRegister(SET_STREET_ERR);
      validateRegister(SET_ZIP_ERR);
      validateRegister(SET_CITY_ERR);

      if (registerLoading === false) {
        registerUser();
      }
    }
  };

  // Handle Change
  const handleChange = (type) => (e) => {
    setValue(type, e.target.value);
  };

  // Handle Blur
  const handleBlur = (type) => {
    // Validate Input Field
    validateRegister(type);
  };

  // Theme
  const theme = useTheme();

  // Media Queries
  let sup = useMediaQuery(theme.breakpoints.up('sm'));

  // Style
  const classes = useStyles();

  return (
    <Modal
      open={registerFormOpen}
      onClose={() => setRegisterForm(false)}
      aria-labelledby='register'
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
        <div
          className={clsx(
            classes.registerCont,
            sup ? classes.web : classes.mobile
          )}
        >
          <h2 className={classes.h2}>
            <span className={classes.h2Span}>New</span> Account
          </h2>
          {registerSlide === 1 ? (
            <RegisterSlide1
              classes={classes}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={handleOnClick}
            />
          ) : (
            <Fragment>
              <Grid container spacing={0}>
                <Grid item sm={6} xs={12}>
                  <FormControl variant='filled' fullWidth color='secondary'>
                    <InputLabel
                      htmlFor='firstName'
                      color='secondary'
                      error={firstNameErr}
                    >
                      First Name
                    </InputLabel>
                    <FilledInput
                      id='firstName'
                      value={firstName}
                      className={classes.radiusRight}
                      onChange={handleChange(SET_FIRST_NAME)}
                      onBlur={() => handleBlur(SET_FIRST_NAME_ERR)}
                      error={firstNameErr}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl variant='filled' fullWidth color='secondary'>
                    <InputLabel
                      htmlFor='lastName'
                      color='secondary'
                      error={lastNameErr}
                    >
                      Last Name
                    </InputLabel>
                    <FilledInput
                      id='lastName'
                      value={lastName}
                      className={classes.radiusLeft}
                      onChange={handleChange(SET_LAST_NAME)}
                      onBlur={() => handleBlur(SET_LAST_NAME_ERR)}
                      error={lastNameErr}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl
                variant='filled'
                fullWidth
                color='secondary'
                className={classes.input}
                error={streetErr}
              >
                <InputLabel htmlFor='street' color='secondary'>
                  Street
                </InputLabel>
                <FilledInput
                  id='street'
                  value={street}
                  onChange={handleChange(SET_STREET)}
                  onBlur={() => handleBlur(SET_STREET_ERR)}
                  error={streetErr}
                />
              </FormControl>

              <Grid
                container
                spacing={0}
                className={clsx(sup && classes.input)}
              >
                <Grid item sm={6} xs={12}>
                  <FormControl
                    variant='filled'
                    fullWidth
                    color='secondary'
                    error={zipErr}
                  >
                    <InputLabel htmlFor='zip' color='secondary'>
                      Zip
                    </InputLabel>
                    <FilledInput
                      id='zip'
                      value={zip}
                      className={classes.radiusRight}
                      onChange={handleChange(SET_ZIP)}
                      onBlur={() => handleBlur(SET_ZIP_ERR)}
                      error={zipErr}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl variant='filled' fullWidth color='secondary'>
                    <InputLabel
                      htmlFor='city'
                      color='secondary'
                      error={cityErr}
                    >
                      City
                    </InputLabel>
                    <FilledInput
                      id='city'
                      value={city}
                      className={classes.radiusLeft}
                      onChange={handleChange(SET_CITY)}
                      onBlur={() => handleBlur(SET_CITY_ERR)}
                      error={cityErr}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box mt={3} flexBasis='end'>
                <Button
                  className={classes.button}
                  startIcon={<ArrowBackIcon />}
                  size='large'
                  color='default'
                  variant='outlined'
                  onClick={() => handleOnClick('slide')}
                >
                  Back
                </Button>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  onClick={() => handleOnClick('register')}
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Box>
            </Fragment>
          )}
        </div>
      </motion.div>
    </Modal>
  );
};

export default Register;
