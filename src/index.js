import React from 'react';
import ReactDOM from 'react-dom';
require('@blueprintjs/core/dist/blueprint.css');
require('./styles/stylesheet.css');

import Login from './views/Login';
import SellerDetails from './views/SellerDetails';
import Signup from './views/Signup';
import VerifyOtp from './views/VerifyOtp';
import TaxDetails from './views/TaxDetails';
import PaymentDetails from './views/PaymentDetails';
import POCDetails from './views/POCDetails';
import SellerInterview from './views/SellerInterview';
import TnC from './views/TnC';

ReactDOM.render(<SellerInterview/>,document.getElementById('app'));
