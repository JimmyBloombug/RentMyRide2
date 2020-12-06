import React, { useEffect, useContext } from 'react';

// Context
import AuthContext from '../../context/auth/authContext';

const LoadUser = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return props.children;
};

export default LoadUser;
