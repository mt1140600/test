import React, {Component} from 'react';

class LabelledTextInput extends Component{

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(){
    if(this.props.validationState === null)
      this.props.onChange(this.props.value,false);
  }

  handleChange(event){
    let vState = this.props.validate(event.target.value);
    this.props.onChange(event.target.value,vState);
  }

  render(){
    let warningClass = (this.props.validationState === false)?'errorField':'';
    return(
        <label className="pt-label pt-inline" style={Object.assign({}, {display: "flex", flexWrap: "wrap"}, this.props.style)} onFocus={this.handleClick}>
          <div style={{display: "inline-block", width: "50%"}}>
              {this.props.children}
          </div>
          <input
            className={`pt-input ${warningClass}`}
            value={this.props.value}
            onChange = {this.handleChange}
            style={{width: "50%", float:"right", margin: 0}}
            type="text"
            name={this.props.children}
            dir="auto" />
          {(this.props.validationState === false)?<div className="helpText">{this.props.helpText}</div>:null}
        </label>
    );
  }

}

const dummy = () => {};

LabelledTextInput.propTypes = {
  children: React.PropTypes.node,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  onChange: React.PropTypes.func,
  validationState: React.PropTypes.bool,
  validate: React.PropTypes.func,
  helpText: React.PropTypes.string,
  style: React.PropTypes.object
};

LabelledTextInput.defaultProps = {
  validationState: true,
  validate: dummy
}

export default LabelledTextInput;
