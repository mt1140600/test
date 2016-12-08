import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
const logo = require('../images/prokure_logo.png');
FocusStyleManager.isActive();

class Login extends Component {
  render() {
    return(
      <div className="container">

        <div className="col" style={{textAlign:"center"}}>

          <img src = {logo} style={{width:"100px",height:"100px",margin:"auto"}} />
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
          <a className="item pt-text-muted" style={{color:"#5c7080"}}>Forgot Password?</a>
          <br/>
          <Button className="pt-intent-warning item">Create new account</Button>
          <br/>
          <p className="item pt-text-muted">© 2016 Cerise Internet Technologies</p>

        </div>

      </div>
    );
  }
}

export default Login;
