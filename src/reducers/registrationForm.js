export const tabReducer = (state = 0, action) => {
  switch(action.type){
    case "Set Registration Tab":
      return action.value;
    break;

    default:
      return state;
  }
}

const sellerInfo_initialState = {
  storeName:"",
  pincode:"",
  add1:"",
  add2:"",
  state:"Choose State",
  city:"",
  wadd1:"",
  wadd2:"",
  wpincode:"",
  wstate:"Choose State",
  wcity:"",
  category:"Choose Primary Category",
  workingDays: [],
  operationalHours:["8","am","5","pm"]
}

export const sellerInfo = (state = sellerInfo_initialState, action) => {
  switch(action.type){
    case "Update Seller Info":
      return Object.assign({}, state, action.payload);
    break;

    default:
      return state;
    break;
  }
}
