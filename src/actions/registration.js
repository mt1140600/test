export const actionTabChange = (tab) => {
    console.log("inside action");
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
        vState: vState,
        value: value
        // [`${field}`]: value
      }
    }
  }
}

// export const updateSellerInfo = (field, value, vState) => {
//   return{
//     type: "Update Seller Info",
//     payload: {
//       field: field,
//       vState: vState,
//       value: value
//       // [`${field}`]: value
//     }
//   }
// }

export const updateSellerInfo = actionCreator("Update Seller Info");
export const updateTaxDetails = actionCreator("Update Tax Details");
export const updatePaymentDetails = actionCreator("Update Payment Details");
export const updatePOCDetails = actionCreator("Update POC Details");
export const updateAddlInfo = actionCreator("Update Addl Info");
