import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from '@blueprintjs/core';
import LabelledSelect from "../components/LabelledSelect";
import LabelledCheckboxGroup from "../components/LabelledCheckboxGroup";
import LabelledTextInput from "../components/LabelledTextInput";
import LabelledUpload from "../components/LabelledUpload";
import LabelledAutoComplete from '../components/LabelledAutoComplete';
import ProductQuantity from '../components/ProductQuantity';
import VariablePrice from '../components/VariablePrice';
import LabelledTextArea from '../components/LabelledTextArea';
import AdditionalInfo from '../components/AdditionalInfo';
import MultipleImageUpload from '../components/MultipleImageUpload';
import cascadedDisplay from '../actions/cascadedDisplay';
import * as productUploadActions from '../actions/productUpload';
import * as _ from "lodash";
// import deepCompare from 'react-addons-deep-compare';
import deepEqual from 'deep-equal';

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


class UploadProductTwo extends Component{

  constructor(){
    super();
    this.stepTwoArray = [];
    this.state={vState: []};
  }

  handleStepTwoStateChange = (key, oldObj, newVal, newVState = true) => {
    this.props.handleStepTwoStateChange({ [`${key}`]: Object.assign({}, oldObj, {value: newVal, vState: newVState}) });
  }

  renderCorrespondingComponent = (item, key) => {
    console.log("item is", item);
    switch(item.type){

      case "auto-fill":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <LabelledAutoComplete
              options = {item.options}
              value = {item.value}
              vState = {item.vState}
              onSelect = {this.handleStepTwoStateChange.bind(null, key, item)}
              dbPath= {`keyValues/${item.ref}`}
            >
              {key}
            </LabelledAutoComplete>
          </div>
        );
      break;

      case "additional-info":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <AdditionalInfo
              value = {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </AdditionalInfo>
          </div>
        );
      break;

      case "image-upload":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <MultipleImageUpload
              value= {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </MultipleImageUpload>
          </div>
        );
      break;

      case "multiselect":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <LabelledCheckboxGroup
              options= {item.options}
              value= {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </LabelledCheckboxGroup>
          </div>
        );
      break;

      case "String":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <LabelledTextInput
              value= {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </LabelledTextInput>
          </div>
        );
      break;

      case "variable-price":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <VariablePrice
              value= {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </VariablePrice>
          </div>
        );
      break;

      case "quantity":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <ProductQuantity
              value= {item.value}
              vState = {item.vState}
              onChange = {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </ProductQuantity>
          </div>
        );
      break;

      case "video":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <LabelledUpload
              value= {item.value}
              vState = {item.vState}
              onChange= {this.handleStepTwoStateChange.bind(null, key, item)}
            >
              {key}
            </LabelledUpload>
          </div>

        );
      break;

      default:
        console.log("No component found corresponding to type! ", item);
      break;
    }
  }

  handleStepTwoState = () => {
      console.log(this.props.productUploadData.selectedCommonFields);
      this.props.productUploadData.selectedCommonFields.forEach(
        (selectedCommonField) => {
          // console.log("selected common field is "+ selectedCommonField);
          _.each(this.props.productUploadData.keyValue[this.props.productUploadData.selectedCategory], (value, key) => {
            // console.log("value is ", value);
            // console.log("key is ", key);
            if(key === selectedCommonField){
              //check if state already has key
              //else
              //find options
              let stateObj = { type: value.type } ;

              let val = null;
              let vState = false;

              switch(value.type){
                case 'auto-fill':
                  val = `Select ${key}`;
                  // vState = false;
                break;

                case 'additional-info':
                  val = [ { info: ""} ];
                  vState = true;
                break;

                case 'image-upload':
                  val = { images: [], defaultImage: 0 };
                  // vState = false;
                break;

                case 'multiselect':
                  val = [];
                  vState = true;
                break;

                case 'String':
                  val = "";
                  // vState = false;
                break;

                case 'variable-price':
                  val = {range: ["max"], price: [1]};
                  vState = true;
                break;

                case 'quantity':
                  val = [1,1,1];
                  vState = true;
                break;

                case 'video':
                  val = null;
                  vState = true;
                break;

                default:
                  console.log("Unknown type");
              }
              Object.assign(stateObj, {value: val, vState: vState});

              if(value.ref){
                console.log("fetching options");
                let newArray = [];
                _.each(this.props.productUploadData.keyValue[value.ref], (value, key) => {newArray.push(value.name)} );
                console.log(newArray);
                Object.assign(stateObj, {options: newArray, ref: value.ref});
              }

              if(typeof(this.props.productUploadData.stepTwoState[key]) === "undefined"){
                this.props.handleStepTwoStateChange({ [`${key}`]: stateObj });
              }
              else if(!deepEqual(this.props.productUploadData.stepTwoState[key].options, stateObj.options)){
                stateObj = {options: stateObj.options} //So that other keys don't get overwritten
                this.props.handleStepTwoStateChange({ [`${key}`]: stateObj });
              }
            }
          })
        }
      );
  }

  submitStepTwo = () => {
    //check vState
    let allClear = true;
    _.each(this.props.productUploadData.stepTwoState, (item, key) => {
      if(item.vState === false){
        allClear = false;
        return null;
      }
    });

    if(allClear){
      this.props.cascadedDisplay(2, true);
    }
  }

  componentDidMount(){
    console.log("Component is Mounting");
    console.log(this.props.productUploadData);
    this.handleStepTwoState();
  }

  // componentWillReceiveProps(nextProps){
  //   if( !_.isEqual(this.props.productUploadData.selectedCommonFields, nextProps.productUploadData.selectedCommonFields) ){
  //     console.log("new field selected");
  //     this.handleStepTwoState();
  //   }
  // }

  componentDidUpdate(prevProps){  //Using this instead of componentWillReceiveProps as we are still working with old state in handleStepTwoState method
      if( !_.isEqual(this.props.productUploadData.selectedCommonFields, prevProps.productUploadData.selectedCommonFields) ){
        this.props.cascadedDisplay(2, false);
        let deletedFields = prevProps.productUploadData.selectedCommonFields.diff(this.props.productUploadData.selectedCommonFields); //added diff to Array.prototype
        if( deletedFields.length > 0 ){
          console.log("deleted fields ", deletedFields);
          this.props.removeSelectedField(deletedFields[0]) //There will always be only one element in the array as for every field unselected, new props are sent
        }
        console.log("new field selected");
        this.handleStepTwoState();
      }
      else{
        this.handleStepTwoState();
      }
  }

  render(){
    this.componentArray = [];
    _.each(this.props.productUploadData.stepTwoState, this.renderCorrespondingComponent);
    return(
      <div>
        {
          this.componentArray
        }
        <Button className="pt-intent-primary" style={{width:"200px"}} onClick={this.submitStepTwo}>Continue</Button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
      productUploadData : state.productUploadData.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, productUploadActions, {cascadedDisplay} ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductTwo);
