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
  vState:{
    storeName: false,
    pincode: false,
    add1: false,
    add2: true,
    state: false,
    city: false,
    wadd1:false,
    wadd2:true,
    wpincode:false,
    wstate:false,
    wcity:false,
    category:false,
    workingDays:true,
    operationalHours:true
  },
  value:{
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
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    operationalHours:["8","am","5","pm"]
  }

}

export const sellerInfo = (state = sellerInfo_initialState, action) => {
  switch(action.type){
    case "Update Seller Info":
      const vStateObj = Object.assign({}, state.vState, {[`${action.payload.field}`]: action.payload.vState});
      const valueObj = Object.assign({}, state.value, {[`${action.payload.field}`]: action.payload.value});
      return {vState: vStateObj, value: valueObj};
    break;

    default:
      return state;
    break;
  }
}
