import React, {Component} from 'react';
import CheckboxWrapper from '../components/CheckboxWrapper';
import PlainSelect from '../components/PlainSelect';
import LabelledSelect from '../components/LabelledSelect';
import DateRangePopover from '../components/DateRangePopover';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import TableHeaders from '../components/TableHeaders'
import * as actions from '../actions/orderManagement';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';


class OrdersNewRow extends Component{
  constructor(){
    super();
  }

  onChange = () => {
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
    this.state= { dateRange: [null, null]};
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center"}, {label: "M Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center"}, {label: "M Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center"}, {label: " ", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{productDetails:"Micromax Q-Pad Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" },{productDetails:"Mig 390 Silicone Durable Cover", qty:"10", marketplacePrice:"200", marketplaceMargin:"10.55%", sellingPrice:"178" },{productDetails:"Micromax Q8100 Mobile Phone Cover (Red, Green, Blue)", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
  }

  renderRows = (item, index) => {
    return(
      <OrdersNewRow value={item} key={index} />
    );
  }

  handleDateSelected = (dateRange) => {
    this.setState({dateRange});
  }

  componentDidMount(){
    this.props.fetchOrders(1, "new", "quantity_accepted ASC", "2016-01-08T10:25:33.175Z", "2017-01-08T10:25:33.175Z");
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

      <TableHeaders tableHeaders={this.tableHeaders} />

      <div className="tableRowCategoryName">
        Back Covers
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

const mapStatetoProps = (state) => {
  return {
    orders: state.orders,
    // searchSpecs: state.searchSpecs
  }
}

const mapDisptachToProps = (dispatch) => {
  return bindActionCreators({ fetchOrders: actions.fetchOrders }, dispatch);
}

export default connect(mapStatetoProps, mapDisptachToProps)(NewOrders);
