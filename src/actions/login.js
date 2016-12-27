import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, LOGOUT, RESTORE_LOGIN } from '../constant';
import {push} from 'react-router-redux';
import {forgotPassword, newPasswordUrl, url} from "../constants";
import {showFloatingNotification} from './generic';
import 'whatwg-fetch';

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
    payload:{
      isAuthenticating: true,
      showCallout: true,
      calloutText: "Logging in",
      intent: "pt-intent-primary",
      buttonDisabled: true
    }
  };
};

const loginUserSuccess = (response) => {
  localStorage.setItem('token', response.token);
  localStorage.setItem('user_id', response.merchant._id);
  localStorage.setItem('email_verified', response.merchant.email_verified);
  localStorage.setItem('registration_complete', response.merchant.registration_complete);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: response.token,
      user: response.merchant._id,
      email_verified: response.merchant.email_verified,
      registration_complete: response.merchant.registration_complete,
      isAuthenticating: false,
      isAuthenticated: true,
      showCallout: false,
      buttonDisabled: false
    }
  };
};

const loginUserFailure = (error) => {
  console.log(error);
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      isAuthenticating: false,
      calloutText: 'Incorrect Login Credentials',
      showCallout: true,
      intent: "pt-intent-danger",
      buttonDisabled: false
    }
  };
};



export const loginUser = (email, password, redirect="/registration") => {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return fetch(url + '/api/merchant/login', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa(email + ':' + password)
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      dispatch(loginUserSuccess(response));
      if(response.merchant.registration_complete === true) redirect = "/verification";  //technically, this line is not require cuz when we update userData, the authWrapper willhandle the routing
      if(response.merchant.email_verified === false) redirect = "/verifyEmail"; //this is required as we have not specified an auth =Wrapper for it
      dispatch(push(redirect));
    })
    .catch(error => {
        dispatch(loginUserFailure(error));
    });
  };
};

const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      calloutText: 'Signing up',
      showCallout: true,
      intent: "pt-intent-primary",
      buttonDisabled: true
    }
  };
};

const signupSuccess = () => {
    return{
      type: SIGNUP_SUCCESS,
      payload:{
        showCallout: false
      }
    };
};

const signupFailed = (error) => {
    let calloutText = "Recaptcha failure";
    console.log("insdie signup faied "+ error.message);
    if(error.message.indexOf("Conflict") >= 0){;
      calloutText = "Email already exists"
    }
    return{
      type: SIGNUP_FAILED,
      payload:{
        calloutText: calloutText,
        showCallout: true,
        intent: "pt-intent-danger",
        buttonDisabled: false
      }
    };
};

export const signupUser = (userData, redirect="/verifyEmail") => {
  return function (dispatch) {
    dispatch(signupRequest());
    return fetch(url + '/api/merchant/signup', {
      method:'post',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
        body:JSON.stringify(userData)
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      dispatch(push(redirect));
      dispatch(signupSuccess());
    })
    .catch(error => {
        console.log(error);
        dispatch(signupFailed(error));
    });
  };
};

export const handleReset = (email, redirect="/verifyEmail") => {
  return function(dispatch){
    return fetch(forgotPassword + email, {
      method: 'get',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      dispatch(push(redirect));
    })
    .catch(error => {
      console.log(error);
    });
  }
}

const resetPasswordSuccess = () => {
    return{
      type: RESET_PASSWORD_SUCCESS,
      payload: {
        showCallout: false,
        buttonDisabled: false,
        showFloatingNotification: true
      }
    }
}

const resetPasswordFailed = () => {
  return{
    type: RESET_PASSWORD_FAILED,
    payload:{
      calloutText: 'Invalid request',
      showCallout: true,
      intent: "pt-intent-danger",
      buttonDisabled: false,
    }
  }
}

export const handleNewPassword = (password, token, redirect="/") => {
  return function(dispatch){
    return fetch(newPasswordUrl + token , {
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({new_password: password})
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      dispatch(resetPasswordSuccess());
      dispatch(showFloatingNotification("New password set", "pt-intent-success", 3000))
      dispatch(push(redirect));
    })
    .catch(error => {
      console.log(error);
      dispatch(resetPasswordFailed());
    });
  }
}

export const logout = () => {
  return({
      type: LOGOUT,
      payload: {
        token: null,
        user: false,
        isAuthenticated: false
      }
  });
}
export const handleLogout = () => {
  return function(dispatch){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email_verified');
    localStorage.removeItem('registration_complete');
    dispatch(logout());
    window.location.href ="/";
  }
}


export const restoreLogin = () => {
  console.log("Restoring Login");
  return{
    type: RESTORE_LOGIN,
    payload: {
      user: localStorage.getItem('user_id') === 'false'? false: localStorage.getItem('user_id'),
      token: localStorage.getItem('token'),
      email_verified: localStorage.getItem('email_verified') === 'false'? false: true,
      registration_complete: localStorage.getItem('registration_complete') === 'false'? false: true
    }
  }
}
