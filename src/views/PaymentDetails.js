import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledFileUpload from '../components/LabelledFileUpload';
FocusStyleManager.onlyShowFocusOnTabs();

class PaymentDetails extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Update Bank Account details </h2>
            <br/>
            <LabelledTextInput>Account Holder Name</LabelledTextInput>
            <LabelledTextInput>Account Number</LabelledTextInput>
            <LabelledTextInput>IFSC Code</LabelledTextInput>
            <LabelledSelect options={["Savings","Current"]}>Type</LabelledSelect>
            <LabelledFileUpload>Cancelled Cheque</LabelledFileUpload>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>


          </div>

        </div>
    );
  }
}

export default PaymentDetails;
