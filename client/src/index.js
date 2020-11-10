import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import Theme from './styles/Theme';
import './styles/App.css';

// Components
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
