import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Baby from "babyparse";
import {Button, Menu, MenuDivider, MenuItem, Popover, Position} from '@blueprintjs/core';
import { Table, Column, Cell, EditableCell} from "@blueprintjs/table";
import cascadedDisplay from '../actions/cascadedDisplay';
import * as productUploadActions from '../actions/productUpload';
import * as _ from 'lodash';
import Callout from '../components/Callout';
let classNames = require("classnames");
import Tether from 'tether';

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


class AutoCompleteDropDown extends Component{

  constructor(props){
    super(props);
      this.state = { options: props.options, input: ""};
  }

  componentDidMount(){
    console.log("inside dropdown");
    console.log("state", this.state);
    console.log("props", this.props);
  }

  handleSelect = (value) => {
    this.props.onSelect(value);
  }

  componentWillReceiveProps(nextProps){
    this.setState({options: nextProps.options, input: ""});   //When a new cell is clicked, this component will receive new options. Along with that, we are clearing the text input
  }

  renderOptions = (item, index) => {
    console.log("item is", item);
    if(item.indexOf('++') === 0){ //To add new Option
      item = item.slice(3, item.length);
      //TODO: API call to add new option
      return(
          <MenuItem key={index} text={item} iconName="pt-icon-add-to-artifact" onClick={this.handleSelect.bind(null, item)}/>
      );
    }

    return(
      <MenuItem intent="primary" key={index} text={item} onClick={this.handleSelect.bind(null, item)}/>
    );
  }

  onChange = (event) => {
    let newOptions = [];
    let found = false;

    for(let i = 0; i < this.props.options.length; i++){
      if(this.props.options[i].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
        newOptions.push(this.props.options[i]);
        if(this.props.options[i].toLowerCase() === event.target.value.toLowerCase())
          found = true;
      }
    }

    if(found === false && event.target.value.length > 0){ //provision to add option if it doesn't already exist
      newOptions.push(`++ ${event.target.value}`);
    }

    this.setState({input: event.target.value, options: newOptions});
  }

  render(){
    let textInput;
    return(
      <div className= "autoCompleteDropDown" style= {this.props.style}>
        <div style={{padding: "5px 5px 5px 5px", backgroundColor: "whitesmoke"}}>
          <input className="pt-input pt-input-blueShadowDisable" style={{width: "100%"}} value={this.state.input} onChange={this.onChange} onClick={(event) => {event.stopPropagation();}}/>
        </div>
        <Menu className="dropDown">
          {this.state.options.map(this.renderOptions)}
        </Menu>
      </div>
    );
  }
}

AutoCompleteDropDown.propTypes= {
  children: React.PropTypes.string,
  options: React.PropTypes.array,
  value: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  //handleSelect = (value) => {
  // this.setState({value: value})
  // }
  style: React.PropTypes.object
}




class UploadProductThree extends Component{

  constructor(){
    super();
    this.state= { tableCells: [], tableVState: [], showTableError: false, showAutoComplete: false, dropdownOptions: [], dropdownValue: null, selectedCell: null };
    this.allFields = [];
    this.columnNames = [];
  }

  addRow = () => {
    let newArray = [...this.state.tableCells];
    let newRow = [];
    for(let i=0; i< this.columnNames.length; i++){
      newRow.push("");
    }
    newArray.push(newRow);
    this.setState({ tableCells: newArray });

    newArray = [...this.state.tableVState];
    newRow = [];
    for(let i=0; i< this.columnNames.length; i++){
      newRow.push((this.columnNames[i].validation)? false : true); //If a validation regex exists, we are pushing a default validation false.
    }
    newArray.push(newRow);
    this.setState({ tableVState: newArray });
  }

  validateCell = (row, col, value) => {
    console.log("the value passed is "+ value);
    let newArray = [...this.state.tableVState];
    let newRow = [...newArray][row];

    if(this.columnNames[col].validation){
      let pattern = new RegExp(this.columnNames[col].validation);
      newRow[col] = pattern.test(value);
      console.log("testing" + value + "with pattern " + pattern + "result " + newRow[col]);
    }
    else{
      console.log("no validation string");
      newRow[col] = true;
    }

    newArray[row] = newRow;
    this.setState({ tableVState: newArray });

    newArray = [...this.state.tableCells];
    newRow = [...newArray][row];
    newRow[col] = value;
    newArray[row] = newRow;
    this.setState({ tableCells: newArray });
  }

  editCell = (row, col, value) => {
    this.setState({ showAutoComplete: false });
    console.log("confirm");
    let newArray = [...this.state.tableCells];
    let newRow = [...newArray][row];
    newRow[col] = value;
    newArray[row] = newRow;
    this.setState({ tableCells: newArray });
  }


