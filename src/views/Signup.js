import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import {reCaptchaSiteKey} from '../constants';
import  Recaptcha  from 'react-recaptcha';
import Logo from '../components/Logo';

FocusStyleManager.onlyShowFocusOnTabs();
class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      business_name:'',
      email: '',
      password: '',
      password_match:'',
      showCallout: false,
      calloutText:"",
      intent:"pt-intent-danger",
      reCaptchaResponse:"",
      buttonDisabled: false
    };
  }

  validateEmail = (email)  =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleLoginClick = () => {
    this.props.dispatch(push("/"));
  }

  componentWillReceiveProps(nextProps){
    this.setState({calloutText: nextProps.userData.calloutText, showCallout: nextProps.userData.showCallout, intent: nextProps.userData.intent, buttonDisabled: nextProps.userData.buttonDisabled});
  }

  handleSignupClick = () => {
    if (this.state.username == '' || this.state.business_name == '' || this.state.email == '' || this.state.password == '' || this.state.password_match == '' || this.state.reCaptchaResponse == '') {
      this.setState({showCallout:true, calloutText:"Please fill all the fields"});
    } else {
      if (!this.validateEmail(this.state.email)) {
        this.setState({showCallout:true, calloutText:"Please enter valid email"});
      } else if (this.state.password != this.state.password_match) {
        this.setState({showCallout:true, calloutText:"Password did not match"});
      } else if (this.state.password.length < 4 || this.state.password.length > 15) {
        this.setState({showCallout:true, calloutText:"Password should be 4 - 15 character"});
      } else {
        this.setState({showCallout:false});
        this.props.actions.signupUser({
          username:this.state.username,
          business_name:this.state.business_name,
          email:this.state.email,
          password:this.state.password,
          reCaptchaResponse:this.state.reCaptchaResponse
        });
        this.recaptchaInstance.reset();
      }
    }
  }

  callback = () => {};

  verifyCallback = (response) => {
    this.setState({reCaptchaResponse: response});
  };

  expiredCallback = () => {
    this.setState({reCaptchaResponse: ''});
  };

  handleFieldUpdate = (field, event) => {
    this.setState({[`${field}`]:event.target.value});
  }

  handleEnter = (event) =>{
    if(event.keyCode == 13) this.handleSignupClick();
  }

  render() {
    let buttonClass = (this.state.buttonDisabled)?"pt-disabled":"";
    return(
      <div className="container pad50">

        <div className="col" style={{textAlign:"center", paddingTop:"20px", minWidth:"300px",}}>

          <Logo/>
          <br/>
          <p style={{color:"grey"}}>Sign up and start selling on our platform now!</p>
          <div className="pt-control-group pt-vertical">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Name" value={this.state.username} onChange={this.handleFieldUpdate.bind(this, "username")}  />
            </div>
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Name of Business" value={this.state.business_name} onChange={this.handleFieldUpdate.bind(this, "business_name")}  />
            </div>
          </div>
          <br/>
          <div className="pt-control-group pt-vertical">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Email ID" value={this.state.email} onChange={this.handleFieldUpdate.bind(this, "email")} />
            </div>
            <div className="pt-input-group pt-large" value={this.state.password} onChange={this.handleFieldUpdate.bind(this, "password")}  >
              <input type="password" className="pt-input" placeholder="Password" />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Confirm Password" value={this.state.password_match} onChange={this.handleFieldUpdate.bind(this, "password_match")} onKeyUp={this.handleEnter}/>
            </div>
          </div>
          <br/>
          <Recaptcha
            sitekey={reCaptchaSiteKey}
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.callback}
            expiredCallback={this.expiredCallback}
            ref={e => this.recaptchaInstance = e}
          />
          <br/>
          <Button onClick={this.handleSignupClick} className={"pt-intent-success pt-button-height-large" + buttonClass} disabled={this.state.buttonDisabled}>Sign up</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} intent={this.state.intent}/>
          <br/>
          <br/>
          <span style={{color:"grey", marginBottom:"5px", fontWeight: 100}}>Already have an account?</span>
          <Button onClick={this.handleLoginClick}  className="pt-intent-primary">Log in</Button>
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
  actions : bindActionCreators(actionCreators, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
