import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import * as registrationForm from './registrationForm';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  registrationCurrentTab: registrationForm.tabReducer,
  sellerInfo: registrationForm.sellerInfo,
  taxDetails: registrationForm.taxDetails
});

export default rootReducer;
