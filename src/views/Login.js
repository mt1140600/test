import React, {Component} from 'react';
import { Button, FocusStyleManager, InputGroup } from "@blueprintjs/core";
var logo = require('../images/prokure_logo.png');
FocusStyleManager.onlyShowFocusOnTabs();

class Login extends Component{
  render(){
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center"}}>

          <img src = {logo} style={{width:"100px",height:"100px",margin:"auto"}}></img>
          <br/>
          <h2 className="pt-intent-primary item">Prokure</h2>
          <div className="pt-control-group pt-vertical item">
            <div className="pt-input-group pt-large " >
              <input type="text" className="pt-input" placeholder="Email" />
            </div>
            <div className="pt-input-group pt-large" >
              <input type="password" className="pt-input" placeholder="Password" />
            </div>
          </div>
          <br/>
          <Button className="pt-intent-primary pt-button-height-large item">Log in</Button>
          <br/>
          <a className="item" style={{color:"grey"}}>Forgot Password?</a>
          <br/>
          <Button className="pt-intent-warning item">Create new account</Button>
          <br/>
          <p className="item" style={{color:"grey"}}>© 2016 Cerise Internet Technologies</p>

        </div>

      </div>
    );
  }
}

export default Login;
