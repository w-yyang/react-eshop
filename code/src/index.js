import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';

import './assets/common.css';
import 'antd-mobile/dist/antd-mobile.less';
import store from './stores/stores';
import App from './App.jsx';

FastClick.attach(document.body);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

