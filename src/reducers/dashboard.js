import {SELECT_DASHBOARD_TAB, COLLAPSE_VERTICAL_TAB_BAR} from '../constant';

const initial_value = {
  currentTab: 0,
  collapsed: false
};

const dashboardReducer = (state = initial_value , action) => {
  switch(action.type){
    case SELECT_DASHBOARD_TAB:
      return Object.assign({}, state, {currentTab: action.payload});
    // break;

    case COLLAPSE_VERTICAL_TAB_BAR:
      return Object.assign({}, state, {collapsed: action.payload});
    // break;

    default:
      return state;
  }
}

export default dashboardReducer;
