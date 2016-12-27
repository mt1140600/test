import React, {Component} from 'react';
import PanelHeader from "../components/PanelHeader";
import LabelledSelect from "../components/LabelledSelect";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledFileUpload from "../components/LabelledFileUpload";
import * as fieldValidations from "../utils/fieldValidations";
import {Button} from "@blueprintjs/core";
import {Table, Column, Cell} from "@blueprintjs/table"
import {productCategories} from '../constants';
import moment from "moment";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productUploadActions from '../actions/productUpload';

export class TableDollarExample extends Component{
    render() {
        const renderCell = (rowIndex: number) => <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
        return (
            <Table numRows={10}>
                <Column name="Dollars" renderCell={renderCell}/>
            </Table>
        );
    }
}

class UploadProduct extends Component{

  constructor(){
    super();
    this.state = {vStateCategory:true};
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]]
  }

  componentWillMount() {
    this.props.getKeyValueData('categories');
  }


  onChange = (value, vState) => {
    this.setState({vStateCategory:vState});
    this.props.getKeyValueData(value);

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

  render() {
    console.log(this.props.productUploadData);
    let categories = this.props.productUploadData.keyValue.categories;
    if (categories) {
      categories["0"]={name:"Choose Category",ref:"Choose Category"};
    }
    return(
      <div>
        <div className="tabs" style={{display:"flex",flexDirection:"column", alignItems:"left"}}>
          <div>
            <LabelledSelect
              options={categories}
              displayKey={"name"}
              responseKey={"ref"}
              validationState={this.state.vStateCategory}
              validate={fieldValidations.validateSelect.bind(null,"Choose Category")}
              style={{"float":"none"}}
              helpText={"No category selected."}
              onChange={this.onChange}>
              Choose a category:
            </LabelledSelect>

          </div>
          <br/>
          <div>Please fill in the common attributes of the product to be uploaded</div>
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

        <TableDollarExample />

      </div>

    </div>
    );
  }

}

const mapStateToProps = (state) => {
  return{
    productUploadData : state.productUploadData.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(productUploadActions, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProduct);
