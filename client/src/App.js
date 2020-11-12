import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import NavbarState from './context/navbar/NavbarState';

// Set Auth Token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <NavbarState>
      <AuthState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AuthState>
    </NavbarState>
  );
}

export default App;
