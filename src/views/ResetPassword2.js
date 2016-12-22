import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import {forgotPassword} from "../constants";
const logo = require('../images/prokure_logo.png');


FocusStyleManager.isActive();

class ResetPassword2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      showCallout: false,
      calloutText:""
    };
  }

  goBack = () => {
      this.props.dispatch(push('/'));
  }

  handleFieldUpdate = (field, event) => {
    this.setState({[`${field}`]:event.target.value});
  }

  getToken = () => {
    const current_location = window.location.href;
    return (current_location.split("token=")[1]);
  }

  setPassword= () => {
    if (this.state.newPassword.length < 4 || this.state.confirmPassword.length > 15)
      this.setState({showCallout:true, calloutText:"Password should be 4 - 15 character"});
    else if (this.state.newPassword != this.state.confirmPassword)
      this.setState({showCallout:true, calloutText:"Passwords did not match"});
    else {
      this.setState({showCallout:false});
      this.props.actions.handleNewPassword(this.state.newPassword, this.getToken());
    }
  }

  render() {
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center", minWidth:"300px", paddingTop:"20px"}}>

          <img src={logo} style={{width:"100px",height:"100px",margin:"auto"}} />
          <br/>
          <h2 className="pt-intent-primary item companyName">Prokure</h2>
          <br/>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="password" className="pt-input" placeholder="New Password" value={this.state.newPassword} onChange={this.handleFieldUpdate.bind(this, "newPassword")} />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleFieldUpdate.bind(this, "confirmPassword")} />
            </div>
          </div>
          <br/>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} />
          <br/>
          <Button className="pt-intent-primary pt-button-height-large item" onClick={this.setPassword}>Set Password</Button>
          <p style={{marginTop:"15px", fontSize:"12px"}} className="item pt-text-muted">© 2016 Cerise Internet Technologies Pvt. Ltd.</p>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.user
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword2);
