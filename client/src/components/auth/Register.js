import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Material UI
import {
  Modal,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
} from '@material-ui/core';

// Material UI Icons
import CloseIcon from '@material-ui/icons/Close';

// Components
import RegisterSlide1 from '../auth/RegisterSlide1';
import RegisterSlide2 from '../auth/RegisterSlide2';
import RegisterSlide3 from '../auth/RegisterSlide3';
import Loading from '../featback/Loading';
import Success from '../featback/Success';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';

// Define Style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  registerCont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  formCont: {
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
  h3: {
    fontWeight: '600',
    marginTop: theme.spacing(3),
  },
  span: {
    color: theme.palette.primary.main,
  },
  registerInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  inputSlide1: {
    marginTop: theme.spacing(2),
  },
  inputSlide2: {
    marginTop: theme.spacing(1),
  },
  slide3Message: {
    fontSize: '1.4em',
    textAlign: 'center',
  },
  web: {
    width: 500,
  },
  mobile: {
    width: 350,
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
  closeButton: {
    position: 'absolute',
    right: '0px',
    top: '10px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const Register = () => {
  // ========= CONTEXT ========
  // Navbar Context
  const navbarContext = useContext(NavbarContext);
  const { registerFormOpen, setRegisterForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const {
    registerSlide,
    setValue,
    validateRegister,
    setSlide,
    registerUser,
    validateFirstSlide,
  } = authContext;

  // Handle Click
  const handleOnClick = (type) => {
    if (type === 'back') {
      setSlide(type);
    } else if (type === 'next' && registerSlide === 1) {
      validateFirstSlide();
    } else if (type === 'next' && registerSlide === 2) {
      registerUser();
    } else if (type === 'close') {
      setRegisterForm(false);
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

  // ======= STYLE =========

  // Theme
  const theme = useTheme();

  // Media Queries
  let sup = useMediaQuery(theme.breakpoints.up('sm'));

  // Style
  const classes = useStyles();

  // ======= MODUL RETURNS ========

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
          <Button
            className={classes.closeButton}
            onClick={() => handleOnClick('close')}
          >
            <CloseIcon />
          </Button>
          <h3 className={classes.h3}>
            <span className={classes.span}>Register</span> Account
          </h3>
          <div className={classes.formCont}>
            {registerSlide === 1 ? (
              <RegisterSlide1
                classes={classes}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={handleOnClick}
              />
            ) : // <Loading classes={classes} />
            // <Success classes={classes} />
            registerSlide === 2 ? (
              <RegisterSlide2
                classes={classes}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={handleOnClick}
              />
            ) : (
              <RegisterSlide3 classes={classes} onClick={handleOnClick} />
            )}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Register;