  openPopover = (parentClassName, ref, event) => {
    console.log("opening popover");
    event.stopPropagation();
    //set autocomplete state
    let newArray = [];
    _.each(this.props.productUploadData.keyValue[ref], (value, key) => {newArray.push(value.name)} );
    console.log("new options are" + newArray);
    this.setState({dropdownOptions: newArray, selectedCell: parentClassName});

    this.drop = new Tether({
      target: document.querySelector('.'+parentClassName),
      element: document.querySelector('.autoCompleteDropDown'),
      attachment: 'top center',
      targetAttachment: 'bottom center',
    });
    this.setState({showAutoComplete: true});
    // this.setState((prevState) => {return {showAutoComplete: !prevState.showAutoComplete} });
  }


  renderColumn = (item, colIndex) => {
    // console.log("inside renderColumn", item);
    const renderCell = (rowIndex) => {
      const cellClassName = "myCell"+"-"+rowIndex+"-"+colIndex;
      if(item.ref){
        return <Cell
                  key={rowIndex}
                  className= {cellClassName}
                  intent= {(this.state.tableVState[rowIndex][colIndex] === true)? null : 3}
                  onClick={ this.openPopover.bind(this, cellClassName, item.ref ) }>
                  {this.state.tableCells[rowIndex][colIndex]}
                </Cell>
      }
      else{
        return <EditableCell
                  key={rowIndex}
                  value={this.state.tableCells[rowIndex][colIndex]}
                  intent= {(this.state.tableVState[rowIndex][colIndex] === true)? null : 3}
                  onChange= {this.validateCell.bind(null, rowIndex, colIndex)}
                  onConfirm= {this.editCell.bind(null, rowIndex, colIndex)}
                  interactive= {true}
                  onClick= {()=>{console.log("closing popover"); this.setState({ showAutoComplete: false })}}
                />
      }
    }
    return(
      <Column key={colIndex} name={(item.required === true)? item.key + "*" : item.key} renderCell={renderCell} />
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

  handleDropdownSelect = (value) => {
    console.log("selected cell is "+ this.state.selectedCell);
    let cellNameArray = this.state.selectedCell.split("-");
    console.log("cell "+ cellNameArray[1] + cellNameArray[2]);
    this.validateCell(cellNameArray[1], cellNameArray[2], true);
    this.editCell(cellNameArray[1], cellNameArray[2], value);
    this.setState({dropdownValue: value});
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
    console.log("submit pressed");
    for(let i =0; i< this.state.tableVState.length; i++){
      for(let j=0; j< this.state.tableVState[i].length; j++){
        if(this.state.tableVState[i][j] === false){
          this.setState({showTableError: true});
          return null;
        }
      }
    }
    this.setState({showTableError: false});
    console.log("persisting to db");
  }

  componentWillMount(){
    // let _b;
    // console.log(classNames("abc", (_b = {},
    //     _b["lol"] = "pqr",
    //     _b["rofl"] = "stu",
    //     _b
    // ), "def"));
    // console.log("_b is", _b);
    _.each( this.props.productUploadData.keyValue[this.props.productUploadData.selectedCategory], (value, key) => {
      if(this.props.productUploadData.selectedCommonFields.indexOf(key) < 0){
        this.columnNames.push(Object.assign({}, value, {key: key}));
      }
    })
    console.log("remaining fields: ", this.columnNames);

  }

  componentWillUnmount(){
    // this.drop.destroy();
    let top = document.getElementById("body");
    console.log("parent is", top);
    let nested = document.getElementsByClassName("autoCompleteDropDown")[0];
    console.log("removing ", nested);
    let garbage = top.removeChild(nested)
  }

  render(){
    return(
      <div id = "top" onClick = {() => this.setState({showAutoComplete: false})}>

        <AutoCompleteDropDown
          options= {this.state.dropdownOptions}
          value= {this.state.dropdownValue}
          onSelect= {this.handleDropdownSelect}
          style={{ display: (this.state.showAutoComplete)? "block" : "none", border: "1px solid whitesmoke" }}
        />

        <p><strong>Note: </strong>Fields marked * are required</p>
        <br/>

        <Button className="pt-icon-plus" onClick={this.addRow}> Add Row </Button>
        <br/>
        <Table numRows={this.state.tableCells.length} className="table">
          {this.columnNames.map(this.renderColumn)}
        </Table>
        <br/>

        <Callout text={"Table has invalid fields"} visible={this.state.showTableError} intent={"pt-intent-danger"} />
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
