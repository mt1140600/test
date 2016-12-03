import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
FocusStyleManager.onlyShowFocusOnTabs();

class SellerDetails extends Component{
  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Tell us about your business </h2>

            <LabelledTextInput>Store Name</LabelledTextInput>
            <LabelledSelect options={["Choose primary category","Electronics"]}>Product Category</LabelledSelect>
            <br/>

            <h4>Enter your address</h4>

            <LabelledTextInput>Pin Code</LabelledTextInput>
            <LabelledTextInput>Address Line 1</LabelledTextInput>
            <LabelledTextInput>Address Line 2</LabelledTextInput>
            <LabelledSelect options={["Choose State","Delhi"]}>State</LabelledSelect>
            <LabelledSelect options={["Choose City","New Delhi"]}>City</LabelledSelect>
            <LabelledCheckbox  style={{margin:"auto"}}>My warehouse address is same as above</LabelledCheckbox>
            <br/>

            <h2>Warehouse Details</h2>

            <LabelledTextInput>Warehouse Address 1</LabelledTextInput>
            <LabelledTextInput>Warehouse Address 2</LabelledTextInput>
            <LabelledTextInput>Pin Code</LabelledTextInput>
            <LabelledSelect options={["Choose State","Delhi"]}>State</LabelledSelect>
            <LabelledSelect options={["Choose City","New Delhi"]}>City</LabelledSelect>

            <label className="pt-label pt-inline">
              Operational Hours
              <div style={{float:"right"}}>
                <input className="pt-input" style={{width: "50px"}} type="text" dir="auto" />
                <div className="pt-select">
                  <select defaultValue="0">
                    <option value="0">am</option>
                    <option value="1">pm</option>
                  </select>
                </div>
                to
                <input className="pt-input" style={{width: "50px"}} type="text" dir="auto" />
                <div className="pt-select">
                  <select defaultValue="0">
                    <option value="0">am</option>
                    <option value="1">pm</option>
                  </select>
                </div>
              </div>
            </label>

            <label className="pt-label pt-inline">
              Working Days
              <div style={{float:"right"}}>
                <div className="pt-select">
                  <select defaultValue="0">
                    <option value="0">Monday</option>
                    <option value="1">Tuesday</option>
                  </select>
                </div>
                to
                <div className="pt-select">
                  <select defaultValue="0">
                    <option value="0">Saturday</option>
                    <option value="1">Tuesday</option>
                  </select>
                </div>
              </div>
            </label>
            <br/>

            <Button className="pt-intent-primary" style={{width:"200px",margin:"auto"}}>Continue</Button>

          </div>

      </div>
    );
  }
}

export default SellerDetails;
