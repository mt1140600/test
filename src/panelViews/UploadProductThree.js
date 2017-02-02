import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Baby from "babyparse";
import {Button, Menu, MenuDivider, MenuItem, Popover, Position} from '@blueprintjs/core';
import { Table, Column, EditableCell} from "@blueprintjs/table";
import { Cell } from 'prokure_blueprint_table';
import cascadedDisplay from '../actions/cascadedDisplay';
import * as productUploadActions from '../actions/productUpload';
import * as _ from 'lodash';
import Callout from '../components/Callout';
let classNames = require("classnames");
import Tether from 'tether';
import * as firebase from 'firebase';
import {uploadProducts} from '../actions/productUpload';

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

let dropdownTextInput = null;



class HoverTop extends Component{
  render(){
    return(
      <div className="hoverTop" style={this.props.style}>
        {this.props.content}
      </div>
    );
  }
}

HoverTop.propTypes = {
  content: React.PropTypes.string,
  style: React.PropTypes.object
}



class AutoCompleteDropDown extends Component{

  constructor(props){
    super(props);
      this.state = { options: props.options, input: props.value};
  }

  handleSelect = (value, updateDb) => { //Clicking an option automatically makes dropdown disapper as the vent propogates to the div which has an onClick callback that hides the dropdown
    this.props.onSelect(value);
    if(updateDb){
      firebase.database().ref(this.props.dbPath+"/"+value).set({name: value, verified: false});
    }
  }

  componentWillReceiveProps(nextProps){
    let dummyEvent = {};
    dummyEvent.target = {};
    dummyEvent.target.value = nextProps.value;
    //Faking an input event to set the dropdown options based on value
    this.setState({options: nextProps.options, input: nextProps.value}, ()=>{this.onChange(dummyEvent)});   //When a new cell is clicked, this component will receive new options. Along with that, we are clearing the text input
  }

  renderOptions = (item, index) => {
    if(item.indexOf('++') === 0){ //To add new Option
      item = item.slice(3, item.length);
      //TODO: API call to add new option
      return(
          <MenuItem key={index} text={item} iconName="pt-icon-add-to-artifact" onClick={this.handleSelect.bind(null, item, true)}/>
      );
    }

    return(
      <MenuItem intent="primary" key={index} text={item} onClick={this.handleSelect.bind(null, item, false)}/>
    );
  }

  onChange = (event) => {
    let newOptions = [];
    let found = false;
    let value = event.target.value;

    for(let i = 0; i < this.props.options.length; i++){
      if(this.props.options[i].toLowerCase().indexOf(value.trim().toLowerCase()) > -1){
        newOptions.push(this.props.options[i]);
        if(this.props.options[i].toLowerCase() === value.trim().toLowerCase()){
          found = true;
        }
      }
    }

    if(found === false && value.trim().length > 0){ //provision to add option if it doesn't already exist
      newOptions.push(`++ ${value}`);
    }

    this.setState({input: value, options: newOptions});
  }

