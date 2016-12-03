import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledFileUpload from '../components/LabelledFileUpload';
import PlainSelect from '../components/PlainSelect';
FocusStyleManager.onlyShowFocusOnTabs();

const establishments = ["Manufacturer","Wholesaler","Distributer","Importer"];
const websites = ["Flipkart","Amazon","Snapdeal","Shopclues","Indiamart","Just Dial","Wydr","Shotang","Just Buy Live"];

class SellerInterview extends Component{
  constructor(){
    super();
    this.renderCheckboxes = this.renderCheckboxes.bind(this);
  }

  renderCheckboxes(item,index){
      return(
        <LabelledCheckbox key={index}>{item}</LabelledCheckbox>
      );
  }

  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h6> Type of establishment </h6>
            <div>
              {establishments.map(this.renderCheckboxes)}
            </div>
            <br/>

            <h6>Annual Turnover</h6>
            <PlainSelect options={["Less than 1 Lakh","Between 1 Lakh and 10 Lakhs","Between 10 Lakhs and 1 Crore","More than 1 Crore","I dont know"]}></PlainSelect>
            <br/>

            <h6>How many products do you sell?</h6>
            <PlainSelect options={["1 - 10","11 - 100","101 - 500","More than 500"]}></PlainSelect>
            <br/>

            <h6>Other websites you sell on</h6>
            <div>
              {websites.map(this.renderCheckboxes)}
            </div>
            <LabelledTextInput>Others</LabelledTextInput>
            <br/>

            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>

          </div>

        </div>
    );
  }
}

export default SellerInterview;
