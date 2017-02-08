import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VerifyOtp from '../views/VerifyOtp';
import SellerInfo from '../views/SellerInfo';
import TaxDetails from '../views/TaxDetails';
import PaymentDetails from '../views/PaymentDetails';
import POCDetails from '../views/POCDetails';
import AddInfo from '../views/AddInfo';
import {actionTabChange, loadForm} from '../actions/registration';
import { push } from 'react-router-redux'


let GoToDashBoard = (props) => {
  const handleClick = () => {
    console.log(props);
    props.actionTabChange(0);
    props.dispatch(push('/dashboard'));
  }
  return(
    <div onClick={handleClick} className="flexRow" style={{ fontSize: "x-large", fontWeight: 100, justifyContent: "center", margin: "100px 50px", cursor: "pointer"}}>
      <div style={{textAlign: "center", fontSize: "60px", color: "#6666ff", paddingRight: 20, position: "relative", top: -5}} className="pt-icon-control" />
      <div>
        <p style={{textAlign: "center", textDecoration: "none !important"}}> You have finished Editing your profile. </p>
        <p className="pseudoLink" style={{textAlign: "center"}}>Proceed to Dashboard?</p>
      </div>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    ...bindActionCreators({actionTabChange}, dispatch),
    dispatch
  }
}

GoToDashBoard = connect(null,mapDispatch)(GoToDashBoard);




const tabs      = ["Mobile Verification", "Seller Information",  "Tax Details",  "Payment Details",  "Point of Contact", "Additional Information", "Dashboard"];
const tabPanels = [     VerifyOtp,            SellerInfo,          TaxDetails,    PaymentDetails,       POCDetails,            AddInfo,             GoToDashBoard];

class EditTabLayout extends Component {
  constructor() {
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }
  renderTabs(item, index) {
    return(
      <Tab key={index} isSelected={true}>{item}</Tab>
    );
  }
  renderTabPanels(item, index) {
    let DynamicTabPanel = item; //Not using item directly as JSX requires First letter to be capitalised
    return(
      <TabPanel key={index}>
          <DynamicTabPanel/>
      </TabPanel>
    );
  }

  componentWillMount(){
    // setTimeout(this.props.actionTabChange.bind(null,0),100); //hack to fix tab line. Not required now. Problem was arising because we were requiring css in index.js.  Now we are linking css from html. The Tab component requires css to be loaded prior to it for proper functioning
    this.props.loadForm();
  }

  handleTabChange = (selectedTab) => {
    this.props.actionTabChange(selectedTab);
  }
  render() {
    return(
      <Tabs className="tabs1" selectedTabIndex={this.props.currentTab} onChange={this.handleTabChange}>
        <TabList className="pt-large" style={{padding: "0px 20px 0px 20px"}}>
          {tabs.map(this.renderTabs)}
        </TabList>
        {tabPanels.map(this.renderTabPanels)}
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab : state.registrationCurrentTab,
    tabValidation: state.tabValidation
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({actionTabChange, loadForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTabLayout);
