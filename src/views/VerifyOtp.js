import React, {Component} from 'react';
import {validateMobileNumber} from '../utils/fieldValidations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionTabChange, updateTabValidation, updateVerifyOtp} from '../actions/registration';
import * as constants from '../constants';


class VerifyOtp extends Component {
  constructor(){
    super();
    this.state = {codeSent: false, code: "", validCode: true};
    this.tokenId = null;
  }

  handleChange = (event) => {
    this.props.updateVerifyOtp("phoneNo", event.target.value, validateMobileNumber(event.target.value));
  }

  storeNumber = () => {
    console.log("Storing number");
    var storeNumberRequest = new XMLHttpRequest();
    var url = constants.saveForm;
    console.log(url);
    storeNumberRequest.open("POST", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
    storeNumberRequest.setRequestHeader("Authorization", localStorage.getItem('token'));
    storeNumberRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    storeNumberRequest.onload = () => {
      if(storeNumberRequest.status === 200){
        console.log(storeNumberRequest.response);
      }
      else{
        alert("Something went wrong");
        console.log("Something went wrong; Status: "+storeNumberRequest.status);
      }
    }
    console.log("number "+this.props.verifyOtp.value.phoneNo);
    console.log(JSON.stringify({merchant_phoneno: this.props.verifyOtp.value.phoneNo}));
    storeNumberRequest.send(JSON.stringify({merchant_phoneno: this.props.verifyOtp.value.phoneNo}));
  }

  sendSMS = () => {
    if(validateMobileNumber(this.props.verifyOtp.value.phoneNo)){
      this.setState({validNo: true})
      this.props.updateVerifyOtp("phoneNo", this.props.verifyOtp.value.phoneNo, true);
      this.storeNumber();

      var smsRequest = new XMLHttpRequest();
      var url = constants.requestOtp+this.props.verifyOtp.value.phoneNo;
      console.log(url);
      smsRequest.open("GET", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
      smsRequest.onload = () => {
        if(smsRequest.status === 200){
          console.log(smsRequest.response);
          this.setState({codeSent: true});
          const responseObj = JSON.parse(smsRequest.response);
          this.tokenId = responseObj.token_id;
        }
        else{
          alert("Something went wrong");
          console.log("Something went wrong; Status: "+smsRequest.status);
        }
      }
      smsRequest.send(null);
    }

    else this.setState({validNo: false})
  }

  handleCodeChange = (event) => {
      this.setState({code: event.target.value});
  }

  checkCode = () => {
    if(this.state.code.length === 6){// check if code matches

      var verifyOtpRequest = new XMLHttpRequest();
      var url = constants.verifyOtp;
      var params = `token_id=${this.tokenId}&otp=${this.state.code}`;
      console.log(params);
      console.log(url);
      verifyOtpRequest.open("POST", url, true); //!!Note if you don't add http:// to the url, it will append the current url to the begining of the string eg. http://localhost:3000
      verifyOtpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      verifyOtpRequest.onload = () => {
        if(verifyOtpRequest.status === 200){

          const responseObj = JSON.parse(verifyOtpRequest.response);

          if(responseObj.verified === true){
            console.log("Page validated");
            this.props.updateTabValidation(0, true);
            // this.props.actionTabChange(1);
          }
          else if(responseObj.verified === false){
            console.log("Incorrect Otp");
            this.props.updateTabValidation(0, false);
            this.setState({validCode: false});
          }
          else{
            console.log("Something went wrong");
            alert("Something went wrong");
          }

          console.log(verifyOtpRequest.response);

        }
        else{
          alert("Something went wrong");
          console.log("Something went wrong; Status: "+verifyOtpRequest.status);
        }
      }
      verifyOtpRequest.send(params);
    }
    else{
      this.props.updateTabValidation(0, false);
      this.setState({validCode: false});
    }
  }

  render() {
    return(
      <div className="container">

        <div className="col">

          <h2 className="pt-intent-primary item">Verify Mobile Number</h2>
          <br/>
          <p>Enter the mobile number below</p>
          <div className="pt-control-group">
            <p className="pt-button pt-active" style={{cursor:"default"}}>+91 </p>
            <input type="text" className="pt-input" value={this.props.verifyOtp.value.phoneNo} onChange={this.handleChange}/>
            <button className="pt-button" onClick={this.sendSMS}>Send SMS</button>
          </div>
          {(this.props.verifyOtp.vState.phoneNo === false)?<p className="helpText">Enter a valid mobile number</p>:null}

          {
            (!this.state.codeSent)?
            <div>
              <p><small>We will send a verification code to this number</small></p>
              <br/>
            </div>
              :
            <div>
              <p><small>We have sent a code to the number mentioned above</small></p>
              <br/>
              <p><small>Enter it below to verify your number</small></p>
              <div className="pt-control-group">
                <input type="text" className="pt-input" value={this.state.code} onChange={this.handleCodeChange}/>
                <button className="pt-button pt-intent-primary" onClick={this.checkCode}>Verify</button>
              </div>
              {(!this.state.validCode)?<p className="helpText">Incorrect Code</p>:null}
            </div>
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      verifyOtp: state.verifyOtp
    }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({updateTabValidation, actionTabChange, updateVerifyOtp}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
