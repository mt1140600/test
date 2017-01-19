import React, {Component} from 'react';
import LabelledTextInput from "./LabelledTextInput";

class VariablePrice extends Component{

  dummy = () => {}

  updateQuantity = (index, value) => {
    let newRange = [...this.props.value.range];
    newRange[index] = value;
    this.props.onChange(
      {
        range: newRange,
        price: this.props.value.price
      }
    );
  }

  updatePrice = (index, value) => {
    let newPrice = [...this.props.value.price];
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
          onChange = {this.updateQuantity.bind(null, index)}
          validationState = {true}
          validate = {this.dummy}
          style= {{flex: 1}}
        >
          Upto Quantity
        </LabelledTextInput>

        <LabelledTextInput
          value={this.props.value.price[index]}
          onChange= {this.updatePrice.bind(null, index)}
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
        <div style={{marginBottom: 10}}>
          <div style= {{display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center"}}>
            <div>Variable Price</div>
            <button className="pt-button pt-icon-add" onClick={this.addRow}> Add Row </button>
          </div>
          {this.props.value.range.map(this.renderRows)}
        </div>
    );
  }
}

VariablePrice.propTypes = {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func
}

export default VariablePrice;
