import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Baby from "babyparse";
import { Table, Column, Cell, EditableCell} from "@blueprintjs/table";
import {Button} from "@blueprintjs/core";
import cascadedDisplay from '../actions/cascadedDisplay';
import * as productUploadActions from '../actions/productUpload';
import * as _ from 'lodash'

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

class UploadProductThree extends Component{

  constructor(){
    super();
    this.state= { tableCells: [], tableVState: [] };
    this.allFields = [];
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

  editCell = (row, col, value) => {
    console.log("confirm");
    let newArray = [...this.state.tableCells];
    let newRow = [...newArray][row];
    newRow[col] = value;
    newArray[row] = newRow;
    this.setState({ tableCells: newArray });
  }

  renderColumn = (item, index) => {
    console.log("inside renderColumn", item);
    const renderCell = (rowIndex) => {
      // console.log("row"+ rowIndex);
      // console.log(this.state.tableCells[rowIndex + 1][index]);
      return <EditableCell value={this.state.tableCells[rowIndex + 1][index]} intent= {3} onConfirm={this.editCell.bind(null, rowIndex+1, index)}/>
    }
    return(
      <Column key={index} name={item} renderCell={renderCell} />
    );
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

  componentWillMount(){
    _.each( this.props.productUploadData.keyValue[this.props.productUploadData.selectedCategory], (value, key) => {
      this.allFields.push(key);
    })
    let stepThreeFields = this.allFields.diff(this.props.productUploadData.selectedCommonFields);
    console.log("remaining fields: ", stepThreeFields);
    this.setState({tableCells: [ stepThreeFields ]});
  }

  componentWillReceiveProps(){

  }

  render(){
    return(
      <div>
        <Button className="pt-icon-plus" onClick={this.addRow}> Add Row </Button>
        <br/>
        <Table numRows={this.state.tableCells.length - 1}>
          {this.state.tableCells[0].map(this.renderColumn)}
        </Table>
        <br/>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>

          <button className="pt-button pt-icon-download pt-intent-warning" onClick={this.download} style={{maxHeight: 30}}>Download as CSV</button>

          <label className="pt-button pt-icon-upload pt-intent-primary" style={{maxHeight: 30}}>
            <input type="file" style={{display: "none"}} onChange={this.handleFileSelect}/>
            <span className="pt-file-upload-input">Upload filled CSV</span>
          </label>

          <button className="pt-button pt-icon-confirm pt-intent-success" onClick={this.submitStepThree} style={{maxHeight: 30}}>Confirm</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductThree);
