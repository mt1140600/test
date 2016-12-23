import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
const logo = require('../images/prokure_logo.png');
FocusStyleManager.isActive();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showCallout: false,
      calloutText: "",
      intent: "pt-intent-danger",
      buttonDisabled: false
    };
  }

  handleSignupClick = () => {
      this.props.dispatch(push('/signup'));
  }

  handleResetPassword = () => {
      this.props.dispatch(push('/reset'));
  }

  handleFieldUpdate = (field, event) => {
    this.setState({[`${field}`]:event.target.value});
  }

  validateEmail = (email)  =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleLogin = () => {
    if (this.state.email == '' || this.state.password == '') {
      this.setState({showCallout:true, calloutText:"Please fill all the fields"});
    } else {
      if (!this.validateEmail(this.state.email)) {
        this.setState({showCallout:true, calloutText:"Please enter valid email"});
      } else {
        this.setState({showCallout:false});
        this.props.actions.loginUser(this.state.email, this.state.password);
      }
    }

  }

  handleEnter = (event) =>{
    if(event.keyCode == 13) this.handleLogin();
  }

  componentWillReceiveProps(nextProps){
    this.setState({showCallout: nextProps.userData.showCallout, calloutText: nextProps.userData.calloutText, intent: nextProps.userData.intent, buttonDisabled: nextProps.userData.buttonDisabled});
  }

  render() {
    let buttonClass = (this.state.buttonDisabled)?"pt-disabled":"";
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center", minWidth:"300px", paddingTop:"20px"}}>

          <img src={logo} style={{width:"100px",height:"100px",margin:"auto"}} />
          <br/>
          <h2 className="pt-intent-primary companyName item">Prokure</h2>
          <br/>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="email" className="pt-input" placeholder="Email ID" value={this.state.email} onChange={this.handleFieldUpdate.bind(this, "email")} />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Password" value={this.state.password} onChange={this.handleFieldUpdate.bind(this, "password")} onKeyUp={this.handleEnter}/>
            </div>
          </div>
          <br/>
          <Button className={"pt-intent-primary pt-button-height-large item " + buttonClass} onClick={this.handleLogin} disabled={this.state.buttonDisabled}>Log in</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} intent={this.state.intent} />
          <br/>
          <a onClick={this.handleResetPassword} className="item pt-text-muted" style={{color:"#5c7080"}}>Forgot Password?</a>
          <br/>
          <Button onClick={this.handleSignupClick} className="pt-intent-warning item">Create new account</Button>
          <br/>
          <p style={{marginTop:"15px", fontSize:"12px"}} className="item pt-text-muted">© 2016 Cerise Internet Technologies Pvt Ltd</p>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators,  dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
