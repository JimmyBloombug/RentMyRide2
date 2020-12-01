import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';
import Cars from './components/pages/Cars';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import NavbarState from './context/navbar/NavbarState';
import SearchState from './context/search/SearchState';

// Set Auth Token in Axios
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AlertState>
      <NavbarState>
        <AuthState>
          <SearchState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute exact path='/profile/cars' component={Cars} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </SearchState>
        </AuthState>
      </NavbarState>
    </AlertState>
  );
}

export default App;
