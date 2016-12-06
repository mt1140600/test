import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckbox from '../components/LabelledCheckbox';
import PlainSelect from '../components/PlainSelect';
import * as constants from '../constants';

FocusStyleManager.onlyShowFocusOnTabs();

class SellerInfo extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Tell us about your business </h2>
            <br/>

            <LabelledTextInput>Store Name</LabelledTextInput>
            <LabelledSelect options={constants.productCategories}>Product Category</LabelledSelect>
            <br/>

            <h4>Enter your address</h4>

            <LabelledTextInput>Pin Code</LabelledTextInput>
            <LabelledTextInput>Address Line 1</LabelledTextInput>
            <LabelledTextInput>Address Line 2</LabelledTextInput>
            <LabelledSelect options={["Choose State", ...constants.states]}>State</LabelledSelect>
            <LabelledTextInput>City</LabelledTextInput>
            <LabelledCheckbox  style={{margin:"auto"}}>My warehouse address is same as above</LabelledCheckbox>
            <br/>

            <h2>Warehouse Details</h2>
            <br/>

            <LabelledTextInput>Warehouse Address 1</LabelledTextInput>
            <LabelledTextInput>Warehouse Address 2</LabelledTextInput>
            <LabelledTextInput>Pin Code</LabelledTextInput>
            <LabelledSelect options={["Choose State", ...constants.states]}>State</LabelledSelect>
            <LabelledTextInput>City</LabelledTextInput>

            <label className="pt-label pt-inline">
              Operational Hours
              <div style={{float:"right"}}>
                <input className="pt-input" style={{width: "50px"}} type="text" dir="auto" />
                <div className="pt-select">
                  <PlainSelect options={["am","pm"]}/>
                </div>
                to
                <input className="pt-input" style={{width: "50px"}} type="text" dir="auto" />
                <div className="pt-select">
                  <PlainSelect options={["am","pm"]}/>
                </div>
              </div>
            </label>

            <label className="pt-label pt-inline">
              Working Days
              <div style={{float:"right"}}>
                <div className="pt-select">
                  <PlainSelect options={constants.daysOfTheWeek}/>
                </div>
                to
                <div className="pt-select">
                  <PlainSelect options={constants.daysOfTheWeek}/>
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

export default SellerInfo;
