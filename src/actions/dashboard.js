import {SELECT_DASHBOARD_TAB} from '../constant';

const selectDashboardTab = (value) => ({
  type: SELECT_DASHBOARD_TAB,
  payload: value
});

export default selectDashboardTab;
