import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData:userData
});

export default rootReducer;