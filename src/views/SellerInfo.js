import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import CheckboxWrapper from '../components/CheckboxWrapper';
import PlainSelect from '../components/PlainSelect';
import LabelledCheckboxGroup from '../components/LabelledCheckboxGroup';
import Callout from '../components/Callout';
import * as constants from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateSellerInfo} from '../actions/registration';
var _ = require('lodash');
// import Immutable from 'immutable';
// window.Immutable = Immutable;

FocusStyleManager.onlyShowFocusOnTabs();

class SellerInfo extends Component {

  constructor() {
    super();
    this.pincodeToAddress = this.pincodeToAddress.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateOperationalHours = this.updateOperationalHours.bind(this);
    this.storeForm = this.storeForm.bind(this);
    // this.validationState = {storeName: false, pincode: false, add1: false, add2: true,state: false, city: false, wadd1:false, wadd2:true, wpincode:false, wstate:false, wcity:false, category:false, workingDays:true, operationalHours:true };//this is not a state. Just an instance variable because, it's value can be calculated with state
    // this.state = {storeName:"", pincode:"", add1:"", add2:"",state:"Choose State", city:"", wadd1:"", wadd2:"", wpincode:"",wstate:"Choose State", wcity:"", category:"Choose Primary Category", workingDays: [], operationalHours:["8","am","5","pm"]};
    this.state = { copyAddress: false };
  }

  updateInfo(field, value, vState) {
      if(field == "pincode" && value.length === 6)
        this.pincodeToAddress(value);
      // this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.props.updateSellerInfo(field, value, vState);
  }

  updateOperationalHours(field, value) {
    let newOperationalHours = [...this.props.sellerInfo.value.operationalHours];
    newOperationalHours[field] = value;
    this.updateInfo("operationalHours",newOperationalHours,true);
  }

  fillCityState(obj){
    this.props.updateSellerInfo("city", _.startCase(_.toLower(obj.districtname)), true);
    this.props.updateSellerInfo("state", _.startCase(_.toLower(obj.statename)), true);
  }

  pincodeToAddress(pincode) {
    console.log("Getting address corresponding to pincode: "+pincode);
    var getAddress = new XMLHttpRequest();
    var url = constants.pincodeToAddress+pincode;
    console.log(url);
    // var url = fileUrl;
    getAddress.open("GET", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
    getAddress.onload = () => {
      if(getAddress.status === 200){
        // console.log(getAddress.response);  //returns a string, parse to json
        console.log(JSON.parse(getAddress.response));
        this.fillCityState(JSON.parse(getAddress.response));
      }
      else{
        console.log("Something went wrong; Status: "+getAddress.status);
      }
    }
    getAddress.send(null);
  }

  copyAddress = () => {
    this.props.updateSellerInfo("wadd1", this.props.sellerInfo.value.add1, this.props.sellerInfo.vState.add1);
    this.props.updateSellerInfo("wadd2", this.props.sellerInfo.value.add2, this.props.sellerInfo.vState.add2);
    this.props.updateSellerInfo("wstate", this.props.sellerInfo.value.state, this.props.sellerInfo.vState.state);
    this.props.updateSellerInfo("wcity", this.props.sellerInfo.value.city, this.props.sellerInfo.vState.city);
    this.props.updateSellerInfo("wpincode", this.props.sellerInfo.value.pincode, this.props.sellerInfo.vState.pincode);
  }

  handleCopyAddress = () => {
    if(!this.state.copyAddress){
      console.log("copying address");
      this.copyAddress();
    }
    this.setState({copyAddress: !this.state.copyAddress});
  }

  storeForm() {
    console.log(this.props.sellerInfo.vState);

    let validateSubForm = true;
    for(let key in this.props.sellerInfo.vState){
      if(this.props.sellerInfo.vState[key] === null){
        this.props.updateSellerInfo(key, this.props.sellerInfo.value[key], false);
        validateSubForm = false;
      }
      else if(this.props.sellerInfo.vState[key] === false){
        validateSubForm = false;
      }
    }

    if(validateSubForm) console.log("Pushing to DB");

    // const newObj = {...this.state, validateSubForm : validateSubForm};
    // console.log(JSON.stringify(newObj));
    // localStorage.setItem("sellerInfo",JSON.stringify(newObj));
  }

  render() {
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Tell us about your business </h2>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.storeName}
              onChange={this.updateInfo.bind(this,"storeName")}
              validationState={this.props.sellerInfo.vState.storeName}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Store name is mandatory"}>
              Store Name
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose Primary Category", ...constants.productCategories]}
              value={this.props.sellerInfo.value.category}
              onChange={this.updateInfo.bind(this,"category")}
              validationState={this.props.sellerInfo.vState.category}
              validate={fieldValidations.validateSelect.bind(null,"Choose Primary Category")}
              helpText={"Choose a valid category"}>
              Product Category
            </LabelledSelect>
            <br/>

            <h4>Enter your address</h4>

            <LabelledTextInput
              value={this.props.sellerInfo.value.pincode}
              onChange={this.updateInfo.bind(this,"pincode")}
              validationState={this.props.sellerInfo.vState.pincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.add1}
              onChange={this.updateInfo.bind(this,"add1")}
              validationState={this.props.sellerInfo.vState.add1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.add2}
              onChange={this.updateInfo.bind(this,"add2")}
              validationState={this.props.sellerInfo.vState.add2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Address Line 2
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.props.sellerInfo.value.state}
              onChange={this.updateInfo.bind(this,"state")}
              validationState={this.props.sellerInfo.vState.state}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.city}
              onChange={this.updateInfo.bind(this,"city")}
              validationState={this.props.sellerInfo.vState.city}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>

