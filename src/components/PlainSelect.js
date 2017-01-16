import React, {Component} from 'react';

class PlainSelect extends Component{
  constructor(){
    super();
    this.renderOptions = this.renderOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  renderOptions(item, index){
    return(
      <option key={index} value={item}>{item}</option>
    );
  }
  handleChange(event){
    this.props.onChange(event.target.value);
  }
  render(){
    return(
      <div className="pt-select" style={Object.assign({},{marginRight:"auto"},this.props.style)}>
        <select
          value={this.props.value}
          onChange={this.handleChange}>
          {this.props.options.map(this.renderOptions)}
        </select>
      </div>
    );
  }
}

PlainSelect.propTypes = {
  options: React.PropTypes.array,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  onChange: React.PropTypes.func,
  style: React.PropTypes.object
};

export default PlainSelect;
