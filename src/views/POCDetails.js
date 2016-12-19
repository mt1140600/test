import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePOCDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import * as constants from '../constants';
import {storeSubForm} from '../utils';

FocusStyleManager.onlyShowFocusOnTabs();

class POCDetails extends Component {

  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(field, value, vState) {
    this.props.updatePOCDetails(field, value, vState);
  }

  handleContinue = () => {
    const mapToDbObj = {
      poc_name: this.props.pocDetails.value.POCName,
      poc_phoneno:  this.props.pocDetails.value.POCPhone,
      poc_email:  this.props.pocDetails.value.POCEmail
    }
    const successHandler = (response) => { //When passing this function as an argument to another function, although arrow function does not set context, this fucntion's context is the SellerInfo component class?
      console.log("successHandler");
      console.log(this.props.pocDetails);
      this.props.updateTabValidation(4, true);
      this.props.actionTabChange(5);
    }
    const failureHandler = (response) => {
      console.log("failureHandler");
      console.log(response);
    }
    storeSubForm(this.props.pocDetails, this.props.updatePOCDetails, this.props.updateTabValidation.bind(null, 4, false), mapToDbObj, constants.saveForm, successHandler, failureHandler);
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Point of Contact details </h2>
            <br/>

            <LabelledTextInput
              value={this.props.pocDetails.value.POCName}
              onChange={this.updateInfo.bind(this,"POCName")}
              validationState={this.props.pocDetails.vState.POCName}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Name <small>(optional)</small>
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.pocDetails.value.POCPhone}
              onChange={this.updateInfo.bind(this,"POCPhone")}
              validationState={this.props.pocDetails.vState.POCPhone}
              validate={fieldValidations.noValidation}
              helpText={"Enter a valid phone number"}>
              Phone Number <small>(optional)</small>
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.pocDetails.value.POCEmail}
              onChange={this.updateInfo.bind(this,"POCEmail")}
              validationState={this.props.pocDetails.vState.POCEmail}
              validate={fieldValidations.validateOptionalEmail}
              helpText={"Enter a valid email ID"}>
              Email ID <small>(optional)</small>
            </LabelledTextInput>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.handleContinue}>Continue</Button>

          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      pocDetails: state.pocDetails
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePOCDetails, updateTabValidation, actionTabChange }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(POCDetails);
