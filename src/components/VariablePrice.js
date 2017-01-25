import React, {Component} from 'react';
import LabelledTextInput from "./LabelledTextInput";
import {Tooltip, Position} from '@blueprintjs/core';

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
          disabled= {(item === "max")? true: false}
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
      range: [ 0, ...this.props.value.range ],
      price: [ 0, ...this.props.value.price ]
    });
  }

  getContentRow = (item, index) => {
    if(item === "max") return <div>{`more than ${this.props.value.price[index-1]} pieces costs ₹ ${this.props.value.price[index]}`}</div>

    if(index === 0)  return <div>{`1 to ${item} pieces costs ₹ ${this.props.value.price[index]}`}</div>
    else return <div>{`${this.props.value.price[index-1]} to ${item} pieces costs ₹ ${this.props.value.price[index]}`}</div>
  }

  getContent = () => {
    if(this.props.value.range.length === 1)
      return `Item costs ₹${this.props.value.price[0]}`;

    else
      return(
        <div>
          <div>Ordering</div>
          {this.props.value.range.map(this.getContentRow)}
        </div>
      )
  }

  render(){
    return(
        <div style={{marginBottom: 10}}>
          <div style= {{display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center"}}>
            <Tooltip
              content= {this.getContent()}
              className= "pt-tooltip-indicator"
              position= {Position.TOP}
              >
              Variable Price
            </Tooltip>
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
