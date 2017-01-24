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
import UploadProductTwo from './UploadProductTwo';

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
    return(
      <div>
        <div id="tabs" className="tabs" style={{ display:"flex", flexDirection:"column", alignItems:"left", padding: 0 }}>
          <CascadedDisplay
            style= {{ height: "75vh" }}
            one= {
              <UploadProductOne />
            }
            two={
              <UploadProductTwo />
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
