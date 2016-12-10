import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../fieldValidations';
import OrdersCancelledRow from './OrdersCancelledRow';
import ReactPaginate from 'react-paginate';

class CancelledOrders extends Component{

  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["#","Product Details", "Qty", "Marketplace Price", "Marketplace Margin", "Selling Price", "Reason for Cancellation"];
    this.orders=[{productDetails:"Micromax Q114928102 erkgkerg", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36", reasonForCancellation:"Item not available" }];
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
      <OrdersCancelledRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>

      <div style={{display:"flex"}}>
          <div className="pt-control-group" style={{flex:1, display:"flex"}}>
            <div style={{marginTop:10, marginRight: 10}}>
              <CheckboxWrapper>
                Select All
              </CheckboxWrapper>
            </div>
            <button className="pt-button">Confirm Items</button>
            <button className="pt-button">Reject Items</button>
          </div>
          <div className="pt-input-group .modifier">
            <span className="pt-icon pt-icon-search"></span>
            <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
          </div>
        </div>
      <br/>
      <div style={{display:"flex"}}>
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

export default CancelledOrders;
