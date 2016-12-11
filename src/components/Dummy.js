import React, {Component} from 'react';
import {Checkbox} from "@blueprintjs/core";
import CheckboxWrapper from './CheckboxWrapper';
import LabelledCheckboxGroup from './LabelledCheckboxGroup';

class Dummy extends Component{
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {value:["Amazon,Ebay"]};
    this.validationState = false;
    this.alter = this.alter.bind(this);
  }

  handleCheckboxChange(index) {
    this.array[index] = !this.array[index];
    console.log(this.array);
  }


  alter(newVal,vState) {
    this.validationState = vState;
    this.setState({value: newVal});
  }

  render() {
    let styleObj={flexBasis: "33%"};
    return(
      <LabelledCheckboxGroup
        options={["Flipkart","Amazon","Ebay","Myntra"]}
        groupColumns={3}
        value={this.state.value}
        onChange={this.alter}
        validationState={this.validationState}
        validate={()=>true}
        helpText={"Must choose site"}>
        Sites
      </LabelledCheckboxGroup>
    );
  }
}

export default Dummy;
