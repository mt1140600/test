import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';

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

  renderTableHeaders = (item,index) => {
    //assigning default values
    let itemObj = Object.assign({label: "<Label>", width: 1, tooltip: null, orderby: true, justify:"center"}, item);

    if(itemObj.tooltip === null)
      return(
        <div style={{flex: itemObj.width, textAlign:"center", display: "flex", alignItems:"center", justifyContent: itemObj.justify}} key={index}>
          <div className="tableHeaderText">
            {itemObj.label}
          </div>
          <OrderBy
            value = {null}
            visible = {itemObj.orderby}
            handleChange = {()=>null}/>
        </div>
      );
    else
    return(
      <div style={{flex: itemObj.width,textAlign:"center", display: "flex", alignItems:"center", justifyContent:"center"}} key={index}>
          <Tooltip
            content={itemObj.tooltip}
            inline={false}
            position={Position.TOP}>
            <div className="cellLabel">
              {itemObj.label}
              <span className="pt-icon-standard pt-icon-help" style={{paddingLeft:"5px", color:"#cccccc"}}></span>
            </div>
          </Tooltip>
        <OrderBy
          value = {null}
          visible = {itemObj.orderby}
          handleChange = {()=>null}/>
      </div>
    );
  }

  renderRows = (item, index) => {
    return(
      <PaymentOverviewRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <div className="tableHeader">
          {this.tableHeaders.map(this.renderTableHeaders)}
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

export default PaymentOverview;
