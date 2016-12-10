import React, {Component} from 'react';
import CompletedOrdersRow from './CompletedOrdersRow';
import PanelHeader from "../components/PanelHeader";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactPaginate from 'react-paginate';

require('react-datepicker/dist/react-datepicker.css');

class Completed extends Component{

  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["Date","Number of Items", "Total Amount", "Marketplace margin (avg%)", "Marketplace margin (in RS)", "Final Payment", ""];
    this.orders = [{date:"28 Nov 2016", numberItems:"15", totalAmount:"4000", marketplaceMarginAvg:"6.31%", marketplaceMarginRS: "258.71", finalPayment: "384129"}];
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
      <CompletedOrdersRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <div className="panelHeader">
          <div>
            <div style={{marginRight:"10px", display:"inline"}}>
              Select Date Range:
            </div>
            <DatePicker className="pt-input"
              selected={null}
              selectsStart  startDate={null}
              endDate={null}
              onChange={()=>null}
              placeholderText="from"/>
            <DatePicker className="pt-input"
            selected={null}
            selectsEnd  startDate={null}
            endDate={null}
            onChange={()=>null}
            placeholderText="to"/>
            <button className="pt-button" style={{marginLeft:"10px"}}>
              Generate
            </button>
          </div>
          <div>
            {moment().format("DD-MM-YYYY")}
          </div>
        </div>
        <div className="tabs">
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
      </div>
    );
  }

}

export default Completed;
