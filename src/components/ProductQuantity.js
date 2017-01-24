import React, {Component} from 'react';
import LabelledTextInput from './LabelledTextInput';

class ProductQuantity extends Component{

  handleChange = (index, value) => {
    let newValue = [...this.props.value];
    newValue[index] = value;
    this.props.onChange(newValue);
  }

  dummy = () => {}

  render(){
    return(
      <label>
        <p>Product Quantity</p>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <LabelledTextInput
            value= {this.props.value[0]}
            onChange = {this.handleChange.bind(null, 0)}
            validationState = {true}
            validate = {this.dummy}
            style= {{ marginRight: 15}}
          >
            Minimum
          </LabelledTextInput>

          <LabelledTextInput
            value = {this.props.value[1]}
            onChange = {this.handleChange.bind(null, 1)}
            validationState = {true}
            validate = {this.dummy}
            style= {{ marginRight: 15}}
          >
            Maximum
          </LabelledTextInput>

          <LabelledTextInput
            value = {this.props.value[2]}
            onChange = {this.handleChange.bind(null, 2)}
            validationState = {true}
            validate = {this.dummy}
            style= {{ marginRight: 15}}
          >
            Steps of
          </LabelledTextInput>
        </div>
      </label>
    );
  }
}

export default ProductQuantity;

ProductQuantity.propTypes = {
  value: React.PropTypes.array,
  onChange: React.PropTypes.func
}
