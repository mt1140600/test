export const actionTabChange = (tab) => {
    console.log("inside action");
    return {
    type: 'Set Registration Tab',
    value: tab
  }
}

export const updateSellerInfo = (field, value) => {
  return{
    type: "Update Seller Info",
    payload: {
      [`${field}`]: value
    }
  }
}
