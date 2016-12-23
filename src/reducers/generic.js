import {SHOW_FLOATING_NOTIFICATION, HIDE_FLOATING_NOTIFICATION} from '../constant';

const floatingNotification_initialState = {
  message:  "",
  intent: "",
  active: false,
  duration: 0
}

const floatingNotification = (state = floatingNotification_initialState, action) => {

  switch(action.type){
      case SHOW_FLOATING_NOTIFICATION:
        return Object.assign({}, action.payload, { active: true });
      break;

      case HIDE_FLOATING_NOTIFICATION:
        return floatingNotification_initialState;
      break;

      default:
        return state;
  }

}

export default floatingNotification;
