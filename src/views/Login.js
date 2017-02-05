import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import * as genericActionCreator from '../actions/generic';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import Logo from '../components/Logo';

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

  componentWillMount(){
    const current_location = window.location.href;
    if( typeof(current_location.split("email_verified=")[1]) !== "undefined" ){ //email was verified
      this.props.genericActions.showFloatingNotification("Email has been verified", "pt-intent-success", 2000);
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({showCallout: nextProps.userData.showCallout, calloutText: nextProps.userData.calloutText, intent: nextProps.userData.intent, buttonDisabled: nextProps.userData.buttonDisabled});
  }

  goHome = () => {
    console.log("haha");
  }

  render() {
    let buttonClass = (this.state.buttonDisabled)?"pt-disabled":"";
    return(
      <div className="container pad50">
        <div className="col" style={{textAlign:"center", minWidth:"300px", paddingTop:"20px"}}>
          <Logo/>
          <br/>
          <form>
            <div className="pt-control-group pt-vertical">
              <div className="pt-input-group pt-large " >
                <input type="text" name="email" className="pt-input" placeholder="Email" value={this.state.email} onChange={this.handleFieldUpdate.bind(this, "email")} />
              </div>
              <div className="pt-input-group pt-large" >
                <input type="password" className="pt-input" placeholder="Password" value={this.state.password} onChange={this.handleFieldUpdate.bind(this, "password")} onKeyUp={this.handleEnter}/>
              </div>
            </div>
          </form>
          <br/>
          <Button className={"pt-intent-primary" + buttonClass} onClick={this.handleLogin} disabled={this.state.buttonDisabled}>Log in</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} intent={this.state.intent} />
          <br/>
          <a onClick={this.handleResetPassword}>Forgot Password?</a>
          <br/>
          <br/>
          <p className="pt-text-muted" style={{ fontWeight: 100 }}>Do not have an account?</p>
          <Button onClick={this.handleSignupClick} className="pt-intent-success">Create account</Button>
          <br/>
          <br/>
          <p style={{marginTop:"15px", fontSize:"12px"}} className="pt-text-muted">© 2016 Cerise Internet Technologies Pvt Ltd</p>
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
  genericActions: bindActionCreators(genericActionCreator, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
