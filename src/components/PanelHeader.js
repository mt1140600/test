import React, {Component} from 'react';

class PanelHeader extends Component{
  render(){
    return(
      <div className="panelHeader">
        {this.props.children}
      </div>
    );
  }
}

PanelHeader.propTypes = {
  children: React.PropTypes.node
}
export default PanelHeader;
