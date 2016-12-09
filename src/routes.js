import React from 'react';
import { Route, IndexRoute } from 'react-router';
import TabLayout from './containers/TabLayout';
import AccountSetup from './containers/AccountSetup';
import App from './components/App';
import Signup from './views/Signup';
import Login from './views/Login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="/signup" component={Signup} />
    <Route path="registration" component={AccountSetup}>
      <IndexRoute component={TabLayout} />
    </Route>
  </Route>
);