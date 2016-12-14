import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import {tabReducer} from './registrationForm';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  registrationCurrentTab: tabReducer

});

export default rootReducer;
