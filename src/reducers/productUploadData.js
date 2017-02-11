import {createReducer} from '../utils';
import { Map, List } from 'immutable';
import {GET_PRODUCT_KEY_VALUES, SELECT_COMMON_FIELDS, SELECT_CATEGORY, HANDLE_STEP_TWO_STATE_CHANGE, REMOVE_SELECTED_FIELD, SET_PRODUCTS, CLEAR_STEP_TWO_STATE} from '../constant';

const initialState = Map({
    keyValue: Map(),
    selectedCommonFields: List(),
    selectedCategory: null,
    stepTwoState: Map(),
    productSearch: {}
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
    [CLEAR_STEP_TWO_STATE]: (state, payload) => {
      return state.set("stepTwoState", Map(payload));
    },
    [REMOVE_SELECTED_FIELD]: (state, payload) => {
      return state.deleteIn(["stepTwoState", payload]);
    },
    [SET_PRODUCTS]: (state, payload) => {
      return state.set("productSearch", payload);
    }
});
