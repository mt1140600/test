import React, {Component} from 'react';
import {Button} from "@blueprintjs/core";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handleLogout} from '../actions/login';

class HeaderButtons extends Component{
  handleLogout = () => {
    this.props.handleLogout();
  }

  render(){
    return(
      <div id="headerButtons">
        <Button iconName="log-out" onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleLogout}, dispatch);
}

export default connect(null, mapDispatchToProps)(HeaderButtons);
