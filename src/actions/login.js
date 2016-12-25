import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNUP_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, LOGOUT } from '../constant';
import {push} from 'react-router-redux';
import {forgotPassword, newPasswordUrl, url} from "../constants";
import {showFloatingNotification} from './generic';

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  };
};

const loginUserSuccess = (response) => {
  localStorage.setItem('token', response.token);
  localStorage.setItem('user_id', response.merchant._id);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      response: response
    }
  };
};

const loginUserFailure = (error) => {
  console.log("failure");
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
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
      if(response.merchant.registration_complete === true) redirect = "/verification";
      if(response.merchant.email_verified === false) redirect = "/verifyEmail";
      dispatch(push(redirect));
    })
    .catch(error => {
        dispatch(loginUserFailure(error));
    });
  };
};

const signupUserRequest = () => {
  return {
    type: SIGNUP_REQUEST
  };
};

export const signupUser = (userData, redirect="/verifyEmail") => {
  return function (dispatch) {
    dispatch(signupUserRequest());
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
      dispatch({
        type: SIGNUP_SUCCESS
      });
    })
    .catch(error => {
        console.log(error);
        dispatch({
          type: SIGNUP_FAILED
        });
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
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      })
      dispatch(showFloatingNotification("New password set", "pt-intent-success", 3000))
      dispatch(push(redirect));
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: RESET_PASSWORD_FAILED
      })
    });
  }
}

export const handleLogout = () => {
  return function(dispatch){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    dispatch(push("/"));
    return {
      type: LOGOUT
    }
  }
}
