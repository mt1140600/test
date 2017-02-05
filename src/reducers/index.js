import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import productUploadData from './productUploadData';
import floatingNotification, {notificationsLog} from './generic';
import * as registrationForm from './registrationForm';
import orderManagement from './orderManagement';
import cascadedDisplay from './cascadedDisplay';
import dashboard from './dashboard.js';
import {reducer as notificationsReducer} from 'reapop';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  dashboard: dashboard,
  productUploadData: productUploadData,
  notificationsLog: notificationsLog,

  registrationCurrentTab: registrationForm.tabReducer,
  verifyOtp: registrationForm.verifyOtp,
  sellerInfo: registrationForm.sellerInfo,
  taxDetails: registrationForm.taxDetails,
  paymentDetails: registrationForm.paymentDetails,
  pocDetails: registrationForm.pocDetails,
  addlInfo: registrationForm.addlInfo,
  tabValidation: registrationForm.tabValidation,

  floatingNotification: floatingNotification,
  ordersData: orderManagement,
  cascadedDisplay: cascadedDisplay,
  notifications: notificationsReducer()
});

export default rootReducer;
