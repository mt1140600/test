import SELECT_DASHBOARD_TAB from '../constant';

const initial_value = 0;
const dashboardReducer = (state = initial_value , action) => {
  switch(action.type){
    case 'SELECT_DASHBOARD_TAB':
      return action.payload
    break;
    default:
      return state;
  }
}

export default dashboardReducer;
