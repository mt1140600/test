import React, {Component} from 'react';
import {Tooltip, Position} from "@blueprintjs/core";
import PanelHeader from "../components/PanelHeader";
import LabelledSelect from "../components/LabelledSelect";
import LabelledCheckboxGroup from "../components/LabelledCheckboxGroup";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledUpload from "../components/LabelledUpload";
import * as fieldValidations from "../utils/fieldValidations";
import {Button} from "@blueprintjs/core";
import {Table, Column, Cell, EditableCell} from "@blueprintjs/table";
import {productCategories} from '../constants';
import CascadedDisplay from '../components/CascadedDisplay';
import moment from "moment";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productUploadActions from '../actions/productUpload';
import * as _ from 'lodash';
import Tether from 'tether';
import MultipleImageUpload from '../components/MultipleImageUpload';
import Immutable from 'immutable';
import cascadedDisplay from '../actions/cascadedDisplay';
import LabelledAutoComplete from '../components/LabelledAutoComplete';
import ProductQuantity from '../components/ProductQuantity';
import VariablePrice from '../components/VariablePrice';
import LabelledTextArea from '../components/LabelledTextArea';
import AdditionalInfo from '../components/AdditionalInfo';

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
    this.state = {vStateCategory:true, categoryKey:null,commonKeys:[], images: Immutable.List([]), defaultImage: 0, stepTwoStates: Immutable.List([]), tableRows: 2 };
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]];
    this.stepTwoArray = [
      {
        type: "auto-fill",
        key: "Face",
        options: ["Front", "Back"]
      },
      {
        type: "additional-info",
        key: "AdditionalInfo",
      },
      {
        type: "image-upload",
        key: "Image"
      },
      {
        type: "auto-fill",
        key: "Model",
        options: ["Apple", "Banana"]
      },
      {
        type: "String",
        key: "Name"
      },
      {
        type: "variable-price",
        key: "Price"
      },
      {
        type: "quantity",
        key: "Quantity"
      },
      {
        type: "video",
        key: "Video"
      }
    ];
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
    this.props.cascadedDisplay(1, true);
  }

  submitStepTwo = () => {
    // console.log(this.state.stepTwoStates);
    this.props.cascadedDisplay(2, true);
  }

  handleChange = (newImages, defaultImage) =>{
    this.setState({images: newImages, defaultImage: defaultImage});
  }

  setStepTwoStates = (index, value) => {
    this.setState({stepTwoStates})
  }

  handleStepTwoStateChange = (index, value) => {
    // console.log("index, value", index, value);
    this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, value) });
  }

  renderTableColumns = (colObj, index) => {
    // console.log("Column Object is ", colObj);

    const renderCell = (rowIndex) => {
      if(typeof(this.state.stepTwoStates.get(index)) !== "object"){
        // console.log("Value is ", this.state.stepTwoStates.get(index));
        return <Cell>{this.state.stepTwoStates.get(index)}</Cell>
      }
      else {
        // console.log("else Value is ", this.state.stepTwoStates.get(index));
        return <Cell>{null}</Cell>;
      }
    }
    return(
      <Column name={colObj.key} renderCell={renderCell}/>
    );
  }

  renderCorresponsingComponent = (item, index) => {
    switch(item.type){

      case "auto-fill":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, item.options[0])});
        return(
          <div key= {index} className="productDetailContainer">
            <LabelledAutoComplete
              options = {item.options}
              value = {this.state.stepTwoStates.get(index)}
              onSelect = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </LabelledAutoComplete>
          </div>
        );
      break;

      case "additional-info":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, [ { info: ""} ])});
        return(
          <div key= {index} className="productDetailContainer">
            <AdditionalInfo
              value = {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </AdditionalInfo>
          </div>
        );
      break;

      case "image-upload":
      if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, { images: [], defaultImage: 0 })});
        return(
          <div key= {index} className="productDetailContainer">
            <MultipleImageUpload
              value= {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </MultipleImageUpload>
          </div>
        );
      break;

      case "multiselect":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, [])});
        return(
          <div key= {index} className="productDetailContainer">
            <LabelledCheckboxGroup
              options= {item.options}
              value= {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </LabelledCheckboxGroup>
          </div>
        );
      break;

      case "String":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, "")});
        return(
          <div key= {index} className="productDetailContainer">
            <LabelledTextInput
              value= {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </LabelledTextInput>
          </div>
        );
      break;

      case "variable-price":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, {range: [9999], price: [0]} )});
        return(
          <div key= {index} className="productDetailContainer">
            <VariablePrice
              value= {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </VariablePrice>
          </div>
        );
      break;

      case "quantity":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, [0,0,0]) });
        return(
          <div key= {index} className="productDetailContainer">
            <ProductQuantity
              value= {this.state.stepTwoStates.get(index)}
              onChange = {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </ProductQuantity>
          </div>
        );
      break;

      case "video":
        if( typeof(this.state.stepTwoStates.get(index)) === "undefined" ) this.setState({ stepTwoStates: this.state.stepTwoStates.set(index, null) });
        return(
          <div key= {index} className="productDetailContainer">
            <LabelledUpload
              value= {this.state.stepTwoStates.get(index)}
              onChange= {this.handleStepTwoStateChange.bind(null, index)}
            >
              {item.key}
            </LabelledUpload>
          </div>

        );
      break;

      default:
        console.log("No component found corresponding to type! ", item);
      break;
    }
  }

  downloadCsv = () => {
    console.log("Downloading table as csv");
  }

  uploadCsv = () => {
      console.log("Uploading csv");
  }

  render() {
    const renderCell = (rowIndex: number) => <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
    // console.log(this.props);
    let categories = this.props.productUploadData.keyValue.categories;
    if (categories) {
      categories["0"]={name:"Choose Category",ref:"Choose Category"};
    }
    let optionalValues = [];
    let compulsaryValues = [];
    let commonValues = [];
    let commonValuesObj = [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    if(categoryData) {
      _.each(categoryData, (value, key) => {
          (value.required) ? compulsaryValues.push({key:key, priority:value.priority}) : optionalValues.push({key:key, priority:value.priority});
          if (value.common) {
            commonValues.push({key:key, priority:value.priority});
            commonValuesObj.push({key: key, });
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
        <div className="tabs" style={{ display:"flex", flexDirection:"column", alignItems:"left", padding: 0 }}>
          <CascadedDisplay
            style= {{ height: "75vh" }}
            one={
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
            }
            two={
              <div>
                {
                  this.stepTwoArray.map(this.renderCorresponsingComponent)
                }
                <Button className="pt-intent-primary" style={{width:"200px"}} onClick={this.submitStepTwo}>Continue</Button>
              </div>
            }
            three={
              <div>
                <Button className="pt-icon-plus" onClick={ () => {this.setState({ tableRows: this.state.tableRows + 1})} } />
                <br/>
                <Table numRows={this.state.tableRows}>
                  {
                    this.stepTwoArray.map(this.renderTableColumns)
                  }
                </Table>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                  <Button iconName="pt-icon-download" intent={0} onClick={this.downloadCsv}>Download as CSV</Button>
                  <Button iconName="pt-icon-upload" intent={1} onClick={this.uploadCsv}>Upload CSV of products</Button>
                </div>
              </div>
            }
          />
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
  return bindActionCreators(Object.assign({}, productUploadActions, {cascadedDisplay} ), dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProduct);
