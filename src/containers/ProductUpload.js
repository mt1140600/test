import React, {Component} from 'react';
import VerticalTabLayout from './VerticalTabLayout';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';

class ProductUpload extends Component{
  constructor() {
    super();
  }
  render() {
    return(
      <div className="app">
        <Header/>
        <HeaderButtons/>
        <VerticalTabLayout/>
      </div>
    );
  }
}

export default ProductUpload;
