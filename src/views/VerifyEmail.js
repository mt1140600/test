import React, {Component} from 'react';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';
import ViewNameBar from '../components/ViewNameBar';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import {handleLogout} from "../actions/login";

class VerifyEmail extends Component{

  waitAndRedirect = () => {
    console.log("Will be redirected in 4 seconds");
    setTimeout(
      this.props.handleLogout,
      4000
    );
  }

  render(){
    return(
      <div>
        <Header/>
        {(localStorage.getItem("user_id") !== null)? <HeaderButtons/>: null}
        <div style={{marginTop: 50}}>
          {ViewNameBar("Account Settings")}
          <div className="tabs col" style={{ fontSize: "x-large", fontWeight: 100, justifyContent: "space-around"}}>
            <span style={{textAlign: "center"}}>
              An Email has been sent to your registered Email Id. <br/>
              Please verify to proceed.
            </span>
            {this.waitAndRedirect()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleLogout},dispatch);
}

export default connect(null, mapDispatchToProps)(VerifyEmail);
