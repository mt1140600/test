import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledFileUpload from '../components/LabelledFileUpload';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePaymentDetails} from '../actions/registration';

FocusStyleManager.onlyShowFocusOnTabs();

class PaymentDetails extends Component {

  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.storeForm = this.storeForm.bind(this);
    // this.validationState = {accHolderName:false, accNumber:false, IFSC:false, accType:true};
    // this.state = {accHolderName:"",accNumber:"",IFSC:"",accType:"Savings"};
  }

  updateInfo(field, value, vState) {
      // this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      // this.setState({[`${field}`]:value});
      this.props.updatePaymentDetails(field, value, vState);
  }

  storeForm() {
    // let validateSubForm = true;
    // for(let key in this.props.paymentDetails.vState){
    //   if(this.props.paymentDetails.vState[key] === false)
    //     validateSubForm = false;
    // }
    // const newObj = {...this.props.paymentDetails.value, validateSubForm : validateSubForm};
    // console.log(JSON.stringify(newObj));
    // localStorage.setItem("paymentDetails",JSON.stringify(newObj));
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update Bank Account details </h2>
            <br/>

            <LabelledTextInput
              value={this.props.paymentDetails.value.accHolderName}
              onChange={this.updateInfo.bind(this,"accHolderName")}
              validationState={this.props.paymentDetails.vState.accHolderName}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Account Holder Name is mandatory"}>
              Account Holder Name
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.paymentDetails.value.accNumber}
              onChange={this.updateInfo.bind(this,"accNumber")}
              validationState={this.props.paymentDetails.vState.accNumber}
              validate={fieldValidations.validateAccountNumber}
              helpText={"Enter a valid account number"}>
              Account Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.paymentDetails.value.IFSC}
              onChange={this.updateInfo.bind(this,"IFSC")}
              validationState={this.props.paymentDetails.vState.IFSC}
              validate={fieldValidations.validateIFSC}
              helpText={"Enter a valid IFSC number"}>
              IFSC Code
            </LabelledTextInput>

            <LabelledSelect
              options={["Savings","Current"]}
              value={this.props.paymentDetails.value.accType}
              onChange={this.updateInfo.bind(this,"accType")}
              validationState={this.props.paymentDetails.vState.accType}
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

const mapStateToProps = (state) => {
  return{
    paymentDetails : state.paymentDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updatePaymentDetails: updatePaymentDetails}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
