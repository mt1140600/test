import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../constant';
import {push} from 'react-router-redux';
import * as config from '../config';

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  };
};

const loginUserSuccess = (response) => {
  localStorage.setItem('token', response.value);
  localStorage.setItem('user_id', response.userId);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      response: response
    }
  };
};

const loginUserFailure = (error) => {
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



export const loginUser = (email, password, redirect="/") => {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return fetch(config.apiURL + '/api/merchant/login', {
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
      dispatch(push(redirect));
    })
    .catch(error => {
        dispatch(loginUserFailure(error));
    });
  };
};