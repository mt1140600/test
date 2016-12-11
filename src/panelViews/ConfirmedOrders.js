import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../fieldValidations';
import ReactPaginate from 'react-paginate';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";
import PlainSelect from '../components/PlainSelect';



class OrdersConfirmedRow extends Component{
  constructor(){
    super();
  }

  onChange = () =>{
    return null;
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"1", justifyContent:"flex-start"}}>
          <div style={{marginBottom:"-10px"}}>
            <CheckboxWrapper>
            </CheckboxWrapper>
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
            <PlainSelect style={{marginRight:0}}
              options={["10","20","30","40","50"]}
              value={this.props.value.qty}
              onChange={this.onChange}/>
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
          <div className="pt-button-group" style={{paddingRight: "10px", alignSelf:"center"}}>
            <button type="button" className="pt-button pt-intent-primary">Dispatch</button>
            <button type="button" className="pt-button pt-intent-danger">Reject</button>
          </div>
        </div>

      </div>
    );
  }
}

OrdersConfirmedRow.propTypes = {
  value: React.PropTypes.object,
}



class ConfirmedOrders extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center"}, {label: "M Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center"}, {label: " ", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{productDetails:"Micromax Q114928102 erkgkerg", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
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
      <OrdersConfirmedRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
      <br/>
      <div style={{display:"flex", justifyContent:"space-between"}}>
          <div className="pt-control-group" style={{display:"flex"}}>
            <div style={{marginTop:10, marginRight: 10}}>
              <CheckboxWrapper>
                Select All
              </CheckboxWrapper>
            </div>
            <button className="pt-button pt-intent-primary">Dispatch</button>
            <button className="pt-button pt-intent-danger">Reject</button>
          </div>
          <div>
            <LabelledSelect
              options={productCategories}

              validationState={true}
              validate={fieldValidations.noValidation}
              helpText={"Choose a valid state"}>
              Category
            </LabelledSelect>
          </div>
          <div className="pt-input-group .modifier">
            <span className="pt-icon pt-icon-search"></span>
            <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
          </div>
        </div>
      <br/>
      <div className="tableHeader">
        {this.tableHeaders.map(this.renderTableHeaders)}
      </div>

      <div className="tableRowCategoryName">
        Back Covers
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

export default ConfirmedOrders;
