import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import NavbarState from './context/navbar/NavbarState';
import AuthState from './context/auth/AuthState';

// Components
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <NavbarState>
      <AuthState>
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
      </AuthState>
    </NavbarState>
  );
}

export default App;
