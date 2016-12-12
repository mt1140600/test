import React, {Component} from 'react';
import PanelHeader from "../components/PanelHeader";
import DatePicker from "react-datepicker";
import moment from "moment";
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

require('react-datepicker/dist/react-datepicker.css');


class CompletedOrdersRow extends Component{
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

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.numberItems}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.totalAmount}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplaceMarginAvg}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplaceMarginRS}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.finalPayment}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <button type="button" className="pt-button pt-intent-primary">Details</button>
        </div>

      </div>
    );
  }
}

CompletedOrdersRow.propTypes = {
  value: React.PropTypes.object,
}





class Completed extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label:"Date", width:2}, {label:"Items", width:2, tooltip:"Number of Items"}, {label:"Total Amount", width:2} , {label:"M Margin Avg", width:2, tooltip:"Marketplace margin (avg%)"}, {label:"M Margin Rs", width:2, tooltip:"Marketplace margin (in RS)"}, {label:"Final Payment", width: 2}, {label:" ", width:2, orderby:false}];
    this.orders = [{date:"28 Nov 2016", numberItems:"15", totalAmount:"4000", marketplaceMarginAvg:"6.31%", marketplaceMarginRS: "258.71", finalPayment: "384129"}, {date:"28 Nov 2016", numberItems:"15", totalAmount:"4000", marketplaceMarginAvg:"6.31%", marketplaceMarginRS: "258.71", finalPayment: "384129"},{date:"28 Nov 2016", numberItems:"15", totalAmount:"4000", marketplaceMarginAvg:"6.31%", marketplaceMarginRS: "258.71", finalPayment: "384129"}, {date:"28 Nov 2016", numberItems:"15", totalAmount:"4000", marketplaceMarginAvg:"6.31%", marketplaceMarginRS: "258.71", finalPayment: "384129"}];
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
      <CompletedOrdersRow value={item} key={index} />
    );
  }

  // <div>
  //   {moment().format("DD-MM-YYYY")}
  // </div>



  render(){
    return(
      <div>

        <div className="tabs">

          <div style={{display:"flex", justifyContent:"space-between"}}>

            <div className="">
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
            </div>

            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
            </div>
          </div>
          <br/>
          <br/>

            <div className="tableHeader">
              {this.tableHeaders.map(this.renderTableHeaders)}
            </div>

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
      </div>
    );
  }

}

export default Completed;
