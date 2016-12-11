import React, {Component} from 'react';
import VerticalTabLayout from './VerticalTabLayout';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';

class ProductUpload extends Component{
  constructor() {
    super();
  }
  render() {
    return(
      <div className="app">
        <Header/>
        <VerticalTabLayout/>
      </div>
    );
  }
}

export default ProductUpload;
