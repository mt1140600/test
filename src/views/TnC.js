import React, {Component} from 'react';
import { Button, FocusStyleManager } from "@blueprintjs/core";
import Callout from '../components/Callout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTabValidation} from '../actions/registration';
import {push} from 'react-router-redux';
import {pushSubFormToDB} from '../utils';
import * as constants from '../constants';

FocusStyleManager.onlyShowFocusOnTabs();

class TnC extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.tabs = ["sellerInfo","taxDetails","paymentDetails","POCDetails","addInfo"];
    this.state = { showCallout: null, showSpinner: false };
  }

  submitForm() {
    // let formObj = null;
    this.setState({showSpinner: true});
    this.props.updateTabValidation(6, true);  //Line 1.   Just like setState in react, state change is redux store also get pooled (not synch, not immediately done).  Therefore, this action's effect is not seen. Thus, excluding index 6 in Line2

    let formValidated = true;

    this.props.tabValidation.map((item,index)=>{
      if(item === null && index!==6){  // Line 2.   index 6 is TnC. The updateTabValidation actions are pooled together with
        console.log("vals",this.props.tabValidation);
        this.props.updateTabValidation(index, false);
        formValidated = false;
      }
      else if(item === false){
        formValidated = false;
        this.setState({showSpinner: false});
      }
    })

    this.setState({ showCallout: !formValidated });

    const successHandler = () => {
      // this.setState({showSpinner: false});  Commenting this out because dispatch to /verfication unmounts this component and we cant set state of unmounted component
      this.props.dispatch(push("/verification"));
    }

    const failureHandler = () => {
      this.setState({showSpinner: false});
      console.log("Failed to write to DB (TnC)");
    }

    if(formValidated){ //Check if previous 6 tabs are valid
      const bodyObj = { registration_complete: true };
      pushSubFormToDB(constants.saveForm, bodyObj, successHandler, failureHandler);
    }

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
            {(this.state.showSpinner)?<div style={{margin: "auto", marginTop:"10px"}}><Spinner className="pt-small"/></div>:null}
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
  return bindActionCreators({updateTabValidation, dispatch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TnC);
