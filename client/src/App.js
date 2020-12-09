import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import LoadUser from './components/auth/LoadUser';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import NavbarState from './context/navbar/NavbarState';
import SearchState from './context/search/SearchState';
import CarState from './context/cars/CarState';

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
            <CarState>
              <LoadUser>
                <Router>
                  <Fragment>
                    <Navbar />
                    <div className='container'>
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <PrivateRoute
                          exact
                          path='/profile/'
                          component={Profile}
                        />
                      </Switch>
                    </div>
                  </Fragment>
                </Router>
              </LoadUser>
            </CarState>
          </SearchState>
        </AuthState>
      </NavbarState>
    </AlertState>
  );
}

export default App;
