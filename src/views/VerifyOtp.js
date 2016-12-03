import React, {Component} from 'react';

class VerifyOtp extends Component{
  render(){
    return(
      <div className="container">

        <div className="col">

          <h2 className="pt-intent-primary item">Verify Mobile Number</h2>
          <br/>
          <p style={{color:"grey"}}>Enter the mobile number below</p>
          <div className="pt-control-group">
            <p className="pt-button pt-active" style={{cursor:"default"}}>+91 </p>
            <input type="text" className="pt-input"/>
            <button className="pt-button">Send SMS</button>
          </div>

          <p style={{color:"grey"}}><small>We will send a verification code to this number</small></p>

          <br/>
          <p style={{color:"grey"}}><small>Enter it below to verify your number</small></p>
          <div className="pt-control-group">
            <input type="text" className="pt-input"/>
            <button className="pt-button pt-intent-primary">Verify</button>
          </div>

        </div>

      </div>
    );
  }
}

export default VerifyOtp;
