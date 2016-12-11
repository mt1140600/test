import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class ReturnsReplacmentsRow extends Component{
  constructor(){
    super();
  }

  onChange(){
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
          <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <div>{this.props.value.currentStatus}</div>
            <br/>
            <div className="pt-button-group" style={{paddingRight: "10px", alignSelf:"center"}}>
              <button type="button" className="pt-button pt-intent-success">Replace</button>
              <button type="button" className="pt-button pt-intent-danger">Refund</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ReturnsReplacmentsRow.propTypes = {
  value: React.PropTypes.object,
}





class ReturnsReplacments extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label:"R Date", width: 2},{label:"O Date", width: 2}, {label:"Product Details", width: 8},  {label:"Quantity", width: 2}, {label:"Type", width: 2}, {label:"Reason for Return", width: 4}, {label:"Current Status", width: 4}];
    this.orders = [{returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"HTC One M7 Rigidex Cover", qty: "5", type: "Replacement", reasonForReturn: "Size not as expected", currentStatus:"Customer pickup initiated"}, {returnDate:"28/11/2016", orderDate:"21/11/2016", productDetails:"XiaoMi R40 Genex Black Cover", qty: "5", type: "Replacement", reasonForReturn: "Product is defective", currentStatus:"Customer pickup initiated"}];
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

  renderRows(item, index){
    return(
      <ReturnsReplacmentsRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
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
    );
  }

}

export default ReturnsReplacments;
