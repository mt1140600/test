import {SET_CASCADED_TAB_VISIBILITY} from '../constant';

const initial_state = [ true, false, false ];

const cascadedDisplay = (state = initial_state , action) => {
  let newTabsVisible;
  switch(action.type){
    case SET_CASCADED_TAB_VISIBILITY :
      newTabsVisible = [ ...state ];
      newTabsVisible[action.payload.index] = action.payload.value;
      return newTabsVisible;
    // break;
    default:
      return state;
  }
}

export default cascadedDisplay;
