import React, {Component} from 'react';
import VerticalTabLayout from './VerticalTabLayout';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';

class ProductUpload extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Header/>
        {ViewNameBar("Product Upload")}
        <VerticalTabLayout/>
      </div>
    );
  }
}

export default ProductUpload;
