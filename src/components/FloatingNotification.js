import React, {Component} from 'react';
import Callout from '../components/Callout';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/generic';

class FloatingNotification extends Component{

  hide = () => {
      //call action to hide 
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.visible === true){
        setTimeout(this.hide, 3000);
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

// FloatingNotification.propTypes = {
//   message: React.PropTypes.string,
//   intent: React.PropTypes.string,
//   duration: React.PropTypes.number
// }
//
// FloatingNotification.defaultProps = {
//   duration: 3000,
//   intent: "pt-intent-danger"
// }

// const mapStateToProps = (state) => ({
//   floatingNotification: state.floatingNotification
// })
//
//
// const mapDispatchToProps = (dispatch) => {
//   return{
//     actions : bindActionCreators(actionCreators, dispatch),
//     dispatch
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FloatingNotification);

export default FloatingNotification;
