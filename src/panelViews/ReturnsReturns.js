import React, {Component} from 'react';
import ReturnsReturnsRow from './ReturnsReturnsRow';
import ReactPaginate from 'react-paginate';

class ReturnsReturns extends Component{

  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["Return Date","Order Date", "Product Details", "Qty", "Type", "Reason for return", "Current Status"];
    this.orders = [{returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"Micromax Q24112 fnrelnf egrn", qty: "5", type: "Refund", reasonForReturn: "Other: Size not as expected", currentStatus:"Pickup Initiated for customer"}];
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
      <ReturnsReturnsRow value={item} key={index} />
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

export default ReturnsReturns;
