import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsAuthenticated, UserIsNotAuthenticated, UserIsEmailVerified } from './utils/authWrappers.js'
import AccountSetup from './containers/AccountSetup';
import App from './components/App';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import ResetPassword2 from './views/ResetPassword2';
import Login from './views/Login';
import ProductUpload from './containers/ProductUpload';
import Verification from './views/Verification';
import LabelledAutoComplete from './components/LabelledAutoComplete';
import MultipleImageUpload from './components/MultipleImageUpload';
import VerifyEmail from './views/VerifyEmail';
import ConfirmItem from './components/ConfirmItem';
import RejectItem from './components/RejectItem';
import DateRangePopover from './components/DateRangePopover';
import UploadProduct from './panelViews/UploadProduct';
import {Orders, New, Confirmed, Dispatched, Cancelled} from './panelViews/OrdersPanel';
import Returns from './panelViews/Returns';
import Completed from './panelViews/Completed';
import Payment from './panelViews/Payment';
import ManageInventory from './panelViews/ManageInventory';
import CascadedDisplay from './components/CascadedDisplay';
import SampleHOC from './components/SampleHOC';
import UploadProductViaSearch from './panelViews/UploadProductViaSearch';
import Test from './components/Test';

export default (
  // <Route path="/" component={App}>
  //   <IndexRoute component={UserIsNotAuthenticated(Login)}/>
  //   <Route path="signup" component={UserIsNotAuthenticated(Signup)} />
  //   <Route path="verifyEmail" component={VerifyEmail} />
  //   <Route path="reset" component={UserIsNotAuthenticated(ResetPassword)} />
  //   <Route path="reset2" component={UserIsNotAuthenticated(ResetPassword2)} />
  //   <Route path="registration" component={UserIsAuthenticated(UserIsEmailVerified(AccountSetup))}/>
  //   <Route path="verification" component={UserIsAuthenticated(UserIsEmailVerified(Verification))} />
  //   <Route path="dashboard" component={UserIsAuthenticated(UserIsEmailVerified(ProductUpload))}>
  //     <IndexRoute component={UploadProduct} />
  //     <Route path="orders" component={Orders} />
  //     <Route path="returns" component={Returns} />
  //     <Route path="completed" component={Completed} />
  //     <Route path="payment" component={Payment} />
  //     <Route path="inventory" component={ManageInventory} />
  //   </Route>
  // </Route>

  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="signup" component={Signup} />
    <Route path="verifyEmail" component={VerifyEmail} />
    <Route path="reset" component={ResetPassword} />
    <Route path="reset2" component={ResetPassword2} />
    <Route path="registration" component={AccountSetup}/>

    <Route path="dashboard" component={ProductUpload}>
      <IndexRoute component={UploadProduct} />
      <Route path="orders" component={Orders}>
        <IndexRoute component={New} />
        <Route path="confirmed" component={Confirmed} />
        <Route path="dispatched" component={Dispatched} />
        <Route path="cancelled" component={Cancelled} />v
      </Route>
      <Route path="returns" component={Returns} />
      <Route path="completed" component={Completed} />
      <Route path="payment" component={Payment} />
      <Route path="inventory" component={ManageInventory} />
    </Route>

    <Route path="auto" component={LabelledAutoComplete} />
    <Route path="image" component={MultipleImageUpload} />
    <Route path="verification" component={Verification} />
    <Route path="hoc" component={SampleHOC} />
    <Route path="search" component={UploadProductViaSearch} />
    <Route path="test" component={Test} />
  </Route>
);
