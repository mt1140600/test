import {createReducer} from '../utils';
import { Map } from 'immutable';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../constant';

const initialState = Map({
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    calloutText: '',
    showCallout:false
});

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return state;
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return state;

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return state;
    },
    [LOGOUT_USER]: (state, payload) => {
        return state;
    }
});
