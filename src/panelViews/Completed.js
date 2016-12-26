import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';
import TableHeaders from '../components/TableHeaders'

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
      </div>
    );
  }

}

export default Completed;
