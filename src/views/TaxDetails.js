/* global cloudinary*/
import React, {Component} from 'react';
import { Button, FocusStyleManager, Spinner } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledUpload from '../components/LabelledUpload';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTaxDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import * as constants from '../constants';
import {storeSubForm} from '../utils';
import {cloudinaryCloudName, cloudinaryImageUploadPreset} from '../constants';

FocusStyleManager.onlyShowFocusOnTabs();

class TaxDetails extends Component{
  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.state = { showSpinner: false };
  }

  updateInfo(field, value, vState) {
      this.props.updateTaxDetails(field, value, vState);
  }

  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: cloudinaryCloudName, upload_preset: cloudinaryImageUploadPreset},
    function(error, result) { console.log(error, result) });
  }

  handleContinue = () => {
      this.setState({showSpinner: true});
      const mapToDbObj = {
        pan_no: this.props.taxDetails.value.PAN,
        vat_no: this.props.taxDetails.value.VAT,
        cst_no: this.props.taxDetails.value.CST,
        certification_of_incorporation_url: this.props.taxDetails.value.certIncorp,
        membership_with_icc_url:  this.props.taxDetails.value.membICC
      }
      const successHandler = () => { //When passing this function as an argument to another function, although arrow function does not set context, this fucntion's context is the SellerInfo component class?
        console.log("successHandler");
        console.log(this.props.updateTabValidation);
        this.setState({showSpinner: false});
        this.props.updateTabValidation(2, true);
        this.props.actionTabChange(3);
      }
      const failureHandler = (response) => {
        this.setState({showSpinner: false});
        console.log("failureHandler");
        console.log(response);
      }

      const subFormValid = storeSubForm(this.props.taxDetails, this.props.updateTaxDetails, this.props.updateTabValidation.bind(null, 2, false), mapToDbObj, constants.saveForm, successHandler, failureHandler);

      if(!subFormValid) this.setState({showSpinner: false});
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update your VAT and CST details </h2>
            <br/>
            <LabelledTextInput
              value={this.props.taxDetails.value.PAN}
              onChange={this.updateInfo.bind(this,"PAN")}
              validationState={this.props.taxDetails.vState.PAN}
              validate={fieldValidations.validatePAN}
              helpText={"Enter a valid PAN"}>
              PAN Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.taxDetails.value.VAT}
              onChange={this.updateInfo.bind(this,"VAT")}
              validationState={this.props.taxDetails.vState.VAT}
              validate={fieldValidations.validateVAT}
              helpText={"Enter a valid VAT"}>
              VAT/TIN Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.taxDetails.value.CST}
              onChange={this.updateInfo.bind(this,"CST")}
              validationState={this.props.taxDetails.vState.CST}
              validate={fieldValidations.validateCST}
              helpText={"Enter a valid CST"}>
              CST Number
            </LabelledTextInput>

            <LabelledUpload
              value={this.props.taxDetails.value.certIncorp}
              onChange={this.updateInfo.bind(this,"certIncorp")}
              validationState={this.props.taxDetails.vState.certIncorp}
              validate={fieldValidations.noValidation}
              helpText="Upload a PNG, JPG, BMP or PDF file"
              cloudinaryCloudName={constants.cloudinaryCloudName}
              cloudinaryUploadPreset={constants.cloudinaryImageUploadPreset}
              cloudinaryFolder={constants.cloduinaryMerchantInfoFolder}>
                Certification of Incorporation
            </LabelledUpload>

            <LabelledUpload
              value={this.props.taxDetails.value.membICC}
              onChange={this.updateInfo.bind(this,"membICC")}
              validationState={this.props.taxDetails.vState.membICC}
              validate={fieldValidations.noValidation}
              helpText="Upload a PNG, JPG, BMP or PDF file"
              cloudinaryCloudName={constants.cloudinaryCloudName}
              cloudinaryUploadPreset={constants.cloudinaryImageUploadPreset}
              cloudinaryFolder={constants.cloduinaryMerchantInfoFolder}>
                Membership with Indian Chamber of Commerce
            </LabelledUpload>

            <br/>

            <Button
              className="pt-intent-primary"
              style={{width:"200px",margin:"auto"}}
              onClick={this.handleContinue}>
              Continue
            </Button>

            {(this.state.showSpinner)?<div style={{margin: "auto", marginTop:"10px"}}><Spinner className="pt-small"/></div>:null}

          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taxDetails : state.taxDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateTaxDetails, updateTabValidation, actionTabChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxDetails);
