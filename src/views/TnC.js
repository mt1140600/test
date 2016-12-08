import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

class TnC extends Component{
  constructor(){
    super();
    this.submitForm = this.submitForm.bind(this);
    this.tabs = ["sellerInfo","taxDetails","paymentDetails","POCDetails","addInfo"];
  }

  submitForm(){
    let formObj = null;
    let formValidated = true;
    this.tabs.map((item,index)=>{
      let subFormObj = JSON.parse(localStorage.getItem(item));
      if(subFormObj.validateSubForm === false)  formValidated = false;
      delete subFormObj.validateSubForm;
      formObj = Object.assign({},formObj,subFormObj);
    });
    console.log(formObj);
    console.log("validated? "+formValidated);
  }

  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Terms &amp; Conditions </h2>
            <br/>

            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.submitForm}>I Accept</Button>
          </div>

        </div>
    );
  }
}

export default TnC;
