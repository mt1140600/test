import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import PlainSelect from '../components/PlainSelect';
import * as constants from '../constants';
import * as fieldValidations from '../fieldValidations';

FocusStyleManager.onlyShowFocusOnTabs();

class SellerInfo extends Component{

  constructor(){
    super();
    this.pincodeToAddress = this.pincodeToAddress.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.alignCheckboxes = this.alignCheckboxes.bind(this);
    this.validationState = {storeName: false, pincode: false, add1: false, add2: true, city: false, wadd1:false, wadd2:true, wpincode:false, wcity:false };//this is not a state. Just an instance variable because, it's value can be calculated with state
    this.state = {storeName:"", pincode:"", add1:"", add2:"", city:"", wadd1:"", wadd2:"", wpincode:"", wcity:""};
  }

  alignCheckboxes(arr, cols){
   const styleObj = {flexBasis:`${100/cols}%`}; //Dividing the container into required columns
   return arr.map((item,index)=>(
      <LabelledCheckbox key={index} style={styleObj}>{item}</LabelledCheckbox>
    ));
  }

  updateInfo(field,value,vState){
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
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

  render(){
    // this.pincodeToAddress("110023");
    console.log("vState",this.validationState);
    console.log("state",this.state);
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

            <LabelledSelect options={constants.productCategories}>Product Category</LabelledSelect>
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

            <LabelledSelect options={["Choose State", ...constants.states]}>State</LabelledSelect>

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

            <LabelledSelect options={["Choose State", ...constants.states]}>State</LabelledSelect>

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
                <PlainSelect options={constants.operationalHours}/>
                <PlainSelect options={["am","pm"]}/>
                <span> to</span>
                <PlainSelect options={constants.operationalHours}/>
                <PlainSelect options={["am","pm"]}/>
              </div>
            </label>

            <label className="pt-label pt-inline" style={{display: "flex"}}>
              <div style={{flex:"1"}}>Working Days</div>
                <div style={{display:"flex",flexWrap:"wrap",flex:"1",justifyContent:"space-around"}}>
                  {this.alignCheckboxes(constants.daysOfTheWeek,2)}
                </div>
            </label>
            <br/>

            <Button className="pt-intent-primary" style={{width:"200px",margin:"auto"}}>Continue</Button>

          </div>

      </div>
    );
  }
}

export default SellerInfo;
