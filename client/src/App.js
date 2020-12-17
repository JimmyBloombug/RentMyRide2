import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';
import Offer from './components/pages/Offer';
import Profile from './components/pages/Profile';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import LoadUser from './components/auth/LoadUser';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import NavbarState from './context/navbar/NavbarState';
import QueryState from './context/query/QueryState';
import ProfileState from './context/profile/ProfileState';

// Set Auth Token in Axios
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AlertState>
      <NavbarState>
        <AuthState>
          <QueryState>
            <ProfileState>
              <LoadUser>
                <Router>
                  <Fragment>
                    <div className='container'>
                      <Navbar />
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/offer' component={Offer} />
                        <PrivateRoute
                          exact
                          path='/profile'
                          component={Profile}
                        />
                      </Switch>
                      <Footer />
                    </div>
                  </Fragment>
                </Router>
              </LoadUser>
            </ProfileState>
          </QueryState>
        </AuthState>
      </NavbarState>
    </AlertState>
  );
}

export default App;
