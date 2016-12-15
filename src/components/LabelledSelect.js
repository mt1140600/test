import React, {Component} from 'react';

class LabelledSelect extends Component{

  constructor(){
    super();
    this.renderOption = this.renderOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderOption(item, index){
    return(
      <option key={index} value={item}>{item}</option>
    );
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
    return(
      <label className="pt-label pt-inline" onFocus={this.handleClick}>
        {this.props.children}
        <div className="pt-select" style={{width:"200px", marginRight:"auto", float:"right"}}>
          <select
            value={this.props.value}
            onChange={this.handleChange}>
            {this.props.options.map(this.renderOption)}
          </select>
        </div>
        {(this.props.validationState === false)?<div className="helpText" >{this.props.helpText}</div>:null}
      </label>
    );
  }
}

LabelledSelect.propTypes = {
  children: React.PropTypes.string,
  options: React.PropTypes.array,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  validationState: React.PropTypes.bool,
  validate: React.PropTypes.func,
  helpText: React.PropTypes.string,
};

export default LabelledSelect;
