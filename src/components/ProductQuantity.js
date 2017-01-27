import React, {Component} from 'react';
import LabelledTextInput from './LabelledTextInput';
import {Tooltip, Position} from '@blueprintjs/core';

class ProductQuantity extends Component{

  constructor(){
    super();
    this.tooltipContent = <div>
      <p>Example: If Minimum: 10, Maximum: 40, Steps of: 10</p>
      <p>Then, customer can place an order for 10, 20, 30 or 40 pieces</p>
    </div>
  }

  handleChange = (index, value) => {
    let newValue = [...this.props.value];
    newValue[index] = value;
    this.props.onChange(newValue);
  }

  dummy = () => {}

  render(){
    return(
      <label>
        <Tooltip
          content= {this.tooltipContent}
          className= "pt-tooltip-indicator"
          position= {Position.TOP}
        >
          Product Quantity
        </Tooltip>
        <br/>
        <br/>
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
