import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';
import TableHeaders from '../components/TableHeaders'


class PaymentDetailedStatementRow extends Component{

  constructor(){
    super();
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.date}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.description}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.payments}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.deductions}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.paymentsInitialted}
          </div>
        </div>

      </div>
    );
  }
}

PaymentDetailedStatementRow.propTypes = {
  value: React.PropTypes.object,
}


class PaymentDetailedStatement extends Component{

  constructor() {
    super();
    this.tableHeaders = [{label: "Date"}, {label: "Description", width: 4}, {label: "Payments"}, {label: "Refunds", tooltip:"Deduction/ Refunds"}, {label:"Initiated", tooltip:"Payments Initiated"}];
    this.orders=[{date:"18 Nov 2016", description:"Billing for products dispatched on 18th", payments:"4100", deductions:"", paymentsInitialted:"4100"}];
  }


  renderRows(item, index){
    return(
      <PaymentDetailedStatementRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <br/>
          <TableHeaders tableHeaders={this.tableHeaders} />

          {this.orders.map(this.renderRows)}

          <div id="react-paginate">
            <ReactPaginate previousLabel={"<"}
             nextLabel={">"}
             breakLabel={<a href="">...</a>}
             breakClassName={"break-me"}
             pageCount={10}
             marginPagesDisplayed={2}
             pageRangeDisplayed={2}
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
