import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store from './Store/store.js';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './Routes.js';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
