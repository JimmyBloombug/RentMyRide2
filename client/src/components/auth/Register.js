import React, { useContext } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';
import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_STREET,
  SET_ZIP,
  SET_CITY,
  SET_PASSWORD,
  SET_FIRST_NAME_ERR,
  SET_LAST_NAME_ERR,
  SET_EMAIL_ERR,
  SET_STREET_ERR,
  SET_ZIP_ERR,
  SET_CITY_ERR,
  CLEAR_FIRST_NAME_ERR,
  CLEAR_LAST_NAME_ERR,
  CLEAR_EMAIL_ERR,
  CLEAR_STREET_ERR,
  CLEAR_ZIP_ERR,
  CLEAR_CITY_ERR,
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
    backgroundColor: theme.palette.tertiary.light,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  h2: {
    margin: theme.spacing(3, 0, 5),
    fontWeight: 'bold',
  },
  registerInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
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
    width: 400,
  },
}));

const Register = () => {
  // Navbar Context
  const navbarContext = useContext(NavbarContext);
  const { registerFormOpen, setRegisterForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const {
    firstName,
    lastName,
    email,
    street,
    zip,
    city,
    firstNameErr,
    lastNameErr,
    emailErr,
    streetErr,
    zipErr,
    cityErr,
    setValue,
    validateRegister,
    clearError,
  } = authContext;

  // Handle Foucs
  const handleFocus = (type) => {
    clearError(type);
  };

  // Handle Change
  const handleChange = (type) => (e) => {
    setValue(type, e.target.value);
  };

  // Handle Blur
  const handleBlur = (type) => {
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
          <h2 className={classes.h2}>Register</h2>
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
                  onFocus={() => handleFocus(CLEAR_FIRST_NAME_ERR)}
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
                  onFocus={() => handleFocus(CLEAR_LAST_NAME_ERR)}
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
          >
            <InputLabel htmlFor='email' color='secondary' error={emailErr}>
              Email
            </InputLabel>
            <FilledInput
              id='email'
              value={email}
              type='email'
              onFocus={() => handleFocus(CLEAR_EMAIL_ERR)}
              onChange={handleChange(SET_EMAIL)}
              onBlur={() => handleBlur(SET_EMAIL_ERR)}
              error={emailErr}
            />
          </FormControl>
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
              onFocus={() => handleFocus(CLEAR_STREET_ERR)}
              onChange={handleChange(SET_STREET)}
              onBlur={() => handleBlur(SET_STREET_ERR)}
              error={streetErr}
            />
          </FormControl>

          <Grid container spacing={0} className={clsx(sup && classes.input)}>
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
                  onFocus={() => handleFocus(CLEAR_ZIP_ERR)}
                  onChange={handleChange(SET_ZIP)}
                  onBlur={() => handleBlur(SET_ZIP_ERR)}
                  error={zipErr}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl variant='filled' fullWidth color='secondary'>
                <InputLabel htmlFor='city' color='secondary' error={cityErr}>
                  City
                </InputLabel>
                <FilledInput
                  id='city'
                  value={city}
                  className={classes.radiusLeft}
                  onFocus={() => handleFocus(CLEAR_CITY_ERR)}
                  onChange={handleChange(SET_CITY)}
                  onBlur={() => handleBlur(SET_CITY_ERR)}
                  error={cityErr}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={5} mb={3}>
            <Button color='primary' variant='contained'>
              Send
            </Button>
          </Box>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Register;
