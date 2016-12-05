import React, {Component} from 'react';

class LabelledCheckbox extends Component{
  render(){
    return(
      <label className="pt-control pt-checkbox" style={this.props.style}>
        <input type="checkbox"/>
        <span className="pt-control-indicator" />
        {this.props.children}
      </label>
    );
  }
}

LabelledCheckbox.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.node
};

export default LabelledCheckbox;
