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

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


class UploadProductTwo extends Component{

  constructor(){
    super();
    this.stepTwoArray = [];
  }

  handleStepTwoStateChange = (key, oldObj, newVal) => {
    this.props.handleStepTwoStateChange({ [`${key}`]: Object.assign({}, oldObj, {value: newVal}) });
  }

  renderCorresponsingComponent = (item, key) => {
    switch(item.type){

      case "auto-fill":
        this.componentArray.push(
          <div key= {key} className="productDetailContainer">
            <LabelledAutoComplete
              options = {item.options}
              value = {item.value}
              onSelect = {this.handleStepTwoStateChange.bind(null, key, item)}
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

  // buildStepTwoState = (selectedFieldsArray) => {
  //
  //   const fetchOptions = (item, index) => {
  //     allFields = [];
  //     _.each( this.denormalizedFields, (item2, index2) => {
  //       allFields.push(this.denormalizedFields[index2].key);
  //       console.log("initial step 3 array");
  //       console.log(this.stepThreeArray);
  //       if(item2.key === item){
  //         if(typeof(item2.ref) !== "undefined"){
  //           // this.denormalizedFields[index2].options =
  //           console.log("fetching options for ", item2.ref);
  //           console.log(this.props.productUploadData.keyValue[item2.ref]);
  //           let newArray = [];
  //           _.each(this.props.productUploadData.keyValue[item2.ref], (value, key) => {
  //             return newArray.push(value.name);
  //           });
  //           this.denormalizedFields[index2].options = newArray;
  //           // console.log("denorm", this.denormalizedFields);
  //         }
  //         this.stepTwoArray.push(this.denormalizedFields[index2]);
  //         stepTwoFields.push(this.denormalizedFields[index2].key);
  //         // this.stepThreeArray.splice(this.stepThreeArray.indexOf(this.denormalizedFields[index2].key), 1);
  //         console.log("step2");
  //         console.log(this.stepTwoArray);
  //       }
  //     });
  //     this.stepThreeArray = allFields.diff(stepTwoFields);
  //   };
  //
  //   let allFields = [];
  //   let stepTwoFields = [];
  //
  //   console.log("Inside build step two");
  //   console.log(selectedFieldsArray);
  //   console.log(this.denormalizedFields);
  //   selectedFieldsArray.map(fetchOptions);
  //   console.log("step2",this.stepTwoArray);
  //   console.log("step3", this.stepThreeArray);
  //   this.props.cascadedDisplay(1, true);
  //   //ffff
  // }

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
              switch(value.type){
                case 'auto-fill':
                  val = `Select ${key}`;
                break;

                case 'additional-info':
                  val = [ { info: ""} ];
                break;

                case 'image-upload':
                  val = { images: [], defaultImage: 0 };
                break;

                case 'multiselect':
                  val = [];
                break;

                case 'String':
                  val = "";
                break;

                case 'variable-price':
                  val = {range: [9999], price: [0]};
                break;

                case 'quantity':
                  val = [0,0,0];
                break;

                case 'video':
                  val = null;
                break;

                default:
                  console.log("Unknown type");
              }
              Object.assign(stateObj, {value: val});

              if(value.ref){
                console.log("fetching options");
                let newArray = [];
                _.each(this.props.productUploadData.keyValue[value.ref], (value, key) => {newArray.push(value.name)} );
                console.log(newArray);
                Object.assign(stateObj, {options: newArray});
              }

              this.props.handleStepTwoStateChange({ [`${key}`]: stateObj });
            }
          })
        }
      );
  }

  submitStepTwo = () => {
  // let newtableCellsArray = [];
  // newtableCellsArray.push(this.stepThreeArray);
  // this.setState({ tableCells: newtableCellsArray });
  this.props.cascadedDisplay(2, true);
  }

  componentDidMount(){
    console.log("Component is Mounting");
    console.log(this.props.productUploadData);
    // this.buildStepTwoState(this.props.productUploadData.selectedCommonFields);
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
  }

  render(){
    this.componentArray = [];
    _.each(this.props.productUploadData.stepTwoState, this.renderCorresponsingComponent);
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
