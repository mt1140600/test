import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsAuthenticated, UserIsAdmin } from './utils/authWrappers.js'


import TabLayout from './containers/TabLayout';
import AccountSetup from './containers/AccountSetup';
import App from './components/App';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import Login from './views/Login';
import ProductUpload from './containers/ProductUpload';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="signup" component={Signup} />
    <Route path="reset" component={ResetPassword} />
    <Route path="registration" component={AccountSetup}/>
    <Route path="upload" component={ProductUpload} />
  </Route>
);