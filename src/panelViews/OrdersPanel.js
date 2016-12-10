import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import PanelHeader from "../components/PanelHeader";
import NewOrders from './NewOrders';
import ConfirmedOrders from './ConfirmedOrders';
import DispatchedOrders from './DispatchedOrders';
import CancelledOrders from './CancelledOrders';

const tabs = ["New","Confirmed","Dispatched","Cancelled"];
const tabPanels = [ NewOrders, ConfirmedOrders, DispatchedOrders, CancelledOrders];

class OrdersPanel extends Component{

  constructor(){
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
  }

  renderTabs(item,index){
    return(
      <Tab key={index} isSelected={true}>{item}</Tab>
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
      <div>
        <PanelHeader />
        <Tabs className="tabs " key="horizontal">
          <TabList className="tabsBar">
            {tabs.map(this.renderTabs)}
          </TabList>
          {tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }
}

export default OrdersPanel;
