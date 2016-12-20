import React, {Component} from 'react';
import PanelHeader from "../components/PanelHeader";
import LabelledSelect from "../components/LabelledSelect";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledFileUpload from "../components/LabelledFileUpload";
import * as fieldValidations from "../utils/fieldValidations";
import {Button} from "@blueprintjs/core";
import {productCategories} from '../constants';
import moment from "moment";

class UploadProduct extends Component{

  constructor(){
    super();
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]]
  }

  onChange = () =>{
    return null;
  }

  renderTableRow = (item,index) => {
    return(
      <div key={index} style={{flexBasis:"11%", textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"40px"}}>
        {item}
      </div>
    );
  }

  renderTableHeader = (item, index) => {
    return(
      <div key={index} style={{flexBasis:"11%", backgroundColor:"#3f3f3f", color: "white", textAlign:"center", display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"40px"}}>
        {item}
      </div>
    );
  }
  // <div>
  //   {moment().format("DD-MM-YYYY")}
  // </div>
  render(){
    return(
      <div>
        <div className="tabs" style={{display:"flex",flexDirection:"column", alignItems:"left"}}>
          <div>
            <LabelledSelect
              options={productCategories}

              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={"Choose a valid state"}>
              Choose a category:
            </LabelledSelect>

          </div>
          <br/>
          <div>Please fill in the common attributes of the product to be uploaded</div>
          <br/>
          <br/>
          <div style={{maxWidth:"500px"}}>
            <LabelledTextInput

              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Sub Category
            </LabelledTextInput>
            <LabelledTextInput

              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Brand
            </LabelledTextInput>
            <LabelledTextInput

              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Company
            </LabelledTextInput>
            <LabelledTextInput
              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Model
            </LabelledTextInput>
            <LabelledTextInput
              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              MRP
            </LabelledTextInput>
            <LabelledTextInput
              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Selling Price
            </LabelledTextInput>
            <LabelledTextInput
              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Minimum Order Quantity
            </LabelledTextInput>
            <LabelledTextInput
              onChange={this.onChange}
              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Warranty
            </LabelledTextInput>
            <LabelledFileUpload>Image</LabelledFileUpload>
            <a href=""><thin></thin>Click here to add image url from other sites</a>
        </div>
        <br/>
        <Button style={{width:"200px"}}>Upload CSV of products</Button>
        <br/>

        <div style={{display:"flex", flexWrap:"wrap"}}>
          {this.tableHeaders.map(this.renderTableHeader)}
          {this.sampleCSV.map(
            (item,index) => {
              return item.map(this.renderTableRow);
            }
          )}
        </div>
      </div>
    </div>
    );
  }

}

export default UploadProduct;
