import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import LabelledTextInput from '../components/LabelledTextInput';
import LabelledCheckbox from '../components/LabelledCheckbox';
import LabelledSelect from '../components/LabelledSelect';
import LabelledCheckboxGroup from '../components/LabelledCheckboxGroup';
import * as fieldValidations from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateAddlInfo, updateTabValidation} from '../actions/registration';
import {actionTabChange} from '../actions/registration';
import * as constants from '../constants';
import {storeSubForm} from '../utils';

FocusStyleManager.onlyShowFocusOnTabs();

class AddInfo extends Component {
  constructor() {
    super();
    this.alignCheckboxes = this.alignCheckboxes.bind(this);
    this.state={showSpinner: false};
  }

  updateInfo(field, value, vState) {
    this.props.updateAddlInfo(field, value, vState);
  }

  alignCheckboxes(arr, cols) {
   const styleObj = {flexBasis:`${100/cols}%`}; //Dividing the container into required columns
   return arr.map((item,index)=>(
      <LabelledCheckbox key={index} style={styleObj}>{item}</LabelledCheckbox>
    ));
  }

  handleContinue = () => {
    this.setState({showSpinner: true});
    const mapToDbObj = {
      establishment_type: this.props.addlInfo.value.typeOfEstablishment,
      annual_turnover: this.props.addlInfo.value.annualTurnover,
      no_of_product_sold: this.props.addlInfo.value.numberRangeProducts,
      other_ecommerce_website: this.props.addlInfo.value.otherWebsitesSoldOn,
      other_ecommerce_website_text: this.props.addlInfo.value.otherWebsitesSoldOnText
    }
    const successHandler = () => { //When passing this function as an argument to another function, although arrow function does not set context, this fucntion's context is the SellerInfo component class?
      console.log("successHandler");
      console.log(this.props.updateTabValidation);
      this.setState({showSpinner: false});
      this.props.updateTabValidation(5, true);
      this.props.actionTabChange(6);
    }
    const failureHandler = (response) => {
      this.setState({showSpinner: false});
      console.log("failureHandler");
      console.log(response);
    }
    const subFormValid = storeSubForm(this.props.addlInfo, this.props.updateAddlInfo, this.props.updateTabValidation.bind(null, 5, false), mapToDbObj, constants.saveForm, successHandler, failureHandler);

    if(!subFormValid) this.setState({showSpinner: false});
  }

  render() {
    return(//wrapping checkboxes in a container div, enabling flex display and allowing wrap to enable multiline flexbox
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Additional Information </h2>
            <br/>

            <LabelledCheckboxGroup
              options={["Manufacturer","Wholesaler","Distributer","Importer"]}
              groupColumns={2}
              value={this.props.addlInfo.value.typeOfEstablishment}
              onChange={this.updateInfo.bind(this,"typeOfEstablishment")}
              validationState={this.props.addlInfo.vState.typeOfEstablishment}
              validate={fieldValidations.validateMandatoryString}
              helpText={"Choose atleast one option"}>
              Type of establishment
            </LabelledCheckboxGroup>

            <LabelledSelect
              options={["Less than 1 Lakh","Between 1 Lakh and 10 Lakhs","Between 10 Lakhs and 1 Crore","More than 1 Crore","I dont know"]}
              value={this.props.addlInfo.value.annualTurnover}
              onChange={this.updateInfo.bind(this,"annualTurnover")}
              validationState={this.props.addlInfo.vState.annualTurnover}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Annual Turnover
            </LabelledSelect>
            <br/>
            <br/>

            <LabelledSelect
              options={["1 - 10","11 - 100","101 - 500","More than 500"]}
              value={this.props.addlInfo.value.numberRangeProducts}
              onChange={this.updateInfo.bind(this,"numberRangeProducts")}
              validationState={this.props.addlInfo.vState.numberRangeProducts}
              validate={fieldValidations.noValidation}
              helpText={null}>
              How many products do you sell?
            </LabelledSelect>
            <br/>
            <br/>

            <LabelledCheckboxGroup
              options={["Flipkart","Amazon","Snapdeal","Shopclues","Indiamart","Just Dial","Wydr","Shotang","Just Buy Live"]}
              groupColumns={2}
              value={this.props.addlInfo.value.otherWebsitesSoldOn}
              onChange={this.updateInfo.bind(this,"otherWebsitesSoldOn")}
              validationState={this.props.addlInfo.vState.otherWebsitesSoldOn}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Other websites you sell on
            </LabelledCheckboxGroup>


            <LabelledTextInput
              value={this.props.addlInfo.value.otherWebsitesSoldOnText}
              onChange={this.updateInfo.bind(this,"otherWebsitesSoldOnText")}
              validationState={this.props.addlInfo.vState.otherWebsitesSoldOnText}
              validate={fieldValidations.noValidation}
              helpText={null}>
              Others
            </LabelledTextInput>
            <br/>

            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.handleContinue}>Continue</Button>

          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      addlInfo: state.addlInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateAddlInfo, updateTabValidation, actionTabChange }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddInfo);
