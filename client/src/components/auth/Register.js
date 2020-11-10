import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Material UI
import { Modal, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';

// Components
import RegisterSlide1 from '../auth/RegisterSlide1';
import RegisterSlide2 from '../auth/RegisterSlide2';
import Loading from '../loading/Loading';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';

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
    padding: theme.spacing(3, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  h2: {
    color: 'white',
    margin: theme.spacing(3, 0, 6),
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
  inputSlide1: {
    marginTop: theme.spacing(2),
  },
  inputSlide2: {
    marginTop: theme.spacing(1),
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
  loadingGif: {
    width: '70%',
    height: '70%',
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
    loading,
    registerStage,
    registerSlide,
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
    setValue,
    validateRegister,
    setSlide,
    searchUser,
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
      if (!loading && registerStage === 2) {
        console.log('useeffect 1');
        // set slide
        setSlide('next');
      }
    }

    //if no errors check loading
    if ((!firstNameErr, !lastNameErr, !streetErr, !zipErr, !cityErr)) {
      // if loading false next slide
      if (!loading && registerStage === 3) {
        console.log('useeffect 2');
        // set slide
        setSlide('next');
      }
    }
    // eslint-disable-next-line
  }, [
    userNameErr,
    emailErr,
    passwordErr,
    passwordRptErr,
    userExists,
    firstNameErr,
    lastNameErr,
    streetErr,
    zipErr,
    cityErr,
    loading,
    registerStage,
  ]);

  // // Set register client validation
  // useEffect(() => {
  //   if (
  //     firstName !== '' &&
  //     lastName !== '' &&
  //     street !== '' &&
  //     zip !== '' &&
  //     city !== ''
  //   ) {
  //     if (!firstNameErr && !lastNameErr && !streetErr && !zipErr && !cityErr) {
  //       setRegisterLoading(false);
  //     }
  //   }
  //   // if loading false next slide
  // }, [
  //   firstName,
  //   lastName,
  //   street,
  //   zip,
  //   city,
  //   firstNameErr,
  //   lastNameErr,
  //   streetErr,
  //   zipErr,
  //   cityErr,
  // ]);

  // Handle Click
  const handleOnClick = (type) => {
    if (type === 'back') {
      setSlide(type);
    } else if (type === 'next') {
      if (registerSlide === 1) {
        searchUser();
      } else if (registerSlide === 2) {
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
          ) : registerSlide === 2 ? (
            <RegisterSlide2
              classes={classes}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={handleOnClick}
            />
          ) : (
            registerSlide === 2 && !loading(<Loading classes={classes} />)
          )}
          {/* <Loading classes={classes} /> */}
        </div>
      </motion.div>
    </Modal>
  );
};

export default Register;
