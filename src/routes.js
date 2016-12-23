import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/authWrappers.js'
import AccountSetup from './containers/AccountSetup';
import App from './components/App';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import ResetPassword2 from './views/ResetPassword2';
import Login from './views/Login';
import ProductUpload from './containers/ProductUpload';
import Verification from './views/Verification';
import VerifyEmail from './views/VerifyEmail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UserIsNotAuthenticated(Login)}/>
    <Route path="signup" component={UserIsNotAuthenticated(Signup)} />
    <Route path="verifyEmail" component={UserIsNotAuthenticated(VerifyEmail)} />
    <Route path="reset" component={UserIsNotAuthenticated(ResetPassword)} />
    <Route path="reset2" component={UserIsNotAuthenticated(ResetPassword2)} />
    <Route path="registration" component={UserIsAuthenticated(AccountSetup)}/>
    <Route path="verification" component={UserIsAuthenticated(Verification)} />
    <Route path="dashboard" component={UserIsAuthenticated(ProductUpload)} />
  </Route>

  // <Route path="/" component={App}>
  //   <IndexRoute component={Login}/>
  //   <Route path="signup" component={Signup} />
  //   <Route path="verifyEmail" component={VerifyEmail} />
  //   <Route path="reset" component={ResetPassword} />
  //   <Route path="registration" component={AccountSetup}/>
  //   <Route path="verification" component={Verification} />
  //   <Route path="dashboard" component={ProductUpload} />
  //   <Route path="reset2" component={ResetPassword2} />
  //   <Route path="dummy" component={Dummy} />
  // </Route>
);
