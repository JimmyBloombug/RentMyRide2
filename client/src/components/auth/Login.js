import React, { useContext } from 'react';
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

// Context
import NavbarContext from '../../context/navbar/navbarContext';
import AuthContext from '../../context/auth/authContext';
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
    backgroundColor: theme.palette.tertiary.light,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  h2: {
    margin: theme.spacing(3, 0, 5),
  },
  loginInput: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  emailInput: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  // Menu Context
  const navbarContext = useContext(NavbarContext);
  const { loginFormOpen, setLoginForm } = navbarContext;

  // Auth Context
  const authContext = useContext(AuthContext);
  const { email, password, showPw, setShowPw, setValue } = authContext;

  // Modal Change
  const handleLoginClose = () => {
    setLoginForm(false);
  };

  // Handle Input Change
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
      onClose={handleLoginClose}
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
          <h2 className={classes.h2}>Login</h2>
          <FormControl
            variant='filled'
            fullWidth
            className={classes.emailInput}
          >
            <InputLabel htmlFor='email' color='secondary'>
              Email
            </InputLabel>
            <FilledInput
              id='email'
              type='text'
              value={email}
              onChange={handleChange(SET_EMAIL)}
              color='secondary'
            />
          </FormControl>
          <FormControl variant='filled' fullWidth>
            <InputLabel htmlFor='password' color='secondary'>
              Password
            </InputLabel>
            <FilledInput
              id='password'
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={handleChange(SET_PW)}
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
              color='secondary'
            />
          </FormControl>
          <Box mt={5} mb={3}>
            <Button color='primary' variant='contained'>
              Login
            </Button>
          </Box>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Login;
