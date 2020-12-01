import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Material UI
import {
  Modal,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

// Material UI Icons
import CloseIcon from '@material-ui/icons/Close';

// Components
import RentalForm from './RentalForm';
import CarForm from './CarForm';

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
  web: {
    width: 500,
  },
  mobile: {
    width: 350,
  },
}));

const FormModal = (props) => {
  // ===== FUNCTIONS ======

  // ===== STYLE =====
  // Theme
  const theme = useTheme();

  // Media Queries
  let sup = useMediaQuery(theme.breakpoints.up('sm'));

  // Classes
  const classes = useStyles();

  return (
    <Modal
      open={props.modal.open}
      onClose={() => props.handleModal({ open: false })}
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
        <div className={clsx(classes.cont, sup ? classes.web : classes.mobile)}>
          <Button
            className={classes.closeButton}
            onClick={() => props.handleModal({ open: false })}
          >
            <CloseIcon />
          </Button>
          <h3 className={classes.h3}>
            Add{' '}
            <span className={classes.span}>
              {props.modal.type === 'rentals' ? 'Offer' : 'Car'}
            </span>
          </h3>
          {props.modal.type === 'rentals' ? <RentalForm /> : <CarForm />}
        </div>
      </motion.div>
    </Modal>
  );
};

FormModal.propTypes = {
  modal: PropTypes.object.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default FormModal;
