import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/authWrappers.js'


import TabLayout from './containers/TabLayout';
import AccountSetup from './containers/AccountSetup';
import App from './components/App';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import Login from './views/Login';
import ProductUpload from './containers/ProductUpload';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UserIsNotAuthenticated(Login)}/>
    <Route path="signup" component={UserIsNotAuthenticated(Signup)} />
    <Route path="reset" component={UserIsNotAuthenticated(ResetPassword)} />
    <Route path="registration" component={UserIsAuthenticated(ProductUpload)}/>
    <Route path="dashboard" component={UserIsAuthenticated(ProductUpload)} />
  </Route>
);