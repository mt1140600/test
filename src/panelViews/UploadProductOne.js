import React, {Component} from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Tooltip, Position} from '@blueprintjs/core';

import LabelledSelect from "../components/LabelledSelect";
import LabelledCheckboxGroup from "../components/LabelledCheckboxGroup";
import * as productUploadActions from '../actions/productUpload';
import * as fieldValidations from "../utils/fieldValidations";
import cascadedDisplay from '../actions/cascadedDisplay';


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


class UploadProductOne extends Component{

  constructor(){
    super();
    this.state = { vStateCategory:true, categoryKey:null, commonKeys:[] };
    this.denormalizedFields = [];
  }

  selectCategory = (value, vState) => {
    this.setState({vStateCategory:vState, categoryKey:value});
    this.props.getKeyValueData(value);
    return null;
  }

  onCheckboxChange = (value, vState) => {
    this.setState({commonKeys:value});
    this.props.selectCommonFields(value);
    // this.buildStepTwoState(value);
  }

  // buildStepTwoState = (selectedFieldsArray) => {
  //   this.stepThreeArray = [];
  //   let allFields = [];
  //   let stepTwoFields = [];
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
  //   console.log("Inside build step two");
  //   console.log(selectedFieldsArray);
  //   console.log(this.denormalizedFields);
  //   selectedFieldsArray.map(fetchOptions);
  //   console.log("step2",this.stepTwoArray);
  //   console.log("step3", this.stepThreeArray);
  //   this.props.cascadedDisplay(1, true);
  //   //ffff
  // }


  submitSelectedKeys = () => {
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
    // setTimeout(() => {this.buildStepTwoState(this.state.commonKeys)}, 500);
  }

  render(){

    let categories = this.props.productUploadData.keyValue.categories;
    if (categories) {
      categories["0"]={name:"Choose Category",ref:"Choose Category"};
    }
    let optionalValues = [];
    let compulsaryValues = [];
    let commonValues = [];
    this.denormalizedFields= [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    if(categoryData) {
      _.each(categoryData, (value, key) => {
          (value.required) ? compulsaryValues.push({key:key, priority:value.priority}) : optionalValues.push({key:key, priority:value.priority});
          if (value.common) {
            commonValues.push({key:key, priority:value.priority});
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
        <LabelledSelect
          options={categories}
          displayKey={"name"}
          responseKey={"ref"}
          validationState={this.state.vStateCategory}
          validate={fieldValidations.validateSelect.bind(null,"Choose Category")}
          style={{"float":"none"}}
          helpText={"No category selected."}
          onChange={this.selectCategory}>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductOne);
