import React, {Component} from 'react';
import {Checkbox} from "@blueprintjs/core";

class CheckboxWrapper extends Component{

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onChange(this.props.index);
  }

  render() {
    return(
      <div style={this.props.style}>
        <Checkbox  checked={this.props.value} onChange={this.handleChange}>
            {this.props.children}
        </Checkbox>
      </div>
    );
  }
}

CheckboxWrapper.propTypes = {
  children: React.PropTypes.string,
  index: React.PropTypes.number,
  value: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
}

export default CheckboxWrapper;
