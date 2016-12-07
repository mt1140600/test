import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledSelect from '../components/LabelledSelect';
FocusStyleManager.onlyShowFocusOnTabs();

const establishments = ["Manufacturer","Wholesaler","Distributer","Importer"];
const websites = ["Flipkart","Amazon","Snapdeal","Shopclues","Indiamart","Just Dial","Wydr","Shotang","Just Buy Live"];

class AddInfo extends Component{
  constructor(){
    super();
    this.alignCheckboxes = this.alignCheckboxes.bind(this);
  }

  alignCheckboxes(arr, cols){
   const styleObj = {flexBasis:`${100/cols}%`}; //Dividing the container into required columns
   return arr.map((item,index)=>(
      <LabelledCheckbox key={index} style={styleObj}>{item}</LabelledCheckbox>
    ));
  }

  render(){
    return(//wrapping checkboxes in a container div, enabling flex display and allowing wrap to enable multiline flexbox
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Additional Information </h2>
            <br/>

            <h6> Type of establishment </h6>
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {this.alignCheckboxes(establishments,2)}
            </div>
            <br/>
            <br/>

            <LabelledSelect options={["Less than 1 Lakh","Between 1 Lakh and 10 Lakhs","Between 10 Lakhs and 1 Crore","More than 1 Crore","I dont know"]}>Annual Turnover</LabelledSelect>
            <br/>
            <br/>

            <LabelledSelect options={["1 - 10","11 - 100","101 - 500","More than 500"]}>How many products do you sell?</LabelledSelect>
            <br/>
            <br/>

            <h6>Other websites you sell on</h6>
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {this.alignCheckboxes(websites,3)}
            </div>
            <LabelledTextInput>Others</LabelledTextInput>
            <br/>

            <Button className="pt-intent-primary" style={{margin:"auto"}}>Continue</Button>

          </div>

        </div>
    );
  }
}

export default AddInfo;
