import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.userData,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/login',
  predicate: userData => userData.user,
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.userData,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/dashboard',
  predicate: userData => !userData.user,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
});

export const VisibleOnlyAdmin = UserAuthWrapper({
  authSelector: state => state.userData,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: user => user.isAdmin,
  FailureComponent: null
});