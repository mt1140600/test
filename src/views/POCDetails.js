import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePOCDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';

FocusStyleManager.onlyShowFocusOnTabs();

class POCDetails extends Component {

  constructor() {
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.storeForm = this.storeForm.bind(this);
  }

  updateInfo(field, value, vState) {
    this.props.updatePOCDetails(field, value, vState);
  }

  storeForm() {
    console.log(this.props.pocDetails.vState);

    let validateSubForm = true;
    for(let key in this.props.pocDetails.vState){
      if(this.props.pocDetails.vState[key] === null){
        this.props.updatePOCDetails(key, this.props.pocDetails.value[key], false);
        validateSubForm = false;
      }
      else if(this.props.pocDetails.vState[key] === false){
        validateSubForm = false;
      }
    }

    if(validateSubForm){
      console.log("Pushing to DB");
      this.props.updateTabValidation(4, true);
      this.props.actionTabChange(5);
    }
    else{
      this.props.updateTabValidation(4, false);
    }
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
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.storeForm}>Continue</Button>

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
