/* eslint-disable */
export const tabReducer = (state = 0, action) => {
  switch(action.type){
    case "Set Registration Tab":
      return action.value;
    // break;
    
    default:
      return state;
  }
}

export const prevTabReducer = (state=0, action) =>{
  switch(action.type){
    case "Set Previous Tab":
      return action.value;

    default:
      return state;
  }
}

function createReducer(initialState, actionName){

  return (state = initialState, action) => {
    switch(action.type){
      case actionName:
        const vStateObj = Object.assign({}, state.vState, {[`${action.payload.field}`]: action.payload.vState});
        const valueObj = Object.assign({}, state.value, {[`${action.payload.field}`]: action.payload.value});
        return {vState: vStateObj, value: valueObj};
      // break;

      default:
        return state;
      // break;
    }
  }

}

const verifyOtp_initialState = {
  vState:{
    phoneNo: null
  },
  value:{
    phoneNo: ""
  }
}

export const verifyOtp = createReducer(verifyOtp_initialState, "Update Verify OTP");

const sellerInfo_initialState = {
  vState:{
    storeName: null,
    businessType: null,
    pincode: null,
    add1: null,
    add2: true,
    state: null,
    city: null,
    wadd1:null,
    wadd2:true,
    wpincode:null,
    wstate:null,
    wcity:null,
    category:null,
    workingDays:true,
    operationalHours:true
  },

  value:{
    storeName:"",
    businessType:"Choose Type",
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

};

export const sellerInfo = createReducer(sellerInfo_initialState, "Update Seller Info");

const taxDetails_initialState = {

  vState:{
    PAN:null,
    VAT:null,
    CST:null,
    panCard:true,
    certIncorp:true,
    membICC:true
  },

  value:{
    PAN:"",
    VAT:"",
    CST:"",
    panCard:"",
    certIncorp:"",
    membICC: []
  }

}

export const taxDetails = createReducer(taxDetails_initialState, "Update Tax Details");

const paymentDetails_initialState = {

  vState: {
    accHolderName:null,
    accNumber:null,
    IFSC:null,
    accType:true,
    cancCheque: null
  },

  value: {
    accHolderName:"",
    accNumber:"",
    IFSC:"",
    accType:"Savings",
    cancCheque:""
  }

}

export const paymentDetails = createReducer(paymentDetails_initialState, "Update Payment Details");

const pocDetails_initialState = {

  vState: {
    POCName:null,
    POCPhone:null,
    POCEmail:true
  },

  value: {
    POCName:"",
    POCPhone:"",
    POCEmail:""
  }

}

export const pocDetails = createReducer(pocDetails_initialState, "Update POC Details");

const addlInfo_intialState = {

  vState: {
    typeOfEstablishment:null,
    annualTurnover:true,
    numberRangeProducts:true,
    otherWebsitesSoldOn:true,
    otherWebsitesSoldOnText:true
  },

  value: {
    typeOfEstablishment:[],
    annualTurnover:"Less than 1 Lakh",
    numberRangeProducts:"1 - 10",
    otherWebsitesSoldOn:[],
    otherWebsitesSoldOnText:""
  }

}

export const addlInfo = createReducer(addlInfo_intialState, "Update Addl Info");

//mobileVerification, sellerInfo, taxDetails, paymentDetails, pointOfContact, addlInfo, TnC
const tabValidation_initialState = [
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

export const tabValidation = (state = tabValidation_initialState, action) => {
  let newState = [...state];
  switch(action.type){
    case "Set Tab Validation":
      newState[action.payload.index] = action.payload.vState;
      return newState;
    // break;
    default:
      return newState;
    // break;
  }
}
