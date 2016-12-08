import React from 'react';
import ReactDOM from 'react-dom';
require('@blueprintjs/core/dist/blueprint.css');
require('./styles/stylesheet.css');

import Login from './views/Login';
import Signup from './views/Signup';
import AccountSetup from './containers/AccountSetup';
import ProductUpload from './containers/ProductUpload';
import Dummy from './components/Dummy'
import LabelledCheckboxGroup from './components/LabelledCheckboxGroup'
// import Perf from 'react-addons-perf';
// window.Perf = Perf;
// Perf.start();

ReactDOM.render(<ProductUpload/>,document.getElementById('app'));
