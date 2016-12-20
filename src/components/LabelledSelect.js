import React, {Component} from 'react';

class LabelledSelect extends Component{

  constructor(){
    super();
    this.renderOption = this.renderOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {clicked: false};
  }

  renderOption(item, index){
    return(
      <option key={index} value={item}>{item}</option>
    );
  }

  handleClick(){
    this.setState({clicked: true});
  }

  handleChange(event){
    let vState = this.props.validate(event.target.value);
    this.props.onChange(event.target.value,vState);
  }

  render(){
    let errorField = !this.props.validationState && this.state.clicked;
    return(
      <label className="pt-label pt-inline" onFocus={this.handleClick}>
        {this.props.children}
        <div className="pt-select" style={{width:"200px", marginRight:"auto"}}>
          <select
            value={this.props.value}
            onChange={this.handleChange}>
            {this.props.options.map(this.renderOption)}
          </select>
        </div>
        {(errorField)?<div className="helpText" >{this.props.helpText}</div>:null}
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
