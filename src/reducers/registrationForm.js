export const tabReducer = (state = 0, action) => {
  switch(action.type){
    case "Set Registration Tab":
      return action.value;
    break;

    default:
      return state;
  }
}
