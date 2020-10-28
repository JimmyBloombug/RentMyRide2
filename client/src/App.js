import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './components/pages/Home';

// CSS
import './css/App.css';

function App() {
  return (
    <Router>
      <Fragment>
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
