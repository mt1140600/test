import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import UploadProduct from '../panelViews/UploadProduct';
import Orders from '../panelViews/Orders';


const tabs      = ["Product Upload","Orders"];
const tabPanels = [UploadProduct,     Orders ];

class VerticalTabLayout extends Component{
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
      <Tabs className="tabs pt-vertical">
        <TabList className="tabsBar">
          {tabs.map(this.renderTabs)}
        </TabList>
        {tabPanels.map(this.renderTabPanels)}
      </Tabs>
    );
  }
}

export default VerticalTabLayout;
