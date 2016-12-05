import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import VerifyOtp from '../views/VerifyOtp';
import SellerDetails from '../views/SellerDetails';
import TaxDetails from '../views/TaxDetails';
import PaymentDetails from '../views/PaymentDetails';
import POCDetails from '../views/POCDetails';
import SellerInterview from '../views/SellerInterview';
import TnC from '../views/TnC';

const tabs      = ["Mobile Verification", "SellerInformation",  "Tax Details",  "Payment Details",  "Point of Contact", "Seller Interview", "Terms & Conditions"];
const tabPanels = [     VerifyOtp,            SellerDetails,     TaxDetails,      PaymentDetails,       POCDetails,         SellerInterview,      TnC];

class TabBar extends Component{
  constructor(){
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }
  renderTabs(item,index){
    return(
      <Tab key={index}>{item}</Tab>
    );
  }
  renderTabPanels(item,index){
    let DynamicTabPanel = item; //Not using item directly as JSX requires First letter to be capitalised
    return(
      <TabPanel key={index}>
          <DynamicTabPanel/>
      </TabPanel>
    );
  }
  render(){
    console.log(tabs);
    console.log(tabPanels);
    return(
      <Tabs>
        <TabList>
          {tabs.map(this.renderTabs)}
        </TabList>
        {tabPanels.map(this.renderTabPanels)}
      </Tabs>
    );
  }
}

export default TabBar;
