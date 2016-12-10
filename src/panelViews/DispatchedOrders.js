import React, {Component} from 'react';
import OrdersDispatchedRow from './OrdersDispatchedRow';
import ReactPaginate from 'react-paginate';

class DispatchedOrders extends Component{

  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["Date","Dispatch ID", "Items", "Qty", "Dispatch Partner", "Status"];
    this.orders = [{date:"28 Nov 2016", dispatchID:"#123456789", items:["Micromax nerlnvelr", "Curved kfejrbkjerv", "Riviero vekvekrjn"], qty:["40", "30", "10"], dispatchPartner: "Fedex", status: "Pickup scheduled at 1:30pm"}];
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
      <OrdersDispatchedRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <div className="row" style={{display:"flex"}}>
            <div className="pt-control-group" style={{flex:1}}>
            </div>
            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
            </div>
          </div>
          <br/>
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

export default DispatchedOrders;
