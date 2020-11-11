import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Typography, Button, Box } from '@material-ui/core';

// Material UI Icons
import ErrorIcon from '@material-ui/icons/Error';

// Components
import Success from '../featback/Success';

// Context
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AuthContext from '../../context/auth/authContext';

// ======= MODUL RETURNS ========

const RegisterSlide3 = (props) => {
  // ========= CONTEXT ========
  // Auth Context
  const authContext = useContext(AuthContext);
  const { registerFail } = authContext;

  return (
    <Fragment>
      {registerFail == null ? (
        <Fragment>
          <Success classes={props.classes} />
          <Typography className={props.classes.slide3Message}>
            Welcome on <span className={props.classes.span}>board!</span>
          </Typography>
          <Box mt={4}>
            <Button
              size='large'
              color='primary'
              variant='contained'
              onClick={() => props.onClick('close')}
            >
              Close
            </Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <ErrorIcon className={props.classes.errorIcon} />
          <Box mt={3} flexBasis='end'>
            <Button
              startIcon={<ArrowBackIcon />}
              size='large'
              color='default'
              variant='outlined'
              onClick={() => props.onClick('back')}
            >
              Back
            </Button>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

RegisterSlide3.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RegisterSlide3;
