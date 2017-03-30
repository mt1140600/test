import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import productUploadData from './productUploadData';
import floatingNotification, {notificationsLog} from './generic';
import * as registrationForm from './registrationForm';
import orderManagement from './orderManagement';
import uploadHistoryData from './uploadHistory';
import cascadedDisplay from './cascadedDisplay';
import dashboard from './dashboard.js';
import {reducer as notificationsReducer} from 'reapop';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  dashboard: dashboard,
  productUploadData: productUploadData,
  uploadHistoryData: uploadHistoryData,
  notificationsLog: notificationsLog,
  registrationPrevTab: registrationForm.prevTabReducer,
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
