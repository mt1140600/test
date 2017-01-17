import React, {Component} from 'react';
let Immutable = require('immutable');
import MultipleImageUpload from '../components/MultipleImageUpload';
import LabelledAutoComplete from '../components/LabelledAutoComplete';
import ProductQuantity from '../components/ProductQuantity';
import VariablePrice from '../components/VariablePrice';

class TestContainer extends Component{
  constructor(){
    super();
    this.state={ images: Immutable.List([]), defaultImage: 0, qty: [0, 0, 0], varPrice: {range: [9999], price: [0]} };
  }

  handleChange = (newImages, defaultImage) =>{
    this.setState({images: newImages, defaultImage: defaultImage});
  }

  handleSelect = (value) => {
  this.setState({value: value})
  }

  handleQuantity = (value) => {
    this.setState({qty: value});
  }

  handleVarPrice = (value) => {
    this.setState({varPrice: value});
  }

  render(){
    return(
      <div>

      <MultipleImageUpload
        value={this.state.images}
        defaultImage={this.state.defaultImage}
        onChange={this.handleChange}>
        Product Images
      </MultipleImageUpload>

      <LabelledAutoComplete
        options={this.state.options}
        value={this.state.value}
        onSelect={this.handleSelect}>
        Brand
      </LabelledAutoComplete>

      <ProductQuantity
        value= {this.state.qty}
        onChange= {this.handleQuantity}
      >
      </ProductQuantity>

      <VariablePrice
        value = {this.state.varPrice}
        onChange = {this.handleVarPrice}
      >
      </VariablePrice>
      </div>

    );
  }
}

export default TestContainer;
