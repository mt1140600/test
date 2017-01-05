import React, {Component} from 'react';
import {Tooltip, Position} from "@blueprintjs/core";
import PanelHeader from "../components/PanelHeader";
import LabelledSelect from "../components/LabelledSelect";
import LabelledCheckboxGroup from "../components/LabelledCheckboxGroup";
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
import * as _ from 'lodash';
import Tether from 'tether';

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

class DataWithPopover extends Component {

  render() {
    return (
      <span>
        {this.props.description ?
          <Tooltip content={this.props.description} inline={false} position={Position.TOP}>
            <span style={{textDecoration:'underline'}}>
              {this.props.value.key}
            </span>
          </Tooltip> : this.props.value.key
        }
        {(this.props.count > this.props.index + 1) ? (", ") : ""}
      </span>
    )
  }
}

class UploadProduct extends Component{

  constructor(){
    super();
    this.state = {vStateCategory:true, categoryKey:null,commonKeys:[]};
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]]
  }

  componentWillMount() {
    this.props.getKeyValueData('categories');
  }


  onChange = (value, vState) => {
    this.setState({vStateCategory:vState, categoryKey:value, commonKeys:[]});
    this.props.getKeyValueData(value);

    return null;
  }

  onCheckboxChange = (value, vState) => {
    this.setState({commonKeys:value});
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

  submitSelectedKeys = () => {
    let requiredKeys = [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    _.each(categoryData, (value, key) => {
      if(value.ref && value.common) {
        requiredKeys.push(value.ref);
      }
    });
    this.props.getMulitpleKeyValueData(requiredKeys);
  }

  render() {
    console.log(this.props);
    let categories = this.props.productUploadData.keyValue.categories;
    if (categories) {
      categories["0"]={name:"Choose Category",ref:"Choose Category"};
    }
    let optionalValues = [];
    let compulsaryValues = [];
    let commonValues = [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    if(categoryData) {
      _.each(categoryData, (value, key) => {
          (value.required) ? compulsaryValues.push({key:key, priority:value.priority}) : optionalValues.push({key:key, priority:value.priority});
          if (value.common) {
            commonValues.push({key:key, priority:value.priority});
          }
      });
      compulsaryValues = _.sortBy(compulsaryValues,'priority');
      optionalValues = _.sortBy(optionalValues,'priority');
      commonValues = _.sortBy(commonValues, 'priority');
      commonValues = _.map(commonValues,(value, index) => {
        return value.key;
      });
    }
    return(
      <div>
        <div className="tabs" style={{display:"flex",flexDirection:"column", alignItems:"left"}}>
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
          <br/>
          {categoryData &&
            <div style={{fontSize:'14px'}}>
              <p>
                <span style={{fontWeight:600}}>Required Fields</span> : <span style={{color:'#db3737'}}>
                  {compulsaryValues.map((value, index) => {return <DataWithPopover count={compulsaryValues.length} key={index} index={index} value={value} description={categoryData[value.key].description}/>})}
                </span>
              </p>
              <p>
                <span style={{fontWeight:600}}>Optional Fields</span> : <span style={{color:'#db3737'}}>
                  {optionalValues.map((value, index) => {return <DataWithPopover count={optionalValues.length} key={index} index={index} value={value} description={categoryData[value.key].description}/>})}
                </span>
              </p>
              <br/>

              <h5> Step 1 of 3 </h5>

              <div>
                <div>Please select the key-values which are common in all the products</div>
                <br/>
                <LabelledCheckboxGroup
                  options={commonValues}
                  groupColumns={3}
                  value={this.state.commonKeys}
                  onChange={this.onCheckboxChange}
                  validationState={true}
                  validate={fieldValidations.noValidation}
                  helpText={"Choose atleast one option"}>
                </LabelledCheckboxGroup>
                <Button onClick={this.submitSelectedKeys} className="pt-intent-primary" style={{width:"200px"}}>Continue</Button>
              </div>
            </div>
          }

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
