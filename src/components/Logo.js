import React, {Component} from 'react';
const logo = require('../images/prokure_logo.png');
import {browserHistory} from 'react-router';

export default class Logo extends Component{

  goHome = () => {
    browserHistory.push("/");
  }

  render(){
    return(
      <div onClick={this.goHome} style={{textDecoration: "none", cursor: "pointer"}}>
        <img src={logo} style={{width:"100px",height:"100px",margin:"auto"}} />
        <h2 className="pt-intent-primary item companyName">Prokure</h2>
      </div>
    );
  }

}
