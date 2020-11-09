import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
  FilledInput,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from '@material-ui/core';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Context
import AuthContext from '../../context/auth/authContext';
import {
  SET_USERNAME,
  SET_USERNAME_ERR,
  SET_EMAIL,
  SET_EMAIL_ERR,
  SET_PW,
  SET_PW_ERR,
  SET_PW_RPT,
  SET_PW_RPT_ERR,
} from '../../context/types';

const RegisterSlide1 = (props) => {
  // Context
  const authContext = useContext(AuthContext);
  const {
    userName,
    userNameErr,
    email,
    emailErr,
    userExists,
    password,
    passwordErr,
    passwordRpt,
    passwordRptErr,
    setShowPw,
    showPw,
  } = authContext;

  // Handle Mouse Down
  const handlePwMouseDown = (e) => {
    e.preventDefault();
  };

  // Handle PW Button
  const handleShowPw = () => {
    if (showPw) {
      setShowPw(false);
    } else {
      setShowPw(true);
    }
  };

  return (
    <Fragment>
      <FormControl variant='filled' fullWidth color='secondary'>
        <InputLabel
          htmlFor='userName'
          color='secondary'
          error={userNameErr || userExists.takenName !== ''}
          className={
            userExists.takenName !== '' ? props.classes.errorColor : ''
          }
        >
          Username
        </InputLabel>
        <FilledInput
          id='userName'
          value={userName}
          onFocus={props.onChange(SET_USERNAME)}
          onChange={props.onChange(SET_USERNAME)}
          onBlur={() => props.onBlur(SET_USERNAME_ERR)}
          error={userNameErr || userExists.takenName !== ''}
        />
      </FormControl>
      <FormControl
        variant='filled'
        fullWidth
        color='secondary'
        className={props.classes.input}
        error={emailErr || userExists.takenEmail !== ''}
      >
        <InputLabel
          htmlFor='email'
          color='secondary'
          error={emailErr}
          className={
            userExists.takenEmail !== '' ? props.classes.errorColor : ''
          }
        >
          Email
        </InputLabel>
        <FilledInput
          id='email'
          value={email}
          type='email'
          onFocus={props.onChange(SET_EMAIL)}
          onChange={props.onChange(SET_EMAIL)}
          onBlur={() => props.onBlur(SET_EMAIL_ERR)}
          error={emailErr || userExists.takenEmail !== ''}
        />
      </FormControl>
      <FormControl
        variant='filled'
        fullWidth
        colors='secondary'
        className={props.classes.input}
      >
        <InputLabel htmlFor='password' color='secondary' error={passwordErr}>
          Password
        </InputLabel>
        <FilledInput
          id='password'
          type={showPw ? 'text' : 'password'}
          value={password}
          onFocus={props.onChange(SET_PW)}
          onChange={props.onChange(SET_PW)}
          onBlur={() => props.onBlur(SET_PW_ERR)}
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
          color='secondary'
        />
      </FormControl>
      <FormControl
        variant='filled'
        fullWidth
        colors='secondary'
        className={props.classes.input}
      >
        <InputLabel
          htmlFor='passwordRpt'
          color='secondary'
          error={passwordRptErr}
        >
          Repeat Password
        </InputLabel>
        <FilledInput
          id='passwordRpt'
          type='password'
          color='secondary'
          value={passwordRpt}
          onFocus={props.onChange(SET_PW_RPT)}
          onChange={props.onChange(SET_PW_RPT)}
          onBlur={() => props.onBlur(SET_PW_RPT_ERR)}
          error={passwordRptErr}
        />
      </FormControl>
      <Box mt={3}>
        <Button
          size='large'
          color='primary'
          variant='contained'
          onClick={() => props.onClick('slide')}
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </Box>
    </Fragment>
  );
};

RegisterSlide1.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RegisterSlide1;
