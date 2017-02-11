import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.userData,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  predicate: userData => (typeof(userData.user) !== "undefined") && (userData.user !== false),
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.userData,
  redirectAction: routerActions.replace,
  failureRedirectPath: state => (state.userData.registration_complete === true ?'/verification':'/registration'),
  predicate: userData => typeof(userData.user) === "undefined" || userData.user === false,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
});

export const UserIsEmailVerified = UserAuthWrapper({
  authSelector: state => state.userData,
  redirectAction: routerActions.replace,
  failureRedirectPath: "/verifyEmail",
  predicate: userData => {return userData.email_verified},
  wrapperDisplayName: 'UserIsEmailVerified',
  allowRedirectBack: false
});

export const VisibleOnlyAdmin = UserAuthWrapper({
  authSelector: state => state.userData,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: userData => userData.isAdmin,
  FailureComponent: null
});

export const UserIsApproved = UserAuthWrapper({
  authSelector: state => state.userData,
  wrapperDisplayName: 'UserIsApproved',
  predicate: userData => userData.isApproved,
  failureRedirectPath: state => (state.userData.registration_complete === true ?'/verification':'/registration')
});
