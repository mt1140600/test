import { FETCH_ORDERS, SET_SEARCH_SPECS  } from '../constant';

const initial_state = {
  searchSpecs: {},
  orders: []
};

const orderManagement = (state = initial_state, action) => {

  switch(action.type){
      case FETCH_ORDERS:
        return Object.assign({}, state, action.payload);
      break;
      case SET_SEARCH_SPECS:
        return Object.assign({}, state, action.payload);
      break;
      default:
        return state;
  }

}

export default orderManagement;
