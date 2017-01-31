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


class UploadProductOne extends Component{

  constructor(){
    super();
    this.state = { vStateCategory:true, categoryKey:null, commonKeys:[] };
    this.denormalizedFields = [];
  }

  selectCategory = (value, vState) => {
    this.setState({vStateCategory:vState, categoryKey:value});
    this.props.selectCategory(value);
    this.props.getKeyValueData(value);
    return null;
  }

  onCheckboxChange = (value, vState) => {
    this.setState({commonKeys:value});
    this.props.selectCommonFields(value);
  }

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
    console.log("requiredKeys", requiredKeys);
    this.props.getMulitpleKeyValueData(requiredKeys);
    setTimeout(() => {this.props.cascadedDisplay(1, true)}, 500);
  }

  render(){
    let categories = this.props.productUploadData.keyValue.categories;
    if (categories) {
      categories["0"]={name:"Choose Category",ref:"Choose Category"};
    }
    let optionalValues = [];
    let optionalRequired = [];
    let optionalPopovers = [];

    let compulsaryValues = [];

    let commonValues = [];
    let commonRequired = [];
    let commonPopovers = [];

    this.denormalizedFields= [];
    let categoryData = this.props.productUploadData.keyValue[this.state.categoryKey];
    if(categoryData) {
      _.each(categoryData, (value, key) => {
          // (value.required) ? compulsaryValues.push({key:key, priority:value.priority}) : optionalValues.push({key:key, priority:value.priority});
          if (value.common) {
            //if the checkbox is required, i'm pushing a classname that will make it's background red
            commonValues.push({key:key, priority:value.priority, required:(value.required)? "checkboxRequired" : "checkboxOptional", description:(value.description)? value.description : false });
          }
          else{
            optionalValues.push({key:key, priority:value.priority, required:(value.required)? "checkboxRequired" : "checkboxOptional", description:(value.description)? value.description : false });
          }
          this.denormalizedFields.push({key: key, priority: value.priority, ref: value.ref, type: value.type});
      });
      // compulsaryValues = _.sortBy(compulsaryValues,'priority');
      optionalValues = _.sortBy(optionalValues,'priority');
      optionalRequired = _.map(optionalValues,(value, index) => {
        return value.required;
      });
      optionalPopovers = _.map(optionalValues,(value, index) => {
        return value.description;
      })
      optionalValues = _.map(optionalValues,(value, index) => {
        return value.key;
      });

      commonValues = _.sortBy(commonValues, 'priority');
      commonRequired = _.map(commonValues,(value, index) => {
        return value.required;
      });
      commonPopovers = _.map(commonValues,(value, index) => {
        return value.description;
      })
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
              <div>Please select the key-values which are common in all the products</div>
              <br/>
              <LabelledCheckboxGroup
                options={commonValues}
                classNames={commonRequired}
                popovers={commonPopovers}
                groupColumns={3}
                value={this.state.commonKeys}
                onChange={this.onCheckboxChange}
                validationState={true}
                validate={fieldValidations.noValidation}
                helpText={"Choose atleast one option"}>
              </LabelledCheckboxGroup>
              <br/>

              <div>Unique fields</div>
              <br/>
              <div style={{display: "flex", justifyContent: "flex-start"}}>
              {
                optionalValues.map((item, index) =>
                  <div key={index} className={optionalRequired[index]} style={{flexBasis: "calc(33% - 5%)", marginRight:"5px", minHeight: 20, paddingLeft: 26}}>
                    {
                      (optionalPopovers[index])?
                        <Tooltip className= "pt-tooltip-indicator" content={optionalPopovers[index]} inline={false} position={Position.RIGHT}>
                          {item}
                        </Tooltip>
                      :
                        item
                    }
                  </div>
                )
              }
              </div>
              <br/>
              <div className="pt-callout pt-icon-info-sign">
                  <span style={{color: "rgba(219, 55, 55, 1)"}}>Fields in red are required fields</span>
                  <br/>
                  <span style={{color: "rgba(15, 153, 96, 1)"}}>Fields in green are optional fields</span>
              </div>
              <br/>
              <Button onClick={this.submitSelectedKeys} className="pt-intent-primary" style={{width:"200px"}}>Continue</Button>
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
