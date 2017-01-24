import {createReducer} from '../utils';
import { Map, List } from 'immutable';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS, SELECT_CATEGORY, HANDLE_STEP_TWO_STATE_CHANGE, REMOVE_SELECTED_FIELD} from '../constant';

const initialState = Map({
    keyValue: Map(),
    selectedCommonFields: List(),
    selectedCategory: null,
    stepTwoState: Map()
});

export default createReducer(initialState, {
    [GET_PRODUCT_KEY_VALUES]: (state, payload) => {
        return state.mergeDeep({keyValue:payload})
    },
    [SELECT_COMMON_FIELDS]: (state, payload) => {
      return state.set("selectedCommonFields", payload);
    },
    [SELECT_CATEGORY]: (state, payload) => {
      return state.set("selectedCategory", payload);
    },
    [HANDLE_STEP_TWO_STATE_CHANGE]: (state, payload) => {
      return state.mergeDeep({stepTwoState: payload});
    },
    [REMOVE_SELECTED_FIELD]: (state, payload) => {
      return state.deleteIn(["stepTwoState", payload]);
    }
});
