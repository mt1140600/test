import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import PlainSelect from '../components/PlainSelect';
import LabelledCheckboxGroup from '../components/LabelledCheckboxGroup';
import * as constants from '../constants';
import * as fieldValidations from '../fieldValidations';

FocusStyleManager.onlyShowFocusOnTabs();

class SellerInfo extends Component{

  constructor(){
    super();
    this.pincodeToAddress = this.pincodeToAddress.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateOperationalHours = this.updateOperationalHours.bind(this);
    this.storeForm = this.storeForm.bind(this);
    this.validationState = {storeName: false, pincode: false, add1: false, add2: true,state: false, city: false, wadd1:false, wadd2:true, wpincode:false, wstate:false, wcity:false, category:false, workingDays:true, operationalHours:true };//this is not a state. Just an instance variable because, it's value can be calculated with state
    this.state = {storeName:"", pincode:"", add1:"", add2:"",state:"Choose State", city:"", wadd1:"", wadd2:"", wpincode:"",wstate:"Choose State", wcity:"", category:"Choose Primary Category", workingDays: [], operationalHours:["8","am","5","pm"]};
  }

  updateInfo(field,value,vState){
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
  }

  updateOperationalHours(field,value){
    let newOperationalHours = [...this.state.operationalHours];
    newOperationalHours[field] = value;
    this.updateInfo("operationalHours",newOperationalHours,true);
  }

  pincodeToAddress(pincode){
    console.log("Google GeoCode API - Getting address corresponding to pincode: "+pincode);
    var getAddress = new XMLHttpRequest();
    var url = constants.pathGeocode+pincode;
    // var url = fileUrl;
    getAddress.open("GET", url, true);
    getAddress.onload = () => {
      if(getAddress.status === 200){
        console.log(JSON.parse(getAddress.response).results);
        // this.setState({orderJSON: JSON.parse(getAddress.response)});
      }
      else{
        console.log("Something went wrong; Status: "+getAddress.status);
      }
    }
    getAddress.send(null);
  }

  storeForm(){
    console.log(JSON.stringify(this.state));
    let validateSellerInfo = true;
    for(let key in this.validationState){
      if(this.validationState[key] === false)
        validateSellerInfo = false;
    }
    const newObj = {...this.state, validateSellerInfo : validateSellerInfo};
    console.log(JSON.stringify(newObj));
    localStorage.setItem("sellerInfo",newObj);
  }

  render(){
    // this.pincodeToAddress("110023");
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Tell us about your business </h2>
            <br/>

            <LabelledTextInput
              value={this.state.storeName}
              onChange={this.updateInfo.bind(this,"storeName")}
              validationState={this.validationState.storeName}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Store name is mandatory"}>
              Store Name
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose Primary Category", ...constants.productCategories]}
              value={this.state.category}
              onChange={this.updateInfo.bind(this,"category")}
              validationState={this.validationState.category}
              validate={fieldValidations.validateSelect.bind(null,"Choose Primary Category")}
              helpText={"Choose a valid category"}>
              Product Category
            </LabelledSelect>
            <br/>

            <h4>Enter your address</h4>

            <LabelledTextInput
              value={this.state.pincode}
              onChange={this.updateInfo.bind(this,"pincode")}
              validationState={this.validationState.pincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.add1}
              onChange={this.updateInfo.bind(this,"add1")}
              validationState={this.validationState.add1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.add2}
              onChange={this.updateInfo.bind(this,"add2")}
              validationState={this.validationState.add2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Address Line 2
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.state.state}
              onChange={this.updateInfo.bind(this,"state")}
              validationState={this.validationState.state}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>
            <br/>

            <LabelledTextInput
              value={this.state.city}
              onChange={this.updateInfo.bind(this,"city")}
              validationState={this.validationState.city}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>

            <LabelledCheckbox  style={{margin:"auto"}}>My warehouse address is same as above</LabelledCheckbox>
            <br/>

            <h2>Warehouse Details</h2>
            <br/>

            <LabelledTextInput
              value={this.state.wadd1}
              onChange={this.updateInfo.bind(this,"wadd1")}
              validationState={this.validationState.wadd1}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Address Line 1 is mandatory"}>
              Warehouse Address Line 1
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.wadd2}
              onChange={this.updateInfo.bind(this,"wadd2")}
              validationState={this.validationState.wadd2}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Warehouse Address Line 2
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.wpincode}
              onChange={this.updateInfo.bind(this,"wpincode")}
              validationState={this.validationState.wpincode}
              validate={fieldValidations.validatePincode}
              helpText={"Pincode must be a valid 6 digit number"}>
              Pin Code
            </LabelledTextInput>

            <LabelledSelect
              options={["Choose State", ...constants.states]}
              value={this.state.wstate}
              onChange={this.updateInfo.bind(this,"wstate")}
              validationState={this.validationState.wstate}
              validate={fieldValidations.validateSelect.bind(null,"Choose State")}
              helpText={"Choose a valid state"}>
              State
            </LabelledSelect>

            <br/>

            <LabelledTextInput
              value={this.state.wcity}
              onChange={this.updateInfo.bind(this,"wcity")}
              validationState={this.validationState.wcity}
              validate={fieldValidations.validateMandatoryString}
              helpText={"City is mandatory"}>
              City
            </LabelledTextInput>

            <label className="pt-label pt-inline">
              Operational Hours
              <div style={{float:"right"}}>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.state.operationalHours[0]}
                  onChange={this.updateOperationalHours.bind(this,0)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.state.operationalHours[1]}
                  onChange={this.updateOperationalHours.bind(this,1)}/>
                <span> to</span>
                <PlainSelect
                  options={constants.operationalHours}
                  value={this.state.operationalHours[2]}
                  onChange={this.updateOperationalHours.bind(this,2)}/>
                <PlainSelect
                  options={["am","pm"]}
                  value={this.state.operationalHours[3]}
                  onChange={this.updateOperationalHours.bind(this,3)}/>
              </div>
            </label>

            <LabelledCheckboxGroup
              options={constants.daysOfTheWeek}
              groupColumns={2}
              value={this.state.workingDays}
              onChange={this.updateInfo.bind(this,"workingDays")}
              validationState={this.validationState.workingDays}
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

export default SellerInfo;
