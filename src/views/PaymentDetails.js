import React, {Component} from 'react';
import { Button, FocusStyleManager, Spinner } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledUpload from '../components/LabelledUpload';
import * as fieldValidations from '../utils/fieldValidations';
import * as constants from '../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePaymentDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import {storeSubForm} from '../utils';

FocusStyleManager.onlyShowFocusOnTabs();

class PaymentDetails extends Component {

  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.state={showSpinner: false};
    // this.validationState = {accHolderName:false, accNumber:false, IFSC:false, accType:true};
    // this.state = {accHolderName:"",accNumber:"",IFSC:"",accType:"Savings"};
  }

  updateInfo(field, value, vState) {
      // this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      // this.setState({[`${field}`]:value});
      this.props.updatePaymentDetails(field, value, vState);
  }

  handleContinue = () => {
    this.setState({showSpinner: true});
    const mapToDbObj = {
      account_holder_name: this.props.paymentDetails.value.accHolderName,
      account_number: this.props.paymentDetails.value.accNumber,
      ifsc_code: this.props.paymentDetails.value.IFSC,
      account_type: this.props.paymentDetails.value.accType,
      cancelled_cheque_url: this.props.paymentDetails.value.cancCheque
    }
    const successHandler = (response) => { //When passing this function as an argument to another function, although arrow function does not set context, this fucntion's context is the SellerInfo component class?
      console.log("successHandler");
      console.log(this.props.updateTabValidation);
      this.setState({showSpinner: false});
      this.props.updateTabValidation(3, true);
      this.props.actionTabChange(4);
    }
    const failureHandler = (response) => {
      this.setState({showSpinner: false});
      console.log("failureHandler");
      console.log(response);
    }
    storeSubForm(this.props.paymentDetails, this.props.updatePaymentDetails, this.props.updateTabValidation.bind(null, 3, false), mapToDbObj, constants.saveForm, successHandler, failureHandler);
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

            <LabelledUpload
              value={this.props.paymentDetails.value.cancCheque}
              onChange={this.updateInfo.bind(this,"cancCheque")}
              validationState={this.props.paymentDetails.vState.cancCheque}
              validate={fieldValidations.noValidation}
              helpText="Upload a PNG or JPG file"
              cloudinaryCloudName={constants.cloudinaryCloudName}
              cloudinaryUploadPreset={constants.cloudinaryImageUploadPreset}>
                Cancelled Cheque
            </LabelledUpload>
            <br/>

            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.handleContinue}>Continue</Button>

            {(this.state.showSpinner)?<div style={{margin: "auto", marginTop:"10px"}}><Spinner className="pt-small"/></div>:null}

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
  return bindActionCreators({updatePaymentDetails, updateTabValidation, actionTabChange}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
