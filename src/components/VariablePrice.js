import React, {Component} from 'react';
import LabelledTextInput from "./LabelledTextInput";

class VariablePrice extends Component{

  dummy = () => {}

  updateQuantity = (index, value) => {
    newRange = [...this.props.value.range];
    newRange[index] = value;
    this.props.onChange(
      {
        range: newRange,
        price: this.props.value.price
      }
    );
  }

  updatePrice = (index, value) => {
    newPrice = [...this.props.value.range];
    newPrice[index] = value;
    this.props.onChange(
      {
        range: this.props.value.range,
        price: newPrice
      }
    );
  }

  renderRows = (item, index) => {
    return(
      <div key={index} style={{display: "flex"}}>
        <LabelledTextInput
          value= {item}
          onChange = {this.dummy}
          validationState = {true}
          validate = {this.dummy}
          style= {{flex: 1}}
        >
          Upto Quantity
        </LabelledTextInput>

        <LabelledTextInput
          value={this.props.value.price[index]}
          onChange= {this.dummy}
          validationState = {true}
          validate = {this.dummy}
          style= {{flex: 1, marginLeft: 20}}
        >
          Price
        </LabelledTextInput>
      </div>
    )
  }

  addRow = () => {
     this.props.onChange({ //new Value
      range: [ ...this.props.value.range, 9999 ],
      price: [ ...this.props.value.price, 0 ]
    });
  }

  render(){
    return(
        <div>
          {this.props.value.range.map(this.renderRows)}
          <button className="pt-button" onClick={this.addRow}> Add Row </button>
        </div>
    );
  }
}

VariablePrice.propTypes = {
    value: React.PropTypes.value,
    onChange: React.PropTypes.func
}

export default VariablePrice;
