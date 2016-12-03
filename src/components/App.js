import React, {Component} from 'react';
import { Button, FocusStyleManager, InputGroup } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component{
  render(){
    return(
      <div className="container">
          <div className="col" style={{textAlign:"center"}}>
              <h2 className="pt-intent-primary item">Prokure</h2>
              <div className="pt-control-group pt-vertical item">
                  <div className="pt-input-group pt-large " >
                    <input type="text" className="pt-input" placeholder="Email" />
                  </div>
                  <div className="pt-input-group pt-large" >
                    <input type="password" className="pt-input" placeholder="Password" />
                  </div>
              </div>
              <Button className="pt-intent-primary pt-button-height-large item">Log in</Button>
              <a className="item">Forgot Password?</a>
              <Button className="pt-intent-warning item">Create new account</Button>
              <p className="item">© 2016 Cerise Internet Technologies</p>
          </div>
      </div>
    );
  }
}

export default App;
