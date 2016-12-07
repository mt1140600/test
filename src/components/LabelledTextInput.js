import React, {Component} from 'react';
import {Tooltip} from "@blueprintjs/core";

class LabelledTextInput extends Component{

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {clicked: false};
  }

  handleClick(){
    this.setState({clicked:true});
  }

  handleChange(event){
    let vState = this.props.validate(event.target.value);
    this.props.onChange(event.target.value,vState);
  }

  render(){
    let errorField = !this.props.validationState && this.state.clicked;
    let warningClass = (errorField)?'errorField':'';
    return(
      <div onFocus={this.handleClick}>
        <label className="pt-label pt-inline container">
          {this.props.children}
          <input
            className={`pt-input ${warningClass}`}
            value={this.props.value}
            onChange = {this.handleChange}
            style={{width: "200px", float:"right"}}
            type="text"
            name={this.props.children}
            dir="auto" />
          {(errorField)?<div className="helpText" >{this.props.helpText}</div>:null}
        </label>
      </div>
    );
  }

}

LabelledTextInput.propTypes = {

  children: React.PropTypes.node,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  validationState: React.PropTypes.bool,
  validate: React.PropTypes.func,
  helpText: React.PropTypes.string,
  style: React.PropTypes.object

};

export default LabelledTextInput;
