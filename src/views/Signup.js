import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/login';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import {reCaptchaSiteKey} from '../constants'
const logo = require('../images/prokure_logo.png');
FocusStyleManager.onlyShowFocusOnTabs();

class Signup extends Component {

  handleLoginClick = () => {
    this.props.dispatch(push("/"));
  }

  render() {
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center"}}>

          <img src = {logo} style={{width:"100px",height:"100px",margin:"auto"}} />
          <br/>
          <h2 className="pt-intent-primary item">Prokure</h2>
          <br/>
          <p style={{color:"grey"}}>Sign up and start selling on our platform now!</p>
          <br/>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Name" />
            </div>
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Business Name" />
            </div>
          </div>
          <br/>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Email ID" />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Password" />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Confirm Password" />
            </div>
          </div>
          <br/>
          <div className="g-recaptcha" data-sitekey={reCaptchaSiteKey} ></div>
          <br/>
          <Button className="pt-intent-primary pt-button-height-large item">Sign up</Button>
          <br/>
          <span  className="item" style={{color:"grey", marginBottom:"5px"}}>Already have an account?</span>
          <Button onClick={this.handleLoginClick}  className="pt-intent-warning item">Log in</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
