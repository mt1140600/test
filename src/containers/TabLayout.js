import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import VerifyOtp from '../views/VerifyOtp';
import SellerInfo from '../views/SellerInfo';
import TaxDetails from '../views/TaxDetails';
import PaymentDetails from '../views/PaymentDetails';
import POCDetails from '../views/POCDetails';
import AddInfo from '../views/AddInfo';
import TnC from '../views/TnC';

const tabs      = ["Mobile Verification", "Seller Information",  "Tax Details",  "Payment Details",  "Point of Contact", "Additional Information", "Terms & Conditions"];
const tabPanels = [     VerifyOtp,            SellerInfo,          TaxDetails,    PaymentDetails,       POCDetails,            AddInfo,                    TnC];

class TabLayout extends Component{
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
    return(
      <Tabs className="tabs">
        <TabList className="tabsBar">
          {tabs.map(this.renderTabs)}
        </TabList>
        {tabPanels.map(this.renderTabPanels)}
      </Tabs>
    );
  }
}

export default TabLayout;
