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

class ResetPassword2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      showCallout: false,
      calloutText:"",
      showFloatingNotification: false
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
      (this.state.showFloatingNotification)?this.props.genericActions.showFloatingNotification("New password has been set", "pt-intent-success", 2000):null;
      this.props.actions.handleNewPassword(this.state.newPassword, this.getToken());
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({showCallout: nextProps.userData.showCallout, calloutText: nextProps.userData.calloutText, showFloatingNotification: nextProps.userData.showFloatingNotification});
  }

  handleEnter = (event) =>{
    if(event.keyCode == 13) this.setPassword();
  }

  render() {
    return(
      <div className="container pad50">

        <div className="col" style={{textAlign:"center", minWidth:"300px", paddingTop:"20px"}}>

          <Logo/>

          <br/>
          <div className="pt-control-group pt-vertical">
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="New Password" value={this.state.newPassword} onChange={this.handleFieldUpdate.bind(this, "newPassword")} />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleFieldUpdate.bind(this, "confirmPassword")} onKeyUp={this.handleEnter}/>
            </div>
          </div>
          <br/>
          <Button className="pt-intent-success" onClick={this.setPassword}>Set Password</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} />
          <br/>

          <p style={{marginTop:"15px", fontSize:"12px"}} className="pt-text-muted">© 2016 Cerise Internet Technologies Pvt. Ltd.</p>

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
  genericActions: bindActionCreators(genericActionCreator, dispatch),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword2);