            <CheckboxWrapper
              value={this.state.copyAddress}
              onChange={this.handleCopyAddress}
              style={{margin:"auto"}}>My warehouse address is same as above</CheckboxWrapper>
            <br/>

            <h2>Warehouse Details</h2>
            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wadd1}
              onChange={this.updateInfo.bind(this,"wadd1")}
              validationState={this.props.sellerInfo.vState.wadd1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Warehouse Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wadd2}
              onChange={this.updateInfo.bind(this,"wadd2")}
              validationState={this.props.sellerInfo.vState.wadd2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Warehouse Address Line 2
            </LabelledTextInput>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wpincode}
              onChange={this.updateInfo.bind(this,"wpincode")}
              validationState={this.props.sellerInfo.vState.wpincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.props.sellerInfo.value.wstate}
              onChange={this.updateInfo.bind(this,"wstate")}
              validationState={this.props.sellerInfo.vState.wstate}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>

            <br/>

            <LabelledTextInput
              value={this.props.sellerInfo.value.wcity}
              onChange={this.updateInfo.bind(this,"wcity")}
              validationState={this.props.sellerInfo.vState.wcity}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>
            <br/>
            <label className="pt-label pt-inline">
              Operational Hours
              <div style={{float:"right"}}>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.props.sellerInfo.value.operationalHours[0]}
                  onChange={this.updateOperationalHours.bind(this,0)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.props.sellerInfo.value.operationalHours[1]}
                  onChange={this.updateOperationalHours.bind(this,1)}/>
                <span> to</span>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.props.sellerInfo.value.operationalHours[2]}
                  onChange={this.updateOperationalHours.bind(this,2)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.props.sellerInfo.value.operationalHours[3]}
                  onChange={this.updateOperationalHours.bind(this,3)}/>
              </div>
            </label>
            <br/>
            <LabelledCheckboxGroup
              options={constants.daysOfTheWeek}
              groupColumns={2}
              value={this.props.sellerInfo.value.workingDays}
              onChange={this.updateInfo.bind(this,"workingDays")}
              validationState={this.props.sellerInfo.vState.workingDays}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Working Days
            </LabelledCheckboxGroup>
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
    sellerInfo : state.sellerInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateSellerInfo: updateSellerInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerInfo);
