//Return true if field value is valid

export function noValidation(){
    return true;
}

export function validateMandatoryString(value){
  if(value.length > 0) return true;
  else return false;
}

export function validateMobileNumber(value){
  if( typeof(Number(value))==="number" && value.length === 10) return true;
  else return false;
}

export function validatePincode(value){
  if( typeof(Number(value))==="number" && value.length === 6) return true;
  else return false;
}

export function validatePAN(value){
  let pattern = /^([A-Z]{5})([0-9]{4})([A-Z]{1})$/i;
  return pattern.test(value);

}

export function validateTIN(value) {//11digits followed by V
  let pattern = /^([0-9]){11}V$/;
  return pattern.test(value);
}

export function validateCST(value){//11digits followed by C
  let pattern = /^([0-9]){11}C$/;
  return pattern.test(value);
}

export function validateIFSC(value){

}

export function validateSelect(invalidOption, currentOption){ //Since select has options like Choose state, we need to mark these as invalid options
  if(invalidOption === currentOption) return false;
  else return true;
}
