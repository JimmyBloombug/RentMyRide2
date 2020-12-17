import React, { useEffect, useContext } from 'react';

// Context
import AuthContext from '../../context/auth/authContext';

const LoadUser = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    console.log('test');
    // eslint-disable-next-line
  }, []);

  return <div>{props.children}</div>;
};

export default LoadUser;
