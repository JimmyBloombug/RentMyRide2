import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

// Material UI
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// Context
import NavbarContext from '../../context/navbar/navbarContext';

// Helpers
import { useColor } from '../../styles/themeConst';

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
    backgroundColor: useColor('primary', 0.8),
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
    outline: 'none',
  },
  loginInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

const Login = () => {
  // Menu Button
  const navbarContext = useContext(NavbarContext);
  const { loginFormOpen, setLoginForm } = navbarContext;

  // // Theme
  // const theme = useTheme();

  // // MediaQueries
  // let xsup = useMediaQuery(theme.breakpoints.up('xs'));

  // Style
  const classes = useStyles();

  return (
    <Modal
      open={loginFormOpen}
      onClose={() => setLoginForm(false)}
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
          <h2>Login</h2>
          <Box mt={4}>
            <form action=''>
              <TextField
                id='email'
                label='Email'
                type='email'
                autoComplete='current-email'
                variant='outlined'
                color='secondary'
                className={classes.loginInput}
              />
              <TextField
                id='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                variant='outlined'
                color='secondary'
                className={classes.loginInput}
              />
            </form>
          </Box>
        </div>
      </motion.div>
    </Modal>
  );
};

export default Login;
