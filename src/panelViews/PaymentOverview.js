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


class PaymentOverviewRow extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.paymentType}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <div>
            {this.props.value.amount}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"1"}}>
          <button type="button" className="pt-button pt-intent-primary">Details</button>
        </div>

      </div>
    );
  }
}

PaymentOverviewRow.propTypes = {
  value: React.PropTypes.object,
}



class PaymentOverview extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label:"Payment Type"}, {label:"Amount"}, {label:" ", orderby: false}];
    this.orders=[{paymentType:"Total Outstanding Payments", amount:"45000.77"}];
  }

  renderRows = (item, index) => {
    return(
      <PaymentOverviewRow value={item} key={index} />
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

export default PaymentOverview;
