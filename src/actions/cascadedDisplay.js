import {SET_CASCADED_TAB_VISIBILITY} from '../constant';

const cascadedDisplay = ( index, value ) => {

  return {
    type: SET_CASCADED_TAB_VISIBILITY,
    payload: {
      index: index,
      value: value
    }
  }

}

export default cascadedDisplay;
