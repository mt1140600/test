import React, {Component} from 'react';
import ViewNameBar from '../components/ViewNameBar';

import UploadProduct from '../panelViews/UploadProduct';
import Orders from '../panelViews/OrdersPanel';
import Returns from '../panelViews/Returns';
import Completed from '../panelViews/Completed';
import Payment from '../panelViews/Payment';
import ManageInventory from '../panelViews/ManageInventory';

const tabs      = [{name: "Product Upload", icon: "pt-icon-cloud-upload", color: "#7ba428"}, {name: "Manage Inventory", icon: "pt-icon-box", color: "#e5e500"}, {name: "Orders", icon: "pt-icon-projects", color: "#7fbafd"}, {name: "Returns/Replacements", icon: "pt-icon-swap-horizontal", color: "#c17196"}, {name: "Completed Orders", icon: "pt-icon-saved", color: "#aceace"}, {name: "Payments", icon: "pt-icon-credit-card", color: "#ffb6c1"} ];
const tabPanels = [UploadProduct,   ManageInventory,      Orders,   Returns,                Completed ,     Payment];

class VerticalTabLayout extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
    this.state={currentTab: 0};
  }

  handleChange(tab){
    this.setState({currentTab: tab});
  }

  renderTabs(item, index) {
    return(
      <div className="verticalTab" key={index} onClick={()=>{this.handleChange(index);}}>
        <span className={item.icon} style={{marginRight: 10, color: item.color}}/>
        {item.name}
      </div>
    );
  }

  renderTabPanels(item,index) {
    let DynamicComponent = item;
    if(this.state.currentTab === index){
      return(
        <DynamicComponent key={index}/>
      );
    }
    else return null;
  }

  render(){
    return(
        <div className="verticalTabLayout">
          <div className="verticalTabBar">
            {tabs.map(this.renderTabs)}
          </div>
          <div className="verticalTabPanel">
            {ViewNameBar(tabs[this.state.currentTab].name)}
            {tabPanels.map(this.renderTabPanels)}
          </div>
        </div>
    );
  }
}

export default VerticalTabLayout;
