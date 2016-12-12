import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';
import TableHeaders from '../components/TableHeaders'



class ReturnsReturnsRow extends Component{
  constructor(){
    super();
  }

  onChange = () => {
    return null;
  }


  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.returnDate}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.orderDate}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8"}}>
          <div>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.qty}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.type}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.reasonForReturn}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.currentStatus}
          </div>
        </div>

      </div>
    );
  }
}

ReturnsReturnsRow.propTypes = {
  value: React.PropTypes.object,
}



class ReturnsReturns extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label:"R Date", width: 2},{label:"O Date", width: 2}, {label:"Product Details", width: 8},  {label:"Quantity", width: 2}, {label:"Type", width: 2}, {label:"Reason for Return", width: 4}, {label:"Current Status", width: 4}];
    this.orders = [{returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax G2 Mud-brown Cover", qty: "5", type: "Refund", reasonForReturn: "Size not as expected", currentStatus:"Customer Pickup Initiated"}, {returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax G2 Mud-brown Cover", qty: "5", type: "Refund", reasonForReturn: "Size not as expected", currentStatus:"Customer Pickup Initiated"}, {returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax G2 Mud-brown Cover", qty: "5", type: "Refund", reasonForReturn: "Size not as expected", currentStatus:"Customer Pickup Initiated"}, {returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax G2 Mud-brown Cover", qty: "5", type: "Refund", reasonForReturn: "Size not as expected", currentStatus:"Customer Pickup Initiated"}, {returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax G2 Mud-brown Cover", qty: "5", type: "Refund", reasonForReturn: "Size not as expected", currentStatus:"Customer Pickup Initiated"}];
  }

  renderRows(item, index){
    return(
      <ReturnsReturnsRow value={item} key={index} />
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

export default ReturnsReturns;
