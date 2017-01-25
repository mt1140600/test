import React, {Component} from 'react';
import ProductCard from '../components/ProductCard';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productUpload from '../actions/productUpload';

class UploadProductViaSearch extends Component{

  constructor(){
    super();
    this.state= { searchText: "" };
  }

  handleSearch = (event) => {
    console.log("keycode is" + event.keyCode);
    if(event.keyCode == 13){
      this.props.searchProduct(event.target.value);
    }
  }

  handleSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  }

  renderProducts = (item, index) => {
    let desc = item.details.map((item2, index2) => item2.value );
    return(
      <div className="sellProductWrapper" style={{padding: 10, display: "flex", justifyContent: "center"}}>
        <ProductCard
          key={index}
          name = {item.name}
          image = {item.images[0].url}
          desc = {desc}
        />
        <button
          className=" sellProductButton pt-button pt-intent-success"
          style={{marginLeft: 10}}
        >
          Sell
        </button>
      </div>
    )
  }

  render(){
    console.log(this.props.productSearch);
    return(
      <div>
        <h2>Upload Product via search</h2>

        <div className="pt-input-group .modifier">
          <span className="pt-icon pt-icon-search"></span>
          <input className="pt-input" type="search" value={this.state.searchText} dir="auto" onKeyUp={this.handleSearch} onChange={this.handleSearchText}/>
        </div>
        <br/>
        {
          ( typeof(this.props.productSearch.products) !== "undefined" )? this.props.productSearch.products.map(this.renderProducts): null
        }
        <br/>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    productSearch: state.productUploadData.get("productSearch")
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(productUpload, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductViaSearch);
