import {firebaseApp} from './firebase';
import {GET_PRODUCT_KEY_VALUES} from '../constant';

export const getKeyValueData = (key) => {
  return (dispatch, state) => {
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