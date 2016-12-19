import * as constants from '../constants';
import { checkHttpStatus, parseJSON } from '../utils';

export const actionTabChange = (tab) => {
    return {
    type: 'Set Registration Tab',
    value: tab
  }
}

function actionCreator(actionName){
  return (field, value, vState) => {
    return{
      type: actionName,
      payload: {
        field: field,
        value: value,
        vState: vState

        // [`${field}`]: value
      }
    }
  }
}

export const updateSellerInfo = actionCreator("Update Seller Info");
export const updateTaxDetails = actionCreator("Update Tax Details");
export const updatePaymentDetails = actionCreator("Update Payment Details");
export const updatePOCDetails = actionCreator("Update POC Details");
export const updateAddlInfo = actionCreator("Update Addl Info");
export const updateVerifyOtp = actionCreator("Update Verify OTP");

export const updateTabValidation = (index, vState) => {
  console.log("inside function");
  return {
    type: "Set Tab Validation",
    payload: {
      index: index,
      vState: vState
    }
  }
}

let checkNull = function(dispatch, objField, formField, handler){
  if(objField!==null){
    dispatch(handler(formField, objField, true));
    return true;
  }
  return false;
  // return (objField!==null)?dispatch(handler(formField, objField, true)):null;
}

export const fillForm = (obj) =>{
    console.log("Filling form",obj);
    return (dispatch) => {
      checkNull = checkNull.bind(null, dispatch);
      // (obj.store_name!==null)?dispatch(updateSellerInfo("storeName", obj.store_name, null)):null;
      if(checkNull(obj.store_name, "storeName", updateSellerInfo)){
        dispatch(updateTabValidation(1, true));  //Setting Tab validation to true under the assumption that, if one field is filled in the subform, all fields must be filled in the subForm as we cannot save the subForm otherwise from the frontend
      }
      checkNull(obj.product_category, "category", updateSellerInfo);
      checkNull(obj.address_pincode, "pincode", updateSellerInfo);
      checkNull(obj.address_address_l1, "add1", updateSellerInfo);
      checkNull(obj.address_address_l2, "add2", updateSellerInfo);
      checkNull(obj.address_city, "city", updateSellerInfo);
      checkNull(obj.address_state, "state", updateSellerInfo);
      checkNull(obj.warehouse_pincode, "wpincode", updateSellerInfo);
      checkNull(obj.warehouse_address_l1, "wadd1", updateSellerInfo);
      checkNull(obj.warehouse_address_l2, "wadd2", updateSellerInfo);
      checkNull(obj.warehouse_city, "wcity", updateSellerInfo);
      checkNull(obj.warehouse_state, "wstate", updateSellerInfo);
      checkNull(obj.warehouse_active_days, "workingDays", updateSellerInfo);
      checkNull(obj.warehouse_active_hours, "operationalHours", updateSellerInfo);


      if(checkNull(obj.pan_no, "PAN", updateTaxDetails)){
        dispatch(updateTabValidation(2, true));
      }
      checkNull(obj.vat_no, "VAT", updateTaxDetails);
      checkNull(obj.cst_no, "CST", updateTaxDetails);
      checkNull(obj.certification_of_incorporation_url, "certIncorp", updateTaxDetails);
      checkNull(obj.membership_with_icc_url, "membICC", updateTaxDetails);


      if(checkNull(obj.account_holder_name, "accHolderName", updatePaymentDetails)){
        dispatch(updateTabValidation(3, true));
      }
      checkNull(obj.account_number, "accNumber", updatePaymentDetails);
      checkNull(obj.ifsc_code, "IFSC", updatePaymentDetails);
      checkNull(obj.account_type, "accType", updatePaymentDetails);
      checkNull(obj.cancelled_cheque_url, "canCheque", updatePaymentDetails);


      if(checkNull(obj.poc_name, "POCName", updatePOCDetails)){
        dispatch(updateTabValidation(4, true));
      }
      checkNull(obj.poc_phoneno, "POCPhone", updatePOCDetails);
      checkNull(obj.poc_email, "POCEmail", updatePOCDetails);


      if(checkNull(obj.establishment_type, "typeOfEstablishment", updateAddlInfo)){
        dispatch(updateTabValidation(5, true));
      }
      checkNull(obj.annual_turnover, "annualTurnover", updateAddlInfo);
      checkNull(obj.no_of_product_sold, "numberRangeProducts", updateAddlInfo);
      checkNull(obj.other_ecommerce_website, "otherWebsitesSoldOn", updateAddlInfo);
      checkNull(obj.other_ecommerce_website_text, "otherWebsitesSoldOnText", updateAddlInfo);
      return true; //just have to return something. Purpose of this thunk is just to dispatch other actions. return value does not matter here
    };
}

export const loadForm = () => {
  console.log("Fetching saved form");
  return function (dispatch){
    return fetch(constants.getForm, {
        method: 'get',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => { dispatch(fillForm(response)); })
      .catch(error => {console.log("Failed to load registration form from DB "+error); })
  }

}
