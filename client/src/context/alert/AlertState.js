import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../types';

const AuthState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    // if timeout is set remove alert
    if (timeout !== 0) {
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }
  };

  // removeAlert
  const clearAlerts = async () => {
    dispatch({ type: CLEAR_ALERTS });
    return true;
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        clearAlerts,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AuthState;
