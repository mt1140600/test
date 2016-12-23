import {createReducer} from '../utils';
import { Map } from 'immutable';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_REQUEST} from '../constant';

const initialState = Map({
    token: null,
    user: false,
    isAuthenticated: false,
    isAuthenticating: false,
    calloutText: '',
    showCallout:false
});

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return {
          token: null,
          user: false,
          isAuthenticated: true,
          isAuthenticating: false,
          calloutText: 'Logging in',
          showCallout:true,
          intent: "pt-intent-primary"
        };
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return {
          token: payload.response.token,
          user: payload.response.merchant._id,
          isAuthenticated: true,
          calloutText: '',
          showCallout: false
        };

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return {
          token: null,
          user: false,
          isAuthenticated: false,
          isAuthenticating: false,
          calloutText: 'Incorrect Login Credentials',
          showCallout: true,
          intent: "pt-intent-danger"
        };
    },
    [LOGOUT_USER]: (state, payload) => {
        return state;
    },
    [SIGNUP_SUCCESS]: (state, payload = null) => {
      return state;
    },
    [SIGNUP_REQUEST]: (state, payload = null) => {
      return{
        token: null,
        user: false,
        isAuthenticated: false,
        isAuthenticating: false,
        calloutText: 'Signing up',
        showCallout: true,
        intent: "pt-intent-primary"
      }
    },
    [SIGNUP_FAILED]: (state, payload = null) => {
      return{
        token: null,
        user: false,
        isAuthenticated: false,
        isAuthenticating: false,
        calloutText: 'Email already exists',
        showCallout: true,
        intent: "pt-intent-danger"
      }
    }
});
