import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckboxGroup from '../components/LabelledCheckboxGroup';
import * as fieldValidations from '../fieldValidations';
FocusStyleManager.onlyShowFocusOnTabs();

const websites = ["Flipkart","Amazon","Snapdeal","Shopclues","Indiamart","Just Dial","Wydr","Shotang","Just Buy Live"];

class AddInfo extends Component{
  constructor(){
    super();
    this.alignCheckboxes = this.alignCheckboxes.bind(this);
    this.storeForm = this.storeForm.bind(this);
    this.validationState = {typeOfEstablishment:false, annualTurnover:true, numberRangeProducts:true, otherWebsitesSoldOn:true, otherWebsitesSoldOnText:true};
    this.state = {typeOfEstablishment:[], annualTurnover:"Less than 1 Lakh", numberRangeProducts:"1 - 10", otherWebsitesSoldOn:[], otherWebsitesSoldOnText:""};
  }

  updateInfo(field,value,vState){
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
  }

  alignCheckboxes(arr, cols){
   const styleObj = {flexBasis:`${100/cols}%`}; //Dividing the container into required columns
   return arr.map((item,index)=>(
      <LabelledCheckbox key={index} style={styleObj}>{item}</LabelledCheckbox>
    ));
  }

  storeForm(){
    let validateSubForm = true;
    for(let key in this.validationState){
      if(this.validationState[key] === false)
        validateSubForm = false;
    }
    const newObj = {...this.state, validateSubForm : validateSubForm};
    console.log(JSON.stringify(newObj));
    localStorage.setItem("addInfo",JSON.stringify(newObj));
  }

  render(){
    return(//wrapping checkboxes in a container div, enabling flex display and allowing wrap to enable multiline flexbox
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Additional Information </h2>
            <br/>

            <LabelledCheckboxGroup
              options={["Manufacturer","Wholesaler","Distributer","Importer"]}
              groupColumns={2}
              value={this.state.typeOfEstablishment}
              onChange={this.updateInfo.bind(this,"typeOfEstablishment")}
              validationState={this.validationState.typeOfEstablishment}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Choose atleast one option"}>
              Type of establishment
            </LabelledCheckboxGroup>

            <LabelledSelect
              options={["Less than 1 Lakh","Between 1 Lakh and 10 Lakhs","Between 10 Lakhs and 1 Crore","More than 1 Crore","I dont know"]}
              value={this.state.annualTurnover}
              onChange={this.updateInfo.bind(this,"annualTurnover")}
              validationState={this.validationState.annualTurnover}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Annual Turnover
            </LabelledSelect>
            <br/>
            <br/>

            <LabelledSelect
              options={["1 - 10","11 - 100","101 - 500","More than 500"]}
              value={this.state.numberRangeProducts}
              onChange={this.updateInfo.bind(this,"numberRangeProducts")}
              validationState={this.validationState.numberRangeProducts}
              validate={fieldValidations.noValidation}
              helpText={null}>
              How many products do you sell?
            </LabelledSelect>
            <br/>
            <br/>

            <LabelledCheckboxGroup
              options={["Flipkart","Amazon","Snapdeal","Shopclues","Indiamart","Just Dial","Wydr","Shotang","Just Buy Live"]}
              groupColumns={2}
              value={this.state.otherWebsitesSoldOn}
              onChange={this.updateInfo.bind(this,"otherWebsitesSoldOn")}
              validationState={this.validationState.otherWebsitesSoldOn}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Other websites you sell on
            </LabelledCheckboxGroup>


            <LabelledTextInput
              value={this.state.otherWebsitesSoldOnText}
              onChange={this.updateInfo.bind(this,"otherWebsitesSoldOnText")}
              validationState={this.validationState.otherWebsitesSoldOnText}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Others
            </LabelledTextInput>
            <br/>

            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.storeForm}>Continue</Button>

          </div>

        </div>
    );
  }
}

export default AddInfo;
