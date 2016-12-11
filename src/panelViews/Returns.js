import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";

import PanelHeader from "../components/PanelHeader";
import ReturnsReturns from "./ReturnsReturns";
import Replacements from "./ReturnsReplacements";

const tabs = ["Returns","Replacements"];
const tabPanels = [ ReturnsReturns, Replacements];

class  Returns extends Component{

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

export default  Returns;
