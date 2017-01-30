import React, {Component} from 'react';
import { Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";

class AutoCompleteDropDown extends Component{

  renderOptions = (item, index) => {
    if(item.indexOf('++') === 0){ //To add new Option
      item = item.slice(3, item.length);
      //TODO: API call to add new option
      return(
          <MenuItem key={index} text={item} iconName="pt-icon-add-to-artifact" />
      );
    }

    return(
      <MenuItem intent="primary" key={index} text={item} />
    );
  }

  render(){
    let textInput;
    return(
      <div className= "autoCompleteDropDown" style= {this.props.style}>
        <div style={{padding: "5px 5px 5px 5px", backgroundColor: "whitesmoke"}}>
          <input className="pt-input pt-input-blueShadowDisable" style={{width: "100%"}}/>
        </div>
        <Menu className="dropDown">
          {["1","2","3"].map(this.renderOptions)}
        </Menu>
      </div>
    );
  }
}

export default AutoCompleteDropDown;
