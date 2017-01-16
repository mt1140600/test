import React, {Component} from 'react';

class LabelledSelect extends Component{

  constructor(){
    super();
    this.renderOption = this.renderOption.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  mapObject = (options) => {
    let {displayKey, responseKey} = this.props;
    return Object.keys(options).sort().map((key, index) => {
        return this.renderOption(options[key][displayKey], index, options[key][responseKey]);
    });
  }



  renderOption(item, index, response = null) {
    return (
      <option key={index} value={(!response) ? item : response}>{item}</option>
    );
  }

  handleClick() {
    if (this.props.validationState === null) {

      this.props.onChange(this.props.value,false);
    }
  }

  handleChange(event) {
    let vState = this.props.validate(event.target.value);
    this.props.onChange(event.target.value,vState);
  }

  render() {
    let option_type = 'array';
    let options = this.props.options || [];

    if (this.props.options !== null && typeof this.props.options === 'object' && this.props.options.constructor !== Array) {
      option_type = 'object';
    }
    return(

      <label className="pt-label pt-inline" onFocus={this.handleClick}>
        <div style={{display: "inline-block", width: "50%"}}>  
          {this.props.children}
        </div>
        <div className="pt-select" style={Object.assign({width:"50%", margin: 0, float:"right"},this.props.style)}>
          <select value={this.props.value} onChange={this.handleChange}>
            {(option_type === 'array') ? options.map(this.renderOption) : this.mapObject(options)}
          </select>
        </div>
        {(this.props.validationState === false) ? <div className="helpText" >{this.props.helpText}</div> : null}
      </label>
    );
  }
}

LabelledSelect.propTypes = {
  children: React.PropTypes.string,
  options: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onChange: React.PropTypes.func,
  validationState: React.PropTypes.bool,
  validate: React.PropTypes.func,
  helpText: React.PropTypes.string,
  style: React.PropTypes.object,
  displayKey:React.PropTypes.string,
  responseKey:React.PropTypes.string
};

export default LabelledSelect;
