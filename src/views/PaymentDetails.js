import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledFileUpload from '../components/LabelledFileUpload';
import * as fieldValidations from '../fieldValidations';
FocusStyleManager.onlyShowFocusOnTabs();

class PaymentDetails extends Component {

  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.storeForm = this.storeForm.bind(this);
    this.validationState = {accHolderName:false, accNumber:false, IFSC:false, accType:true};
    this.state = {accHolderName:"",accNumber:"",IFSC:"",accType:"Savings"};
  }

  updateInfo(field, value, vState) {
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
  }

  storeForm() {
    let validateSubForm = true;
    for(let key in this.validationState){
      if(this.validationState[key] === false)
        validateSubForm = false;
    }
    const newObj = {...this.state, validateSubForm : validateSubForm};
    console.log(JSON.stringify(newObj));
    localStorage.setItem("paymentDetails",JSON.stringify(newObj));
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update Bank Account details </h2>
            <br/>

            <LabelledTextInput
              value={this.state.accHolderName}
              onChange={this.updateInfo.bind(this,"accHolderName")}
              validationState={this.validationState.accHolderName}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Account Holder Name is mandatory"}>
              Account Holder Name
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.accNumber}
              onChange={this.updateInfo.bind(this,"accNumber")}
              validationState={this.validationState.accNumber}
              validate={fieldValidations.validateAccountNumber}
              helpText={"Enter a valid account number"}>
              Account Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.IFSC}
              onChange={this.updateInfo.bind(this,"IFSC")}
              validationState={this.validationState.IFSC}
              validate={fieldValidations.validateIFSC}
              helpText={"Enter a valid IFSC number"}>
              IFSC Code
            </LabelledTextInput>

            <LabelledSelect
              options={["Savings","Current"]}
              value={this.state.accType}
              onChange={this.updateInfo.bind(this,"accType")}
              validationState={this.validationState.accType}
              validate={fieldValidations.validateMandatoryString}
              helpText={null}>
              Type
            </LabelledSelect>

            <LabelledFileUpload>Cancelled Cheque</LabelledFileUpload>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.storeForm}>Continue</Button>


          </div>

        </div>
    );
  }
}

export default PaymentDetails;
