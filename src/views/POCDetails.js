import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import * as fieldValidations from '../fieldValidations';

FocusStyleManager.onlyShowFocusOnTabs();

class POCDetails extends Component{

  constructor(){
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.validationState = {POCName:true, POCPhone:true, POCEmail:true};
    this.state = {POCName:"",POCPhone:"",POCEmail:""};
  }

  updateInfo(field,value,vState){
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
  }

  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Point of Contact details </h2>
            <br/>

            <LabelledTextInput
              value={this.state.POCName}
              onChange={this.updateInfo.bind(this,"POCName")}
              validationState={this.validationState.POCName}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Name <small>(optional)</small>
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.POCPhone}
              onChange={this.updateInfo.bind(this,"POCPhone")}
              validationState={this.validationState.POCPhone}
              validate={fieldValidations.noValidation}
              helpText={"Enter a valid phone number"}>
              Phone Number <small>(optional)</small>
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.POCEmail}
              onChange={this.updateInfo.bind(this,"POCEmail")}
              validationState={this.validationState.POCEmail}
              validate={fieldValidations.noValidation}
              helpText={"Enter a valid email ID"}>
              Email ID <small>(optional)</small>
            </LabelledTextInput>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>

          </div>

        </div>
    );
  }
}

export default POCDetails;
