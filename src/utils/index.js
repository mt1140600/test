export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}


export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        console.log(error.response);
        throw error;
    }
}

export function parseJSON(response) {
    return response.json();
}

export function storeSubFormCheck(subFormObj, subFormAction){
  console.log("checking form");
  let validateSubForm = true;
  for(let key in subFormObj.vState){
    if(subFormObj.vState[key] === null){
      subFormAction(key, subFormObj.value[key], false);
      validateSubForm = false;
    }
    else if(subFormObj.vState[key] === false){
      validateSubForm = false;
    }
  }
  return validateSubForm;
}

export function pushSubFormToDB(url, body, successHandler, failureHandler){
  console.log("pushing to db");
  console.log(JSON.stringify(body));
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify(body)
  })
  .then(checkHttpStatus)
  .then(parseJSON)
  .then(successHandler)
  .catch(failureHandler)
}

export function storeSubForm(subFormObj, subFormAction, mapToDbObj, url, successHandler, failureHandler){

      let validateSubForm = storeSubFormCheck(subFormObj, subFormAction);
      console.log(validateSubForm);

      if(validateSubForm){
        pushSubFormToDB(url, mapToDbObj, successHandler, failureHandler);
      }
      else{
        this.props.updateTabValidation(1, false);
      }

}
