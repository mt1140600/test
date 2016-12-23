import React, {Component} from 'react';
import Callout from '../components/Callout';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as genericActionCreator from '../actions/generic';

class FloatingNotification extends Component{

  componentWillReceiveProps(nextProps){
    if(nextProps.visible === true){
      setTimeout(() => {
        // console.log("Hiding floating notification");
        this.props.genericActions.hideFloatingNotification();
      }, nextProps.duration);
    }
  }

  render(){
    return(
      <div style={{ position: "fixed", bottom: "10px", width: "100vw"}}>
        <Callout
          className = "floatingNotification"
          text = {this.props.message}
          visible = {this.props.visible}
          intent = {this.props.intent}/>
      </div>
    );
  }

}

FloatingNotification.propTypes = {
  message: React.PropTypes.string,
  intent: React.PropTypes.string,
  duration: React.PropTypes.number,
  visible: React.PropTypes.bool
}

const mapDispatchToProps = (dispatch) => {
  return{
    genericActions: bindActionCreators(genericActionCreator, dispatch),
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(FloatingNotification);
