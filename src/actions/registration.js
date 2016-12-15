export const actionTabChange = (tab) => {
    console.log("inside action");
    return {
    type: 'Set Registration Tab',
    value: tab
  }
}

export const updateSellerInfo = (field, value, vState) => {
  return{
    type: "Update Seller Info",
    payload: {
      field: field,
      vState: vState,
      value: value
      // [`${field}`]: value
    }
  }
}
