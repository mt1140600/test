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
    console.log(this.props.value);
    return(
      <div>

        <LabelledTextInput
          value= {this.props.value[0]}
          onChange = {this.handleChange.bind(null, 0)}
          validationState = {true}
          validate = {this.dummy}
        >
          Minimum Order Quantity
        </LabelledTextInput>

        <LabelledTextInput
          value = {this.props.value[1]}
          onChange = {this.handleChange.bind(null, 1)}
          validationState = {true}
          validate = {this.dummy}
        >
          Maximum Order Quantity
        </LabelledTextInput>

        <LabelledTextInput
          value = {this.props.value[2]}
          onChange = {this.handleChange.bind(null, 2)}
          validationState = {true}
          validate = {this.dummy}
        >
          Steps of
        </LabelledTextInput>

      </div>
    );
  }
}

export default ProductQuantity;

ProductQuantity.propTypes = {
  value: React.PropTypes.array,
  onChange: React.PropTypes.func
}