  render(){
    let textInput;
    return(
      <div className= "autoCompleteDropDown" style= {this.props.style}>
        <div style={{padding: "5px 5px 5px 5px", backgroundColor: "whitesmoke"}}>
          <input ref={(input) => {dropdownTextInput = input;}} className="pt-input pt-input-blueShadowDisable" style={{width: "100%"}} value={this.state.input} onChange={this.onChange} onClick={(event) => {event.stopPropagation();}}/>
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
  style: React.PropTypes.object,
  dbPath: React.PropTypes.string
}




class UploadProductThree extends Component{

  constructor(){
    super();
    this.state= { tableCells: [], tableVState: [], showCallout: false, showAutoComplete: false, dropdownOptions: [], dropdownValue: "", selectedCell: null, dbSubPath: "", hoverTopValue: "hello there!", showHoverTop: false, calloutText: "" };
    this.allFields = [];
    this.columnNames = [];
    this.addRowButton = null;
    this.fileInput = null;
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
      newRow.push((this.columnNames[i].required)? false : true); //If a validation regex exists, we are pushing a default validation false.
    }
    newArray.push(newRow);
    this.setState({ tableVState: newArray });
  }

  validateCell = (row, col, value) => {
    let newArray = [...this.state.tableVState];
    let newRow = [...newArray][row];

    if(this.columnNames[col].ref){
      //check if value is in options
      let newArray = [];
      _.each(this.props.productUploadData.keyValue[this.columnNames[col].ref], (value, key) => {newArray.push(value.name)} );
      if(newArray.indexOf(value) > -1){
        newRow[col] = true;
      }
      else {
        newRow[col] = false;
      }
    }
    else if(this.columnNames[col].validation){
      let pattern = new RegExp(this.columnNames[col].validation);

      //Dynamically change helpText visibility
      if(pattern.test(value)) this.setState({showHoverTop: false});
      else this.setState({showHoverTop: true});

      newRow[col] = pattern.test(value);
    }
    else{
      newRow[col] = true;
    }

    newArray[row] = newRow;
    this.setState({ tableVState: newArray });
  }

  editCell = (row, col, value) => {
    this.setState({ showAutoComplete: false });
    let newArray = [...this.state.tableCells];
    let newRow = [...newArray][row];
    newRow[col] = value;
    newArray[row] = newRow;
    this.setState({ tableCells: newArray });
  }

  openHoverTop = (parentClassName, ref) => {
    let cellNameArray = parentClassName.split("-");
    //if the field has a help text, set that as hoverTopValue
    let helpText = "Invalid value";
    if(this.columnNames[cellNameArray[2]].helpText) helpText = this.columnNames[cellNameArray[2]].helpText;
    if(this.state.tableVState[cellNameArray[1]][cellNameArray[2]] === false){
      this.setState(
        {showHoverTop: true, hoverTopValue: helpText},
        () => {
          this.hoverTop = new Tether({
            target: document.querySelector('.'+parentClassName),
            element: document.querySelector('.hoverTop'),
            attachment: 'bottom center',
            targetAttachment: 'top center',
          });
        }
      );
    }
  }

  toggleDropdown = (parentClassName, ref, event) => {
    event.stopPropagation();
    let cellNameArray = parentClassName.split("-");
    if(this.state.selectedCell === parentClassName && this.state.showAutoComplete === true){
      this.setState({showAutoComplete: false});
      return null;
    }
    //set autocomplete state
    let newArray = [];
    _.each(this.props.productUploadData.keyValue[ref], (value, key) => {newArray.push(value.name)} );
    //The first time the dropdown is supposed to appear, the tether happens only after another click or scroll. to fix this, i'm mocking a tiny scroll
    this.setState({dropdownOptions: newArray, selectedCell: parentClassName, dbSubPath: ref, dropdownValue: this.state.tableCells[cellNameArray[1]][cellNameArray[2]], showAutoComplete: true}, () => {
      this.dropdown = new Tether({
        target: document.querySelector('.'+parentClassName),
        element: document.querySelector('.autoCompleteDropDown'),
        attachment: 'top center',
        targetAttachment: 'bottom center',
      });
      //TODO: Fix hack
      const container = document.getElementById("app");
      container.scrollLeft = container.scrollLeft - 1;
      container.scrollLeft = container.scrollLeft + 1;  //If screen is already scrolled to right extreme, this alone does not work. Thus, above line is required
    });  //After the dropdown is made visible, im calling tether else, alignment gets skewed cuz the element's display is none
    setTimeout(() => {dropdownTextInput.focus();}, 300);
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
                  onClick={ this.toggleDropdown.bind(this, cellClassName, item.ref) }
                  onMouseEnter={this.openHoverTop.bind(this, cellClassName, item.ref)}
                  onMouseLeave={()=>{this.setState({showHoverTop: false})}}
                  >
                  {this.state.tableCells[rowIndex][colIndex]}
                </Cell>
      }
      else{
        return <EditableCell
                  key={rowIndex}
                  className= {cellClassName}
                  value={this.state.tableCells[rowIndex][colIndex]}
                  intent= {(this.state.tableVState[rowIndex][colIndex] === true)? null : 3}
                  onChange= { (value) => { this.validateCell(rowIndex, colIndex, value); this.editCell(rowIndex, colIndex, value); } }
                  onConfirm= {this.editCell.bind(null, rowIndex, colIndex)}
                  interactive= {true}
                  onClick= {()=>{console.log("closing popover"); this.setState({ showAutoComplete: false })}}
                  onMouseEnter={this.openHoverTop.bind(this, cellClassName, item.ref)}
                  onMouseLeave={()=>{this.setState({showHoverTop: false})}}
                />
      }
    }
    return(
      <Column key={colIndex} name={(item.required === true)? item.key + "*" : item.key} renderCell={renderCell} />
    );
  }

  download = () => {
    this.setState({calloutText:"Do not change table headers in csv!", showCallout: true});
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += this.columnNames.map( (item, index) => (item.required)? item.key+"*": item.key).join(",") + "\n";
    this.state.tableCells.forEach( (infoArray, index) => {
      let dataString = infoArray.join(",");
      csvContent += index < this.state.tableCells.length ? dataString+ "\n" : dataString;
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  validateCellTrue = (row, col) => {
    let newArray = [...this.state.tableVState];
    let newRow = [...newArray][row];
    newRow[col] = true;
    newArray[row] = newRow;
    this.setState({ tableVState: newArray });
  }

  handleDropdownSelect = (value) => {
    let cellNameArray = this.state.selectedCell.split("-");
    this.validateCellTrue(cellNameArray[1], cellNameArray[2]);
    this.editCell(cellNameArray[1], cellNameArray[2], value);
    this.setState({dropdownValue: value});
  }

  handleFileSelect = (evt) => {
    var files = evt.target.files; // FileList object
    var reader = new FileReader();
    reader.readAsText(files[0], "UTF-8");
    reader.onload = (evt) => {
      //map csv contents to 2D array
      let parsed = Baby.parse(evt.target.result.trim());
      //removing table headers
      parsed.data.splice(0,1);
      //calculate validationState 2D array
      let i, j;
      for(i=0; i<parsed.data.length; i++ ){
        for(j=0; j<parsed.data[i].length; j++){
          this.validateCell(i, j, parsed.data[i][j]);
        }
        if(j < this.columnNames.length){  //Ideally, at the end of j-loop, j will be equal to columnNames.length (not columnNames.length-1 because of last j++). If some rows don't have all columns (some commas have been removed) then, j will be less than columnNames.length.
          this.setState({calloutText:"Invalid CSV file uploaded", showCallout: true});
          return null;
        }
      }
      this.setState({tableCells: parsed.data});
      //Reseting fileInput's value so that, even if same named file is uploaded, onChange callback is triggered
      this.fileInput.value = '';
    }
    reader.onerror = function (evt) {
      this.setState({calloutText:"Error reading file", showCallout: true});
      console.log("error reading file");
      //Reseting fileInput's value so that, even if same named file is uploaded, onChange callback is triggered
      this.fileInput.value = '';
    }
  }

  submitStepThree = () => {
    for(let i =0; i< this.state.tableVState.length; i++){
      for(let j=0; j< this.state.tableVState[i].length; j++){
        if(this.state.tableVState[i][j] === false){
          this.setState({calloutText:"Table has invalid values", showCallout: true});
          return null;
        }
      }
    }
    this.setState({showCallout: false});
    console.log("persisting to db");

    let payload = [];
    for(let i=0; i<this.state.tableCells.length; i++){
      let productObject = {};
        productObject.user_id = this.props.userData.user;
      _.each(this.props.productUploadData.stepTwoState, (value, key) => {
        productObject[`${key}`] = value.value;
      });
      for(let j=0; j<this.state.tableCells[i].length; j++){

        switch(this.columnNames[j].type){
          case "auto-fill":
            productObject[`${this.columnNames[j].key}`] = this.state.tableCells[i][j];
          break;
          case "additional-info":
            productObject[`${this.columnNames[j].key.split("-")[0].trim()}`] = [ this.state.tableCells[i][j], this.state.tableCells[i][j+1], this.state.tableCells[i][j+2]];
            j = j + 2;
          break;
          case "image-upload":
            productObject[`${this.columnNames[j].key}`] = {images: [this.state.tableCells[i][j]], defaultImage: 0};
          break;
          case "multiselect":
            productObject[`${this.columnNames[j].key}`] = [this.state.tableCells[i][j]];
          break;
          case "String":
            productObject[`${this.columnNames[j].key}`] = this.state.tableCells[i][j];
          break;
          case "variable-price":
            productObject[`${this.columnNames[j].key}`] = { price: [this.state.tableCells[i][j]], range: ["max"] };
          break;
          case "quantity":
            productObject[`${this.columnNames[j].key.split("-")[0].trim()}`] = [ this.state.tableCells[i][j], this.state.tableCells[i][j+1], this.state.tableCells[i][j+2]];
            j = j + 2;
          break;
          case "video":
            productObject[`${this.columnNames[j].key}`] = this.state.tableCells[i][j];
          break;
          default:
            console.log("Type not found ", this.columnNames);
            return null;
          break;
        }
      }
      payload.push(productObject);
    }
    console.log("storing into db: ", payload);
    uploadProducts(payload);
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
      if(this.props.productUploadData.selectedCommonFields.indexOf(key) < 0){   //If field is not present in stepTwo, it should be present in stepThree
        if(key === "AdditionalInfo"){
          this.columnNames.push(Object.assign({}, value, {key: key+" - Bullet 1"}));
          this.columnNames.push(Object.assign({}, value, {key: key+" - Bullet 2"}));
          this.columnNames.push(Object.assign({}, value, {key: key+" - Bullet 3"}));
        }
        else if(key === "Quantity"){
          this.columnNames.push(Object.assign({}, value, {key: key+" - Minimum Qty"}));
          this.columnNames.push(Object.assign({}, value, {key: key+" - Maximum Qty"}));
          this.columnNames.push(Object.assign({}, value, {key: key+" - Steps of"}));
        }
        else{
          this.columnNames.push(Object.assign({}, value, {key: key}));
        }
      }
    })
  }

  componentDidMount(){
    this.addRow();
  }

  componentWillUnmount(){
    // this.dropdown.destroy(); //this is a tether destory, it will only destroy the tether link, thereofre the div wont be atached to it's parent. that's all

    let top = document.getElementById("body");

    let dropdownDiv = document.getElementsByClassName("autoCompleteDropDown")[0];
    if(dropdownDiv.parentNode == top) top.removeChild(dropdownDiv);

    let hoverTopDiv = document.getElementsByClassName("hoverTop")[0];
    if(hoverTopDiv.parentNode == top) top.removeChild(hoverTopDiv);
  }

  render(){
    return(
      <div id = "top" onClick = {() => this.setState({showAutoComplete: false})}>

        <HoverTop
          style={{ display: (this.state.showHoverTop)? "block" : "none" }}
          content={this.state.hoverTopValue}
        />

        {/* Have to render AutoComplete now itself so that i can tether it to a cell later on. On intial mount, i'm setting it's display to none. When a cell is clicked, it's display is made block */}
        <AutoCompleteDropDown
          options= {this.state.dropdownOptions}
          value= {this.state.dropdownValue}
          onSelect= {this.handleDropdownSelect}
          dbPath= {`keyValues/${this.state.dbSubPath}`}
          style={{ display: (this.state.showAutoComplete)? "block" : "none", border: "1px solid whitesmoke", boxShadow: "0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2)" }}
        />

        <div className="pt-callout pt-icon-info-sign">Fields marked * are required</div>
        <br/>

        <Button className="pt-icon-plus" onClick={this.addRow}> Add Row </Button>
        <br/>
        <Table numRows={this.state.tableCells.length} className="table">
          {this.columnNames.map(this.renderColumn)}
        </Table>
        <br/>

        <Callout text={this.state.calloutText} visible={this.state.showCallout} intent={"pt-intent-danger"} />
        <br/>

        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center"}}>
          <button className="pt-button pt-icon-download pt-intent-warning" onClick={this.download} style={{maxHeight: 30}}>Download as CSV</button>

          <label className="pt-button pt-icon-upload pt-intent-primary" style={{maxHeight: 30}}>
            <input ref={(input) => this.fileInput = input} type="file" style={{display: "none"}} onChange={this.handleFileSelect}/>
            <span className="pt-file-upload-input">Upload filled CSV</span>
          </label>

          <button className="pt-button pt-icon-confirm pt-intent-success" onClick={this.submitStepThree} style={{maxHeight: 30, minWidth: 100}}>Confirm</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    productUploadData : state.productUploadData.toJS(),
    userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, productUploadActions, {cascadedDisplay} ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductThree);
