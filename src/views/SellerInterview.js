import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledFileUpload from '../components/LabelledFileUpload';
FocusStyleManager.onlyShowFocusOnTabs();

class SellerInterview extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h4> Type of establishment </h4>



          </div>

        </div>
    );
  }
}

export default SellerInterview;
