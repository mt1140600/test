import React, { PropTypes } from 'react';
import FloatingNotification from './FloatingNotification';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {restoreLogin} from '../actions/login';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  componentWillMount(){
      console.log("Checking if user is logged-in already");
      if(localStorage.getItem('user_id')!==null){
        this.props.restoreLogin();
      }
  }

  render() {
    return (
      <div>
        {this.props.children}
        <FloatingNotification
          message = {this.props.floatingNotification.message}
          visible= {this.props.floatingNotification.active}
          intent ={this.props.floatingNotification.intent}
          duration = {this.props.floatingNotification.duration}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = (state) => {
  return {
    floatingNotification: state.floatingNotification
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({restoreLogin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
