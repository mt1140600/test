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
import MultipleImageUpload from '../components/MultipleImageUpload';
import Immutable from 'immutable';
import cascadedDisplay from '../actions/cascadedDisplay';
import LabelledAutoComplete from '../components/LabelledAutoComplete';
import ProductQuantity from '../components/ProductQuantity';
import VariablePrice from '../components/VariablePrice';
import LabelledTextArea from '../components/LabelledTextArea';
import AdditionalInfo from '../components/AdditionalInfo';
import Baby from "babyparse";

import UploadProductOne from "./UploadProductOne";

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

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
    this.state = {vStateCategory:true, categoryKey:null,commonKeys:[], images: Immutable.List([]), defaultImage: 0, stepTwoStates: Immutable.List([]), tableRows: 2, csv: null, tableCells: [["Name", "Age", "Sex"], ["Anand", 22, "Male"], ["Stone Cold", 40, "Beast"]] };
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]];
    this.denormalizedFields = [];
    this.stepTwoArray = [];
    this.stepThreeArray = [];
    // this.stepTwoArray = [
    //   {
    //     type: "auto-fill",
    //     key: "Face",
    //     options: ["Front", "Back"]
    //   },
    //   {
    //     type: "additional-info",
    //     key: "AdditionalInfo",
    //   },
    //   {
    //     type: "image-upload",
    //     key: "Image"
    //   },
    //   {
    //     type: "auto-fill",
    //     key: "Model",
    //     options: ["Apple", "Banana"]
    //   },
    //   {
    //     type: "String",
    //     key: "Name"
    //   },
    //   {
    //     type: "variable-price",
    //     key: "Price"
    //   },
    //   {
    //     type: "quantity",
    //     key: "Quantity"
    //   },
    //   {
    //     type: "video",
    //     key: "Video"
    //   }
    // ];
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
    this.buildStepTwoState(value);
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

  buildStepTwoState = (selectedFieldsArray) => {
    this.stepThreeArray = [];
    let allFields = [];
    let stepTwoFields = [];

    const fetchOptions = (item, index) => {
      allFields = [];
      _.each( this.denormalizedFields, (item2, index2) => {
        allFields.push(this.denormalizedFields[index2].key);
        console.log("initial step 3 array");
        console.log(this.stepThreeArray);
        if(item2.key === item){
          if(typeof(item2.ref) !== "undefined"){
            // this.denormalizedFields[index2].options =
            console.log("fetching options for ", item2.ref);
            console.log(this.props.productUploadData.keyValue[item2.ref]);
            let newArray = [];
            _.each(this.props.productUploadData.keyValue[item2.ref], (value, key) => {
              return newArray.push(value.name);
            });
            this.denormalizedFields[index2].options = newArray;
            // console.log("denorm", this.denormalizedFields);
          }
          this.stepTwoArray.push(this.denormalizedFields[index2]);
          stepTwoFields.push(this.denormalizedFields[index2].key);
          // this.stepThreeArray.splice(this.stepThreeArray.indexOf(this.denormalizedFields[index2].key), 1);
          console.log("step2");
          console.log(this.stepTwoArray);
        }
      });
      this.stepThreeArray = allFields.diff(stepTwoFields);
    };
    console.log("Inside build step two");
    console.log(selectedFieldsArray);
    console.log(this.denormalizedFields);
    selectedFieldsArray.map(fetchOptions);
    console.log("step2",this.stepTwoArray);
    console.log("step3", this.stepThreeArray);
    this.props.cascadedDisplay(1, true);
    //ffff
  }

  submitSelectedKeys = () => {
    this.props.cascadedDisplay(1, false);
    let requiredKeys = [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    this.stepTwoArray = [];
    this.stepThreeArray = [];
    _.each(categoryData, (value, key) => {
      if(value.ref && value.common) {
        requiredKeys.push(value.ref);
      }
    });
    this.props.getMulitpleKeyValueData(requiredKeys);
    setTimeout(() => {this.buildStepTwoState(this.state.commonKeys)}, 500);
  }

  submitStepTwo = () => {
    // console.log(this.state.stepTwoStates);
    //set tableCells
    let newtableCellsArray = [];
    newtableCellsArray.push(this.stepThreeArray);
    this.setState({ tableCells: newtableCellsArray });
    this.props.cascadedDisplay(2, true);
    //ggg
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

  // renderTableColumns = (colObj, index) => {
  //   // console.log("Column Object is ", colObj);
  //
  //   const renderCell = (rowIndex) => {
  //     if(typeof(this.state.stepTwoStates.get(index)) !== "object"){
  //       // console.log("Value is ", this.state.stepTwoStates.get(index));
  //       return <Cell>{this.state.stepTwoStates.get(index)}</Cell>
  //     }
  //     else {
  //       // console.log("else Value is ", this.state.stepTwoStates.get(index));
  //       return <Cell>{null}</Cell>;
  //     }
  //   }
  //   return(
  //     <Column name={colObj.key} renderCell={renderCell}/>
  //   );
  // }

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


  download = () => {
    var csvContent = "data:text/csv;charset=utf-8,";
    this.state.tableCells.forEach( (infoArray, index) => {
      let dataString = infoArray.join(",");
      csvContent += index < this.state.tableCells.length ? dataString+ "\n" : dataString;
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  editCell = (row, col, value) => {
    console.log("confirm");
    let newArray = [...this.state.tableCells];
    let newRow = [...newArray][row];
    newRow[col] = value;
    newArray[row] = newRow;
    this.setState({ tableCells: newArray });
  }

  renderColumn = (item, index) => {
    const renderCell = (rowIndex) => {
      return <EditableCell value={this.state.tableCells[rowIndex + 1][index]} onConfirm={this.editCell.bind(null, rowIndex+1, index)}/>
    }
    return(
      <Column key={index} name={item} renderCell={renderCell} />
    );
  }

  addRow = () => {
    let newArray = [...this.state.tableCells];
    let newRow = [];
    for(let i=0; i< this.state.tableCells[0].length; i++){
      newRow.push(null);
    }
    newArray.push(newRow);
    this.setState({ tableCells: newArray });
  }

  handleFileSelect = (evt) => {
    var files = evt.target.files; // FileList object
    var reader = new FileReader();
    reader.readAsText(files[0], "UTF-8");
    reader.onload = (evt) => {
      console.log(evt.target.result);
      //map csv contents to 2D array
      let parsed = Baby.parse(evt.target.result);
      console.log(parsed.data);
      this.setState({tableCells: parsed.data});
    }
    reader.onerror = function (evt) {
      console.log("error reading file");
    }
  }

  submitStepThree = () => {
      console.log("Persisting table to Mongo");
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
    this.denormalizedFields= [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    if(categoryData) {
      _.each(categoryData, (value, key) => {
          (value.required) ? compulsaryValues.push({key:key, priority:value.priority}) : optionalValues.push({key:key, priority:value.priority});
          if (value.common) {
            commonValues.push({key:key, priority:value.priority});
            commonValuesObj.push({key: key, });
          };
          this.denormalizedFields.push({key: key, priority: value.priority, ref: value.ref, type: value.type});
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
        <div id="tabs" className="tabs" style={{ display:"flex", flexDirection:"column", alignItems:"left", padding: 0 }}>
          <CascadedDisplay
            style= {{ height: "75vh" }}
            one= {
              <UploadProductOne />
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
                <Button className="pt-icon-plus" onClick={this.addRow}> Add Row </Button>
                <br/>
                <Table numRows={this.state.tableCells.length - 1}>
                  {this.state.tableCells[0].map(this.renderColumn)}
                </Table>
                <br/>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>

                  <Button iconName="pt-icon-download" intent={2} onClick={this.download}>Download as CSV</Button>

                  <label className="pt-button pt-icon-upload pt-intent-primary">
                    <input type="file" style={{display: "none"}} onChange={this.handleFileSelect}/>
                    <span className="pt-file-upload-input">Upload filled CSV</span>
                  </label>

                  <Button iconName="pt-icon-confirm" intent={1} onClick={this.submitStepThree}>Confirm</Button>
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
