import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../fieldValidations';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';


class OrdersCancelledRow extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.date}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:6}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.quantity}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.reasonForCancellation}
          </div>
        </div>

      </div>
    );
  }
}

OrdersCancelledRow.propTypes = {
  value: React.PropTypes.object,
}







class CancelledOrders extends Component{

  constructor(){
    super();

    this.tableHeaders = [{label: "Date", width: 2}, {label: "Product Details", width: 8, justify: "flex-start"}, {label: "Quantity", width: 2}, {label: "M Price", width: 2, tooltip: "Marketplace Price"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin"}, {label: "S Price", width: 2, tooltip: "Selling Price"}, {label: "Reason for Cancellation", width: 4, tooltip: null, orderby: false}];
    this.orders=[{date:"23 Nov 2016", productDetails:"Micromax f2552 Full Metal Alchemist", quantity:"20", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36", reasonForCancellation:"Item not available" }];
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
      <OrdersCancelledRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <div className="pt-input-group .modifier">
            <span className="pt-icon pt-icon-search"></span>
            <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
          </div>
        </div>
        <br/>

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

export default CancelledOrders;
