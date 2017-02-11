import {createReducer} from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, LOGOUT, RESTORE_LOGIN} from '../constant';

const initialState = {
    token: null,
    user: false,
    isAdmin: false,
    isAuthenticated: false,
    isAuthenticating: false,
    calloutText: '',
    showCallout:false,
    intent: "pt-intent-danger",
    buttonDisabled: false
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state, payload) => (Object.assign({}, state, payload)),
  [LOGIN_USER_SUCCESS]: (state, payload) => (Object.assign({}, state, payload)),
  [LOGIN_USER_FAILURE]: (state, payload) => (Object.assign({}, state, payload)),
  [LOGOUT_USER]: (state, payload) => (Object.assign({}, state, payload)),
  [SIGNUP_SUCCESS]: (state, payload) => (Object.assign({}, state, payload)),
  [SIGNUP_FAILED]: (state, payload) => (Object.assign({}, state, payload)),
  [SIGNUP_REQUEST]: (state, payload) => (Object.assign({}, state, payload)),
  [RESET_PASSWORD_SUCCESS]: (state, payload) => (Object.assign({}, state, payload)),
  [RESET_PASSWORD_FAILED]: (state, payload) => (Object.assign({}, state, payload)),
  [LOGOUT]: (state, payload) => (Object.assign({}, state, payload)),
  [RESTORE_LOGIN]: (state, payload) => (Object.assign({}, state, payload))
});


// export default createReducer(initialState, {
//     [LOGIN_USER_REQUEST]: (state, payload) => {
//         return {
//           token: null,
//           user: false,
//           isAuthenticated: false,
//           isAuthenticating: true,
//           calloutText: 'Logging in',
//           showCallout:true,
//           intent: "pt-intent-primary",
//           buttonDisabled: true
//         };
//     },
//     [LOGIN_USER_SUCCESS]: (state, payload) => {
//         return {
//           token: payload.response.token,
//           user: payload.response.merchant._id,
//           email_verified: payload.response.merchant.email_verified,
//           registration_complete: payload.response.merchant.registration_complete,
//           isAuthenticated: true,
//           calloutText: '',
//           showCallout: false,
//           buttonDisabled: false
//         };
//
//     },
//     [LOGIN_USER_FAILURE]: (state, payload) => {
//         return {
//           token: null,
//           user: false,
//           isAuthenticated: false,
//           isAuthenticating: false,
//           calloutText: 'Incorrect Login Credentials',
//           showCallout: true,
//           intent: "pt-intent-danger",
//           buttonDisabled: false
//         };
//     },
//     [LOGOUT_USER]: (state, payload) => {
//         return state;
//     },
//     [SIGNUP_SUCCESS]: (state, payload = null) => {
//       return state;
//     },
//     [SIGNUP_REQUEST]: (state, payload = null) => {
//       return{
//         token: null,
//         user: false,
//         isAuthenticated: false,
//         isAuthenticating: false,
//         calloutText: 'Signing up',
//         showCallout: true,
//         intent: "pt-intent-primary",
//         buttonDisabled: true
//       }
//     },
//     [SIGNUP_FAILED]: (state, payload = null) => {
//       return{
//         token: null,
//         user: false,
//         isAuthenticated: false,
//         isAuthenticating: false,
//         calloutText: 'Email already exists',
//         showCallout: true,
//         intent: "pt-intent-danger",
//         buttonDisabled: false
//       }
//     },
//     [RESET_PASSWORD_FAILED]: (state, payload = null) => {
//       return{
//         token: null,
//         user: false,
//         isAuthenticated: false,
//         isAuthenticating: false,
//         calloutText: 'Invalid request',
//         showCallout: true,
//         intent: "pt-intent-danger",
//         buttonDisabled: false,
//         showFloatingNotification: false
//       }
//     },
//     [RESET_PASSWORD_SUCCESS]: (state, payload = null) => {
//       return{
//         token: null,
//         user: false,
//         isAuthenticated: false,
//         isAuthenticating: false,
//         calloutText: '',
//         showCallout: false,
//         intent: "pt-intent-danger",
//         buttonDisabled: false,
//         showFloatingNotification: true
//       }
//     },
//     [LOGOUT]: (state, payload) => {
//       return{
//         token: null,
//         user: false,
//         isAuthenticated: false,
//         isAuthenticating: false,
//         calloutText: '',
//         showCallout:false,
//         intent: "pt-intent-danger",
//         buttonDisabled: false
//       }
//     },
//     [RESTORE_LOGIN]: (state, payload) => {
//       return{
//         token: payload.token,
//         user: payload.user
//       }
//     }
// });
