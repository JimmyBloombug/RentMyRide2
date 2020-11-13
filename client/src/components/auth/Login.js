import React, { Fragment, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

// Material UI
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

// Material Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';

// Components
import Loading from '../layout/Loading';
import Alerts from '../layout/Alerts';

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { SET_EMAIL, SET_PW } from '../../context/types';

// Define Style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    width: 400,
    background: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
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
  h3: {
    fontWeight: '600',
    marginTop: theme.spacing(3),
  },
  loginInput: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  emailInput: {
    marginBottom: theme.spacing(2),
  },
  loadingGif: {
    height: '200px',
    marginBottom: theme.spacing(12),
  },
  successGif: {
    height: '200px',
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

const Login = () => {
  // ======== CONTEXT =========
  // Menu Context
  const navbarContext = useContext(NavbarContext);
  const { loginFormOpen, setLoginForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    email,
    password,
    emailErr,
    passwordErr,
    showPw,
    setShowPw,
    setValue,
    serverErr,
    resetAll,
    loading,
    loginUser,
  } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlerts } = alertContext;

  //======= FUNCTIONS =========

  useEffect(() => {
    // set alerts
    if (serverErr !== undefined) {
      serverErr.forEach((element) => {
        setAlert(element.msg, 'error');
      });
      // serverErr.map((error) => {
      //   setAlert(error.msg, 'error');
      // });
    }

    // close login form after login
    if (isAuthenticated) {
      handleClick('close');
    }
    // eslint-disable-next-line
  }, [serverErr, isAuthenticated]);

  // Handle Change
  const handleClick = (type) => {
    if (type === 'close') {
      resetAll();
      setLoginForm(false);
    } else {
      clearAlerts();
      loginUser();
    }
  };

  // Handle Change
  const handleChange = (type) => (e) => {
    setValue(type, e.target.value);
  };

  const handlePwMouseDown = (e) => {
    e.preventDefault();
  };

  // Handle Show Password
  const handleShowPw = () => {
    if (showPw) {
      setShowPw(false);
    } else {
      setShowPw(true);
    }
  };

  // Style
  const classes = useStyles();

  return (
    <Modal
      open={loginFormOpen}
      onClose={() => handleClick('close')}
      aria-labelledby='login'
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
        <div className={classes.loginCont}>
          <Button
            className={classes.closeButton}
            onClick={() => handleClick('close')}
          >
            <CloseIcon />
          </Button>
          <h3 className={classes.h3}>Login</h3>
          <div className={classes.formCont}>
            {loading ? (
              <Fragment>
                <Alerts />
                <FormControl
                  variant='filled'
                  fullWidth
                  className={classes.emailInput}
                >
                  <InputLabel htmlFor='email' color='primary' error={emailErr}>
                    Email
                  </InputLabel>
                  <FilledInput
                    id='email'
                    type='text'
                    value={email}
                    onChange={handleChange(SET_EMAIL)}
                    color='primary'
                    error={emailErr}
                  />
                </FormControl>
                <FormControl variant='filled' fullWidth>
                  <InputLabel
                    htmlFor='password'
                    color='primary'
                    error={passwordErr}
                  >
                    Password
                  </InputLabel>
                  <FilledInput
                    id='password'
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange(SET_PW)}
                    color='primary'
                    error={passwordErr}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleShowPw}
                          onMouseDown={handlePwMouseDown}
                          edge='end'
                        >
                          {showPw ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box mt={3}>
                  <Button
                    color='primary'
                    variant='contained'
                    size='large'
                    onClick={handleClick}
                  >
                    Login
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Loading classes={classes.loadingGif} />
            )}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Login;
