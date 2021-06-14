import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';

import { setAuthorizationToken } from './helpers/setAuthorizationToken';

//redux config
import { Provider } from 'react-redux';
import store from './helpers/store';

const jwtToken = localStorage.getItem('token');
if (jwtToken) {
  setAuthorizationToken(jwtToken);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
