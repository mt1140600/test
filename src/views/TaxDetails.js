import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledFileUpload from '../components/LabelledFileUpload';
FocusStyleManager.onlyShowFocusOnTabs();

class TaxDetails extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update your VAT and CST details </h2>
            <br/>
            <LabelledTextInput>PAN Number</LabelledTextInput>
            <LabelledTextInput>VAT/TIN Number</LabelledTextInput>
            <LabelledTextInput>CST Number</LabelledTextInput>
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
