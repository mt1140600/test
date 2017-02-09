import { FETCH_UPLOADS, UPLOAD_HISTORY_SET_SEARCH_SPECS  } from '../constant';
import Immutable from 'immutable';

const initial_state = {
  searchSpecs: {
    category: "Choose category",
    from: null,
    to: null,
    search_text: ""
  },
  uploads: []
};

const uploadHistory = (state = initial_state, action) => {

  switch(action.type){
      case FETCH_UPLOADS:
        const newPayload = action.payload.uploads;
        return Object.assign({}, state, {orders: newPayload});
      break;
      case UPLOAD_HISTORY_SET_SEARCH_SPECS:
        let newSearchSpecs = Object.assign({}, state.searchSpecs, action.payload.searchSpecs);
        return Object.assign({}, state, {searchSpecs: newSearchSpecs});
      break;
      default:
        return state;
  }

}

export default uploadHistory;
