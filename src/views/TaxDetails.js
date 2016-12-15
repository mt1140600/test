import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledFileUpload from '../components/LabelledFileUpload';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTaxDetails} from '../actions/registration';

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

  storeForm() {
    // let validateSubForm = true;
    // for(let key in this.validationState){
    //   if(this.validationState[key] === false)
    //     validateSubForm = false;
    // }
    // const newObj = {...this.state, validateSubForm : validateSubForm};
    // console.log(JSON.stringify(newObj));
    // localStorage.setItem("taxDetails",JSON.stringify(newObj));
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

            <LabelledFileUpload>Certification of Incorporation</LabelledFileUpload>

            <LabelledFileUpload>Membership with Indian Chamber of Commerce</LabelledFileUpload>

            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.storeForm}>Continue</Button>


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
  return bindActionCreators({ updateTaxDetails: updateTaxDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaxDetails);
