import {firebaseApp} from './firebase';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS} from '../constant';

export const getKeyValueData = (key) => {
  return (dispatch) => {
    const database = firebaseApp.database();
    database.ref('keyValues/' + key).on('value', (snapshot) => {
      let payload = {};
      payload[key] = snapshot.val();
      dispatch({
        type:GET_PRODUCT_KEY_VALUES,
        payload:payload
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
