import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import floatingNotification from './generic';
import * as registrationForm from './registrationForm';
import orderManagement from './orderManagement';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  registrationCurrentTab: registrationForm.tabReducer,
  verifyOtp: registrationForm.verifyOtp,
  sellerInfo: registrationForm.sellerInfo,
  taxDetails: registrationForm.taxDetails,
  paymentDetails: registrationForm.paymentDetails,
  pocDetails: registrationForm.pocDetails,
  addlInfo: registrationForm.addlInfo,
  tabValidation: registrationForm.tabValidation,
  floatingNotification: floatingNotification,
  orders: orderManagement
});

export default rootReducer;
