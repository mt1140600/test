import React, {Component} from 'react';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';
import ViewNameBar from '../components/ViewNameBar';

export default class Verification extends Component{
  render(){
    return(
      <div>
        <Header/>
        <HeaderButtons/>
        <div style={{marginTop: 50}}>
          {ViewNameBar("Account Settings")}
          <div className="tabs col" style={{ fontSize: "x-large", fontWeight: 100, justifyContent: "space-around"}}>
            <span style={{textAlign: "center"}}>
              Your details are yet to be verified.<br/>
              Please try later.
            </span>
          </div>
        </div>
      </div>
    );
  }
}
