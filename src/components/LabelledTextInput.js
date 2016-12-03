import React, {Component} from 'react';

class LabelledTextInput extends Component{
  render(){
    return(
      <label className="pt-label pt-inline container">
        {this.props.children}
        <input className="pt-input" style={{width: "200px", float:"right"}} type="text" dir="auto" />
      </label>
    );
  }
}

export default LabelledTextInput;
