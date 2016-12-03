import React, {Component} from 'react';

class LabelledSelect extends Component{
  constructor(){
    super();
    this.renderOption = this.renderOption.bind(this);
  }
  renderOption(item, index){
    return(
      <option key={index} value={index}>{item}</option>
    );
  }
  render(){
    return(
      <label className="pt-label pt-inline">
        {this.props.children}
        <div className="pt-select" style={{width:"200px", float:"right"}}>
          <select defaultValue={0}>
            {this.props.options.map(this.renderOption)}
          </select>
        </div>
      </label>
    );
  }
}

export default LabelledSelect;
