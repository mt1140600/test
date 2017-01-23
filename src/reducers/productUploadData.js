import {createReducer} from '../utils';
import { Map, List } from 'immutable';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS} from '../constant';

const initialState = Map({
    keyValue: Map(),
    selectedCommonFields: List()
});

export default createReducer(initialState, {
    [GET_PRODUCT_KEY_VALUES]: (state, payload) => {
        return state.mergeDeep({keyValue:payload})
    },
    [SELECT_COMMON_FIELDS]: (state, payload) => {
      console.log("payload is "+ payload);
      return state.set("selectedCommonFields", payload);
    }
});
