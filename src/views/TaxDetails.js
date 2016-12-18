import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledUpload from '../components/LabelledUpload';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTaxDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import * as constants from '../constants';

FocusStyleManager.onlyShowFocusOnTabs();

class TaxDetails extends Component{
  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.storeForm = this.storeForm.bind(this);
  }

  updateInfo(field, value, vState) {
      this.props.updateTaxDetails(field, value, vState);
  }

  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: 'dtvfkbdm8', upload_preset: 'dgfm0gcv'},
    function(error, result) { console.log(error, result) });
  }

  storeForm() {
      console.log(this.props.taxDetails.vState);

      let validateSubForm = true;
      for(let key in this.props.taxDetails.vState){
        if(this.props.taxDetails.vState[key] === null){
          this.props.updateTaxDetails(key, this.props.taxDetails.value[key], false);
          validateSubForm = false;
        }
        else if(this.props.taxDetails.vState[key] === false){
          validateSubForm = false;
        }
      }

      if(validateSubForm){
        console.log("Pushing to DB");
        this.props.updateTabValidation(2, true);
        this.props.actionTabChange(3);
      }
      else{
        this.props.updateTabValidation(2, false);
      }

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
              helpText="Upload a PNG or JPG file"
              cloudinaryCloudName={constants.cloudinaryCloudName}
              cloudinaryUploadPreset={constants.cloudinaryImageUploadPreset}>
                Certification of Incorporation
            </LabelledUpload>

            <LabelledUpload
              value={this.props.taxDetails.value.membICC}
              onChange={this.updateInfo.bind(this,"membICC")}
              validationState={this.props.taxDetails.vState.membICC}
              validate={fieldValidations.noValidation}
              helpText="Upload a PNG or JPG file"
              cloudinaryCloudName={constants.cloudinaryCloudName}
              cloudinaryUploadPreset={constants.cloudinaryImageUploadPreset}>
                Membership with Indian Chamber of Commerce
            </LabelledUpload>

            <br/>

            <Button
              className="pt-intent-primary"
              style={{width:"200px",margin:"auto"}}
              onClick={this.storeForm}>
              Continue
            </Button>

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
