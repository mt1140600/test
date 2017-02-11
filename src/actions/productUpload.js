import {firebaseApp} from './firebase';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS, SELECT_CATEGORY, HANDLE_STEP_TWO_STATE_CHANGE, REMOVE_SELECTED_FIELD, SET_PRODUCTS, CLEAR_STEP_TWO_STATE} from '../constant';
import * as constants from '../constants';
import { checkHttpStatus, parseJSON } from '../utils';
import 'whatwg-fetch';

export const getKeyValueData = (key) => {
  return (dispatch) => {
    const database = firebaseApp.database();
    database.ref('keyValues/' + key).on('value', (snapshot) => {
      let payload = {};
      payload[key] = snapshot.val();
      dispatch({
        type:GET_PRODUCT_KEY_VALUES,
        payload: payload
      });
    }, (err) => {
      console.log("This read failed "  + err.code);
    })
  }
}

export const getMulitpleKeyValueData = (keys) => {
  return (dispatch) => {
    const keyValuesRef =  firebaseApp.database().ref('keyValues/');
    keys.forEach((key) => {
      keyValuesRef.child(key).on('value',(snapshot) => {
        let payload = {};
        payload[key] = snapshot.val();
        dispatch({
          type:GET_PRODUCT_KEY_VALUES,
          payload:payload
        });
      });
    })
  }
}

export const selectCommonFields = (value) => {
  return{
    type: SELECT_COMMON_FIELDS,
    payload: value
  }
}

export const selectCategory = (value) => {
  return{
    type: SELECT_CATEGORY,
    payload: value
  }
}

export const handleStepTwoStateChange = (value) => {
  return{
    type: HANDLE_STEP_TWO_STATE_CHANGE,
    payload: value
  }
}

export const clearStepTwoState = () => {
  return{
    type: CLEAR_STEP_TWO_STATE,
    payload: {}
  }
}

export const removeSelectedField = (value) => {
  return{
    type: REMOVE_SELECTED_FIELD,
    payload: value
  }
}

export const setProducts  = (value) => {
  console.log("setProducts");
  return {
    type: SET_PRODUCTS,
    payload: value
  };
}

export const searchProduct = (value) => {
  console.log("search for product "+ value);
  return (dispatch) => {
    return fetch(constants.searchProduct+value, {
        method: 'get',
        headers: {
          'Content-Type' : 'application/json',
          // 'Authorization' : localStorage.getItem('token')
        }
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => { dispatch(setProducts(response)); })
      .catch(error => {console.log("Failed to fetch products "+error); })
  }
}

export const uploadProducts = (value) => {  //pseudo action. doesn't talk to redux
  console.log("uploading prodcuts: ", value);
  return fetch(constants.uploadProducts, {
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(value)
  })
  .then(checkHttpStatus)
  .then(parseJSON)
  .then(response => { console.log(response); })
  .catch(error => {console.log("Failed to upload products "+error); })
}
