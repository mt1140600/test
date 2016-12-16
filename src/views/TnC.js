import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTabValidation} from '../actions/registration';

FocusStyleManager.onlyShowFocusOnTabs();

class TnC extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.tabs = ["sellerInfo","taxDetails","paymentDetails","POCDetails","addInfo"];
    this.state = { showCallout: null };
  }

  submitForm() {
    // let formObj = null;
    let formValidated = true;
    this.props.tabValidation.map((item,index)=>{
      if(item === null){
        this.props.updateTabValidation(index, false);
        formValidated = false;
      }
      else if(item === false){
        formValidated = false;
      }
    })
    this.setState({ showCallout: !formValidated });

  }

  render() {
    let visibility = (this.state.showCallout === false)?false: true; // to handle null
    return(
      <div className="container">

          <div className="col" style={{width:"500px"}}>

            <h2> Terms &amp; Conditions </h2>
            <br/>

            <br/>
            <Callout text={"Please complete previous steps"} visible={ visibility }/>
            <br/>
            <Button className="pt-intent-primary" style={{margin:"auto"}} onClick={this.submitForm}>I Accept</Button>
          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tabValidation: state.tabValidation
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateTabValidation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TnC);
