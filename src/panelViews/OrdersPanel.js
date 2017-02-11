import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import NewOrders from './NewOrders';
import ConfirmedOrders from './ConfirmedOrders';
import DispatchedOrders from './DispatchedOrders';
import CancelledOrders from './CancelledOrders';
//TODO: relative routing with link

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
      <Tab key={index} >
          {item}
      </Tab>
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

  handleTabChange = (selectedTabIndex, prevSelectedTabIndex) => {
    if(selectedTabIndex !== prevSelectedTabIndex){
        (selectedTabIndex !== 0)? this.props.router.push(`/dashboard/orders/${tabs[selectedTabIndex].toLowerCase()}`): this.props.router.push("/dashboard/orders");
    }
  }

  render(){
    return(
      <div>
        <Tabs className="tabs " key="horizontal" selectedTabIndex={this.props.selectedTabIndex} onChange={this.handleTabChange}>
          <TabList className="pt-large">
            {tabs.map(this.renderTabs)}
          </TabList>
          {tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }
}

OrdersPanel.PropTypes = {
  selectedTabIndex: React.PropTypes.number
}

//TODO: Make this dynamic
export const New = (props) => <OrdersPanel selectedTabIndex={0} {...props}/>
export const Confirmed = (props) => <OrdersPanel selectedTabIndex={1} {...props} />
export const Dispatched = (props) => <OrdersPanel selectedTabIndex={2} {...props} />
export const Cancelled = (props) => <OrdersPanel selectedTabIndex={3}  {...props} />


export const Orders = (props) => {
  return(
    <div>
      {props.children}
    </div>
  );
}
