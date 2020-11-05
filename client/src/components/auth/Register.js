import React, { useContext } from 'react';
import { motion } from 'framer-motion';

// Material UI
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
  registerCont: {
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
  registerInput: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

const Register = () => {
  // Menu Button
  const navbarContext = useContext(NavbarContext);
  const { registerFormOpen, setRegisterForm } = navbarContext;

  // Style
  const classes = useStyles();

  return (
    <Modal
      open={registerFormOpen}
      onClose={() => setRegisterForm(false)}
      aria-labelledby='register'
      className={classes.modal}
    >
      {registerFormOpen && (
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
          <div className={classes.registerCont}>
            <h2>Register</h2>
            <Box mt={4}>
              <form action=''>
                <TextField
                  id='email'
                  label='Email'
                  type='email'
                  autoComplete='current-email'
                  variant='outlined'
                  color='secondary'
                  className={classes.registerInput}
                />
                <TextField
                  id='password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  variant='outlined'
                  color='secondary'
                  className={classes.registerInput}
                />
              </form>
            </Box>
          </div>
        </motion.div>
      )}
    </Modal>
  );
};

export default Register;
