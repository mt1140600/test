import React, {Component} from 'react';
let Immutable = require('immutable');
import MultipleImageUpload from '../components/MultipleImageUpload';
import LabelledAutoComplete from '../components/LabelledAutoComplete';

class TestContainer extends Component{
  constructor(){
    super();
    this.state={ images: Immutable.List([]), defaultImage: 0 };
  }

  handleChange = (newImages, defaultImage) =>{
    this.setState({images: newImages, defaultImage: defaultImage});
  }

  handleSelect = (value) => {
  this.setState({value: value})
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
      
      </div>

    );
  }
}

export default TestContainer;
