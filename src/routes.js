import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './views/Login';
import TabLayout from './containers/TabLayout';
import AccountSetup from './containers/AccountSetup'
import App from './components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="registration" component={AccountSetup}>
      <IndexRoute component={TabLayout} />
    </Route>
  </Route>
);