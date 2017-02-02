import {SELECT_DASHBOARD_TAB, COLLAPSE_VERTICAL_TAB_BAR} from '../constant';

export const selectDashboardTab = (value) => ({
  type: SELECT_DASHBOARD_TAB,
  payload: value
});

export const collapseVerticalTabBar = (value) => ({
  type: COLLAPSE_VERTICAL_TAB_BAR,
  payload: value
})
