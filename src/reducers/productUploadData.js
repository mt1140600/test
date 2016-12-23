import {createReducer} from '../utils';
import { Map } from 'immutable';
import {GET_PRODUCT_KEY_VALUES} from '../constant';

const initialState = Map({
    keyValue:Map()
});

export default createReducer(initialState, {
    [GET_PRODUCT_KEY_VALUES]: (state, payload) => {
        return state.mergeDeep({keyValue:payload})
    }
});
