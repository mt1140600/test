import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import FloatingNotification from './FloatingNotification';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <FloatingNotification
          message = {this.props.floatingNotification.message}
          visible= {this.props.floatingNotification.active}
          intent ={this.props.floatingNotification.intent}/>
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

export default connect(mapStateToProps, null)(App);
