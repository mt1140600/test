import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import Overview from "./PaymentOverview";
import DetailedStatement from "./PaymentDetailedStatement";

const tabs = ["Overview", "Detailed Statement"];
const tabPanels = [ Overview, DetailedStatement ];

class  Payment extends Component{

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
        <Tabs className="tabs " key="horizontal">
          <TabList className="pt-large">
            {tabs.map(this.renderTabs)}
          </TabList>
          {tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }
}

export default  Payment;
