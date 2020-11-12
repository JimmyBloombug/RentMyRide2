import React, { useContext } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// Context
import AlertContext from '../../context/alert/alertContext';

// Define Style
const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const Alerts = () => {
  // Alert Context
  const alertContext = useContext(AlertContext);

  // Style
  const classes = useStyles();

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Alert key={alert.id} severity={alert.type} className={classes.alert}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
