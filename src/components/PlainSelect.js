import React, {Component} from 'react';

class PlainSelect extends Component{
  constructor(){
    super();
    this.renderOptions = this.renderOptions.bind(this);
  }
  renderOptions(item, index){
    return(
      <option key={index} value={index}>{item}</option>
    );
  }
  render(){
    return(
      <div className="pt-select" style={{marginRight:"auto"}}>
        <select>
          {this.props.options.map(this.renderOptions)}
        </select>
      </div>
    );
  }
}

PlainSelect.propTypes = {
  options: React.PropTypes.array
};

export default PlainSelect;
