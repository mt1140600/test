import React, {Component} from 'react';

class LabelledCheckbox extends Component{
  render(){
    return(
      <label className="pt-control pt-checkbox" style={this.props.style}>
        <input type="checkbox"/>
        <span className="pt-control-indicator"></span>
        {this.props.children}
      </label>
    );
  }
}

export default LabelledCheckbox;
