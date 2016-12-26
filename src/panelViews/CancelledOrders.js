import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import TableHeaders from '../components/TableHeaders'


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

  constructor() {
    super();

    this.tableHeaders = [{label: "Date", width: 3}, {label: "Product Details", width: 8, justify: "flex-start"}, {label: "Quantity", width: 2}, {label: "M Price", width: 2, tooltip: "Marketplace Price"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin"}, {label: "S Price", width: 2, tooltip: "Selling Price"}, {label: "Reason for Cancellation", width: 4, tooltip: null, orderby: false}];
    this.orders=[{date:"23 Nov 2016", productDetails:"Micromax f2552 Full Metal Alchemist", quantity:"20", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36", reasonForCancellation:"Item not available" }];
  }

  renderRows = (item, index) => {
    return(
      <OrdersCancelledRow value={item} key={index} />
    );
  }

  render() {
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

export default CancelledOrders;
