import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledFileUpload from '../components/LabelledFileUpload';
FocusStyleManager.onlyShowFocusOnTabs();

class POCDetails extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Point of Contact details </h2>
            <br/>
            <LabelledTextInput>Name <small>(optional)</small></LabelledTextInput>
            <LabelledTextInput>Phone Number <small>(optional)</small></LabelledTextInput>
            <LabelledTextInput>Email ID <small>(optional)</small></LabelledTextInput>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>

          </div>

        </div>
    );
  }
}

export default POCDetails;
