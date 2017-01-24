import {firebaseApp} from './firebase';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS, SELECT_CATEGORY, HANDLE_STEP_TWO_STATE_CHANGE, REMOVE_SELECTED_FIELD} from '../constant';

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

export const removeSelectedField = (value) => {
  return{
    type: REMOVE_SELECTED_FIELD,
    payload: value
  }
}
