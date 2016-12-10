import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../fieldValidations';
import PaymentDetailedStatementRow from './PaymentDetailedStatementRow';
import ReactPaginate from 'react-paginate';

class PaymentDetailedStatement extends Component{

  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["Date", "Description", "Payments", "Deduction/ Refunds", "Payments Initiated"];
    this.orders=[{date:"18 Nov 2016", description:"Billing for products dispatched on 18th", payments:"4100", deductions:"", paymentsInitialted:"4100"}];
  }

  renderCellLabels(item,index){
    return(
      <div style={{flex:1,textAlign:"center"}} key={index}>
        <div className="cellLabel">
          {item}
        </div>
      </div>
    );
  }

  renderRows(item, index){
    return(
      <PaymentDetailedStatementRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
          <div className="row" style={{display:"flex"}}>
            {this.cellLabels.map(this.renderCellLabels)}
          </div>
          {this.orders.map(this.renderRows)}
          <div id="react-paginate" className="tableRow">
            <ReactPaginate previousLabel={"previous"}
             nextLabel={"next"}
             breakLabel={<a href="">...</a>}
             breakClassName={"break-me"}
             pageCount={10}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={()=>null}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"} />
          </div>
      </div>
    );
  }

}

export default PaymentDetailedStatement;
