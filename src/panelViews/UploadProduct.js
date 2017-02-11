import React, {Component} from 'react';
import CascadedDisplay from '../components/CascadedDisplay';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productUploadActions from '../actions/productUpload';
import Immutable from 'immutable';
import cascadedDisplay from '../actions/cascadedDisplay';
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

  render() {
    return(
      <div className="tabs">
          <CascadedDisplay
            style= {{ height: "calc(100vh - 150px)" }}
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
