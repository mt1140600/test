import {SHOW_FLOATING_NOTIFICATION, HIDE_FLOATING_NOTIFICATION} from '../constant';

export const showFloatingNotification = (message, intent="pt-intent-danger", duration=3000) => {
  console.log("inside action");
  console.log(duration);
  return{
    type: SHOW_FLOATING_NOTIFICATION,
    payload: {
      message,
      intent,
      duration
    }
  }
}

export const hideFloatingNotification = () => {
  return{
    type: HIDE_FLOATING_NOTIFICATION,
    payload: {
    }
  }
}
