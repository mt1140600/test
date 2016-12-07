import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledFileUpload from '../components/LabelledFileUpload';
import * as fieldValidations from '../fieldValidations';
FocusStyleManager.onlyShowFocusOnTabs();

class TaxDetails extends Component{
  constructor(){
    super();
    this.updateInfo = this.updateInfo.bind(this);
    this.validationState = {PAN:false, VAT:false, CST:false, certIncorp:false, membICC:false};
    this.state = {PAN:"",VAT:"",CST:"",certIncorp:"",membICC:""};
  }

  updateInfo(field,value,vState){
      this.validationState = Object.assign({},this.validationState,{[`${field}`]:vState});
      this.setState({[`${field}`]:value});
  }

  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update your VAT and CST details </h2>
            <br/>
            <LabelledTextInput
              value={this.state.PAN}
              onChange={this.updateInfo.bind(this,"PAN")}
              validationState={this.validationState.PAN}
              validate={fieldValidations.validatePAN}
              helpText={"PAN Number is mandatory"}>
              PAN Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.VAT}
              onChange={this.updateInfo.bind(this,"VAT")}
              validationState={this.validationState.VAT}
              validate={fieldValidations.validateVAT}
              helpText={"VAT Number is mandatory"}>
              VAT/TIN Number
            </LabelledTextInput>

            <LabelledTextInput
              value={this.state.CST}
              onChange={this.updateInfo.bind(this,"CST")}
              validationState={this.validationState.CST}
              validate={fieldValidations.validateCST}
              helpText={"CST Number is mandatory"}>
              CST Number
            </LabelledTextInput>

            <LabelledFileUpload>Certification of Incorporation</LabelledFileUpload>

            <LabelledFileUpload>Membership with Indian Chamber of Commerce</LabelledFileUpload>
            
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>


          </div>

        </div>
    );
  }
}

export default TaxDetails;
