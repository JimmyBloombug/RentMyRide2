import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';

// CSS
import 'semantic-ui-css/semantic.min.css';
import './css/App.css';

function App() {
  return (
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
  );
}

export default App;
