import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import DateRangePopover from '../components/DateRangePopover';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import TableHeaders from '../components/TableHeaders'
import * as actions from '../actions/orderManagement';
import ChangeQuantity from '../components/ChangeQuantity';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
var moment = require('moment');

class OrdersNewRow extends Component{
  constructor(){
    super();
    this.state = { quantity: 0 };
  }

  onChange = (value) => {
    this.setState({ quantity: value });
    //TODO: make post call
  }

  componentDidMount(){
    this.setState({ quantity: this.props.value.qty });
  }

  componentWillReceiveProps(nextProps){
    this.setState({ quantity: nextProps.value.qty });
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
          <div style={{flex:1, marginRight: 10}}>
            <img style={{width:"40px", height:"40px", borderRadius:"4px"}} src={this.props.value.productDetails.image} />
          </div>
          <div  style={{flex:6}}>
            {this.props.value.productDetails.name}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <ChangeQuantity
            quantity = {this.props.value.qty}
          />
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
            <button type="button" className="pt-button pt-intent-primary">Confirm</button>
            <button type="button" className="pt-button pt-intent-danger">Reject</button>
          </div>
        </div>

      </div>
    );
  }
}

OrdersNewRow.propTypes = {
  value: React.PropTypes.object,
}



class NewOrders extends Component{

  constructor(){
    super();
    this.state= { dateRange: [null, null], category: "All Categories", searchText: ""};
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start", filter_name:""}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start", filter_name:"name"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center", filter_name:"quantity_requested"}, {label: "M Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center", filter_name:"marketplace_price"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center", filter_name:"marketplace_margin"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center", filter_name:"seller_price"}, {label: " ", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders = [];
  }

  renderRows = (item, index) => {
    return(
      <OrdersNewRow value={item} key={index} />
    );
  }

  handleDateSelected = (dateRange) => {
    this.setState({dateRange});
    this.props.setSearchSpecs({
      from: moment.utc(dateRange[0]).format(),
      to: moment.utc(dateRange[1]).format()
    });
    // console.log(dateRange[0]);
  }

  handleCategory = (value) => {
    this.setState({category: value});
    this.props.setSearchSpecs({
      category: value
    });
  }

  handleSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  }

  handleSearch = (event) =>{
    if(event.keyCode == 13){
      this.props.setSearchSpecs({
            search_text: event.target.value
          });
    }
  }

  setRowData = (item, index) => {
    // this.orders=[{productDetails:"Micromax Q -Pad Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
    return ({
      productDetails: { name: item.SellerFulfillments[0].BuyerFulfillment.OrderProduct.Product.name, image: item.SellerFulfillments[0].BuyerFulfillment.OrderProduct.Product.image },
      qty: item.quantity_requested,
      marketplacePrice: null,
      marketplaceMargin: null,
      sellingPrice: item.seller_price
    });
  }

  componentDidMount(){
    // this.props.fetchOrders(1, "new", "quantity_accepted ASC", "2016-01-08T10:25:33.175Z", "2017-01-08T10:25:33.175Z");
    // this.props.fetchOrders(userData.user, "new", null, null, null);
    this.props.fetchOrders(1, "new", null, null, null, "", "");
  }

  componentWillReceiveProps(nextProps){
    console.log("newOrders componentWillReceiveProps");
    console.log("ordersData:", nextProps.ordersData);
    if( JSON.stringify(this.props.ordersData.searchSpecs) !== JSON.stringify(nextProps.ordersData.searchSpecs) ){
      console.log("fetching new data");
      this.props.fetchOrders(1, "new", nextProps.ordersData.searchSpecs.orderBy, nextProps.ordersData.searchSpecs.from, nextProps.ordersData.searchSpecs.to, nextProps.ordersData.searchSpecs.category, nextProps.ordersData.searchSpecs.search_text);
    }
    else{
      console.log("rendering new rows");
      this.orders = nextProps.ordersData.orders.map(this.setRowData);
      // console.log("temp is ", temp);
    }
  }

  render(){
    return(
      <div>
        <DateRangePopover
          dateRange = {this.state.dateRange}
          onSelect = {this.handleDateSelected}/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="pt-control-group" style={{display:"flex"}}>
              <div style={{marginTop:10, marginRight: 10}}>
                <CheckboxWrapper>
                  Select All
                </CheckboxWrapper>
              </div>
              <button className="pt-button pt-intent-primary">Confirm</button>
              {/* <button className="pt-button pt-intent-danger">Reject</button> */}
            </div>
            <div>
              <LabelledSelect
                options={productCategories}
                onChange={this.handleCategory}
                value = {this.state.category}
                validationState={true}
                validate={fieldValidations.noValidation}
                helpText={""}>
                Category
              </LabelledSelect>
            </div>
            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" value={this.state.searchText} onChange={this.handleSearchText} onKeyUp={this.handleSearch}/>
            </div>
          </div>
          <br/>

      <TableHeaders tableHeaders={this.tableHeaders} />

      {
        // <div className="tableRowCategoryName">
        //   {"Category"}
        // </div>
      }

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

const mapStatetoProps = (state) => {
  return {
    // ordersData: state.ordersData.searchSpecs,  //Could sign up to just one key of one state, too!
    ordersData: state.ordersData,
    userData: state.userData,
  }
}

const mapDisptachToProps = (dispatch) => {
  return bindActionCreators({ fetchOrders: actions.fetchOrders, setSearchSpecs: actions.setSearchSpecs }, dispatch);
}

export default connect(mapStatetoProps, mapDisptachToProps)(NewOrders);
