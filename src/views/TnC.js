import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledFileUpload from '../components/LabelledFileUpload';
FocusStyleManager.onlyShowFocusOnTabs();

class TnC extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Terms &amp; Conditions </h2>
            <br/>

            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}}>I Accept</Button>
          </div>

        </div>
    );
  }
}

export default TnC;
