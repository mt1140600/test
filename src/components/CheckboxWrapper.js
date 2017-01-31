import React, {Component} from 'react';
import {Checkbox} from "@blueprintjs/core";
import {Tooltip, Position} from '@blueprintjs/core';

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
      //Removing margin bottom from checkbox and putting it on the wrapper div because otherwise, the tooltip indicator line will be placed below the marginBottom
      <div style={Object.assign({marginBottom: 10}, this.props.style)}>
        {
          (this.props.popover)?
            <Tooltip className= "pt-tooltip-indicator" content={this.props.popover} inline={false} position={Position.RIGHT}>
              <Checkbox style={{marginBottom: 0}} className={this.props.className} checked={this.props.value} onChange={this.handleChange} indeterminate={this.props.indeterminate}>
                  {this.props.children}
              </Checkbox>
            </Tooltip>
          :
            <Checkbox style={{marginBottom: 0}} className={this.props.className} checked={this.props.value} onChange={this.handleChange} indeterminate={this.props.indeterminate}>
                {this.props.children}
            </Checkbox>
        }
      </div>
    );
  }
}

CheckboxWrapper.propTypes = {
  children: React.PropTypes.string,
  index: React.PropTypes.number,
  value: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  indeterminate: React.PropTypes.bool,
  popover: React.PropTypes.node
}

export default CheckboxWrapper;
