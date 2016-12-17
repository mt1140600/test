import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePOCDetails, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import * as constants from '../constants';

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


  pushDB = () => {
    console.log("Storing seller info");
    var request = new XMLHttpRequest();
    var url = constants.saveForm;
    var bodyObj = {
      poc_name: this.props.pocDetails.value.POCName,
      poc_phoneno:  this.props.pocDetails.value.POCPhone,
      poc_email:  this.props.pocDetails.value.POCEmail
    }
    console.log(url);
    request.open("POST", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
    request.setRequestHeader("Authorization", localStorage.getItem('token'));
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = () => {
      if(request.status === 200){
        console.log(request.response);
        this.props.updateTabValidation(4, true);
        this.props.actionTabChange(5);
      }
      else{
        alert("Something went wrong");
        console.log("Something went wrong; Status: "+request.status);
      }
    }
    console.log(JSON.stringify(bodyObj));
    request.send(JSON.stringify(bodyObj));

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
      this.pushDB();
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
