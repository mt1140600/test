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
import ConfirmItem from '../components/ConfirmItem';
import RejectItem from '../components/RejectItem';
import {FETCH_ORDERS_LIMIT} from '../constant';

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

  toggleSelected = () => {
    console.log("toggling "+this.props.value.id);
    this.props.toggleOrderSelected(this.props.value.index, !this.props.value.selected);
      // this.setState(
      //   (prevState) => { return { selected : !prevState.selected} }
      // );
  }

  render(){
    let styleObj = { display: "flex" };
    (this.props.value.selected)? Object.assign(styleObj, { backgroundColor: "#f2f2f2"}) : null;

    return(
      <div className="tableRow" style={styleObj}>

        <div className="tableRowCell" style={{flex:"1", justifyContent:"flex-start"}}>
          <div style={{marginBottom:"-10px"}}>
            <CheckboxWrapper
              onChange = {this.toggleSelected}
              value = {this.props.value.selected}
            />
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1, marginRight: 10}}>
            <img style={{width:"40px", height:"40px", borderRadius:"4px"}} src={this.props.value.productDetails.image} />
          </div>
          <div  style={{flex:6, width: 0, wordWrap: "break-word"}}>
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
          <div className="pt-button-group" style={{ borderRadius: 5, alignSelf:"center", backgroundColor: "grey"}}>
            <ConfirmItem/>
            <RejectItem/>
          </div>
        </div>

      </div>
    );
  }
}

OrdersNewRow.propTypes = {
  value: React.PropTypes.object,
}

const mapDisptachToProps2 = (dispatch) => {
  return bindActionCreators({ toggleOrderSelected: actions.toggleOrderSelected }, dispatch);
}

OrdersNewRow = connect(null, mapDisptachToProps2)(OrdersNewRow);


class NewOrders extends Component{

  constructor(){
    super();
    this.state= { dateRange: [null, null], category: "All Categories", searchText: "", selectAll: false };
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start", filter_name:""}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start", filter_name:"name"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center", filter_name:"quantity_requested"}, {label: "M Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center", filter_name:"marketplace_price"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center", filter_name:"marketplace_margin"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center", filter_name:"seller_price"}, {label: " ", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders = [];
    this.selectedRows = 0;
    this.countRows = 0;
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
      to: moment.utc(dateRange[1]).format(),
      page: 1
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

    if(event.target.value.length === 0){  //Backspaced, the content is alutomatically fetched (without enter)
      this.props.setSearchSpecs({
            search_text: event.target.value
          });
    }
  }


  handleSearch = (event) =>{
    if(event.keyCode == 13){
      this.props.setSearchSpecs({
            search_text: event.target.value,
            page: 1
          });
    }
  }

  setRowData = (item, index) => {
    // this.orders=[{productDetails:"Micromax Q -Pad Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
    this.countRows++;
    if(item.selected === true) this.selectedRows++;
    return ({
      id: item.id,
      productDetails: { name: item.Product.name, image: item.Product.image },
      qty: item.quantity_requested,
      marketplacePrice: null,
      marketplaceMargin: null,
      sellingPrice: item.seller_price,
      selected: item.selected,
      index: index
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
      this.props.fetchOrders(1, "new", nextProps.ordersData.searchSpecs.orderBy, nextProps.ordersData.searchSpecs.from, nextProps.ordersData.searchSpecs.to, nextProps.ordersData.searchSpecs.category, nextProps.ordersData.searchSpecs.search_text, nextProps.ordersData.searchSpecs.page);
    }
    else{
      console.log("rendering new rows");
      console.log(nextProps.ordersData.orders);
      this.countRows = 0; this.selectedRows = 0; this.setState({ indeterminate: false, selectAll: false });
      this.orders = nextProps.ordersData.orders.rows.map(this.setRowData);
      if(this.selectedRows > 0 && this.countRows > this.selectedRows) this.setState({ indeterminate: true });
      if(this.countRows === this.selectedRows) this.setState({ selectAll: true });
      // console.log("temp is ", temp);
    }
  }

  handlePageClick = (data) =>{ // data.selected starts from index 0
      console.log("Page selected", data.selected + 1);
      this.props.setSearchSpecs({
          page: data.selected + 1
      });
  }

  toggleSelectAll = () => {
    this.setState( (prevState) => {
      if(prevState.selectAll === false){
        this.props.ordersData.orders.rows.map((item, index) => { console.log("index is "+ index); this.props.toggleOrderSelected(index, true); });
      }
      else{
        this.props.ordersData.orders.rows.map((item, index) => { this.props.toggleOrderSelected(index, false); });
      }

      return {selectAll: !prevState.selectAll};
    } );
  }

  render(){
    return(
      <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#f6f8f8", border: "1px solid #DEE5E7"}}>
          <DateRangePopover
            dateRange = {this.state.dateRange}
            onSelect = {this.handleDateSelected} />

          <LabelledSelect
            options={productCategories}
            onChange={this.handleCategory}
            value = {this.state.category}
            validationState={true}
            validate={fieldValidations.noValidation}
            helpText={""}
            style={{marginBottom: 0}}/>

            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search" dir="auto" value={this.state.searchText} onChange={this.handleSearchText} onKeyUp={this.handleSearch}/>
            </div>
        </div>
        <br/>

        <div style={{display:"flex", alignItems: "center", paddingBottom: 5}}>

            <CheckboxWrapper
              value={this.state.selectAll}
              onChange={this.toggleSelectAll}
              indeterminate={this.state.indeterminate}
              style={{marginBottom: 0}}
            />

          <button className="pt-button pt-intent-primary">Confirm</button>
        </div>

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
         breakLabel={"..."}
         breakClassName={"break-me"}
         pageCount={Math.ceil(Number(this.props.ordersData.orders.count)/FETCH_ORDERS_LIMIT)}
         marginPagesDisplayed={2}
         pageRangeDisplayed={2}
         initialPage={0}
         onPageChange={this.handlePageClick}
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
  return bindActionCreators({ fetchOrders: actions.fetchOrders, setSearchSpecs: actions.setSearchSpecs, toggleOrderSelected: actions.toggleOrderSelected }, dispatch);
}

export default connect(mapStatetoProps, mapDisptachToProps)(NewOrders);
