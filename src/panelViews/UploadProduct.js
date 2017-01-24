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
import UploadProductThree from './UploadProductThree';

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


class UploadProduct extends Component{

  constructor(){
    super();
    this.state = {stepTwoStates: Immutable.List([]), tableRows: 2, csv: null, tableCells: [["Name", "Age", "Sex"], ["Anand", 22, "Male"], ["Stone Cold", 40, "Beast"]] };
    this.tableHeaders = ["Sub Category", "Brand", "Company", "Model", "MRP", "Selling Price", "MOQ", "Warranty", "Image"];
    this.sampleCSV = [["Headphones", "JBL", "Harman Intl", "D233", "3220", "3220", "10", "26 Nov 2017", ""]];
    this.denormalizedFields = [];
    this.stepTwoArray = [];
    this.stepThreeArray = [];
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
              <UploadProductThree />
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
