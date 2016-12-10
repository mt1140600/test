import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
const logo = require('../images/prokure_logo.png');
FocusStyleManager.isActive();

class Callout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible:nextProps.visible})
  }


  handleCloseClick = () => {
    this.setState({visible:false})
  }

  render () {
    if (this.state.visible) {
      return (
        <div className="pt-callout pt-intent-danger" style={{marginTop:'10px', color: '#a94442'}}>
          {this.props.text}
          <span onClick={this.handleCloseClick} style={{float:'right'}} className="pt-icon-cross"></span>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showCallout: false,
      calloutText:"" 
    };
  }

  handleSignupClick = () => {
      this.props.dispatch(push('/signup'));
  }

  handleFieldUpdate = (field, event) => {
    this.setState({[`${field}`]:event.target.value});
  }

  validateEmail = (email)  =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        this.props.actions.loginUser(this.state.email,this.state.password);
      }
    }
    
  }

  render() {
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center", minWidth:"300px"}}>

          <img src={logo} style={{width:"100px",height:"100px",margin:"auto"}} />
          <br/>
          <h2 className="pt-intent-primary item">Prokure</h2>
          <br/>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Email" value={this.state.email} onChange={this.handleFieldUpdate.bind(this, "email")} />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Password" value={this.state.password} onChange={this.handleFieldUpdate.bind(this, "password")} />
            </div>
          </div>
          <br/>
          <Button className="pt-intent-primary pt-button-height-large item" onClick={this.handleLogin} >Log in</Button>
          <Callout text={this.state.calloutText} visible={this.state.showCallout} />
          <br/>
          <a className="item pt-text-muted" style={{color:"#5c7080"}}>Forgot Password?</a>
          <br/>
          <Button onClick={this.handleSignupClick} className="pt-intent-warning item">Create new account</Button>
          <br/>
          <p className="item pt-text-muted">© 2016 Cerise Internet Technologies</p>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
