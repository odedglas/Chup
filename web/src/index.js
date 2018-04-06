import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

import './assets/styles/bootstrap.css';
import './assets/styles/font-awesome.css';
import './assets/styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);