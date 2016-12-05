import React from 'react';
import ReactDOM from 'react-dom';
require('@blueprintjs/core/dist/blueprint.css');
require('./styles/stylesheet.css');

import Login from './views/Login';
import Signup from './views/Signup';
import TabBar from './containers/TabBar';

// import Perf from 'react-addons-perf';
// window.Perf = Perf;
// Perf.start();

ReactDOM.render(<TabBar/>,document.getElementById('app'));
