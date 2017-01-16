import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico');
import { syncHistoryWithStore } from 'react-router-redux';
import * as firebase from 'firebase';

// import Perf from 'react-addons-perf';
// window.Perf = Perf;
// Perf.start();
const store = configureStore();

if(process.env.NODE_ENV === 'production') console.log = function(){};

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

//Initialising firebase
var config = {
  apiKey: "AIzaSyBfe2cPpkCVcbkB0HVgmTT9jRQ409dSzOA",
  authDomain: "prokure-chat.firebaseapp.com",
  databaseURL: "https://prokure-chat.firebaseio.com",
  storageBucket: "prokure-chat.appspot.com"
};
firebase.initializeApp(config);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
