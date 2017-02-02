import React, {Component} from 'react';
import ViewNameBar from '../components/ViewNameBar';
import UploadProduct from '../panelViews/UploadProduct';
import Orders from '../panelViews/OrdersPanel';
import Returns from '../panelViews/Returns';
import Completed from '../panelViews/Completed';
import Payment from '../panelViews/Payment';
import ManageInventory from '../panelViews/ManageInventory';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../actions/dashboard';

const tabs      = [{name: "Product Upload", icon: "pt-icon-cloud-upload", color: "#7ba428"}, {name: "Manage Inventory", icon: "pt-icon-box", color: "#e5e500"}, {name: "Orders", icon: "pt-icon-projects", color: "#7fbafd"}, {name: "Returns/Replacements", icon: "pt-icon-swap-horizontal", color: "#c17196"}, {name: "Completed Orders", icon: "pt-icon-saved", color: "#aceace"}, {name: "Payments", icon: "pt-icon-credit-card", color: "#ffb6c1"} ];
const tabPanels = [UploadProduct,   ManageInventory,      Orders,   Returns,                Completed ,     Payment];

class VerticalTabLayout extends Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
    // this.state={currentTab: 0};
  }

  handleChange(tab){
    // this.setState({currentTab: tab});
    this.props.selectDashboardTab(tab);
  }

  renderTabs(item, index) {
    let className = (this.props.currentTab === index)? "verticalTab active" : "verticalTab";
    return(
      <div className={className} key={index} onClick={()=>{this.handleChange(index);}}>
        <span className={item.icon} style={{marginRight: 10, color: item.color}}/>
        {(!this.props.collapsed)? item.name : ""}
      </div>
    );
  }

  renderTabPanels(item,index) {
    let DynamicComponent = item;
    // if(this.state.currentTab === index){
    if(this.props.currentTab === index){
      return(
        <DynamicComponent key={index}/>
      );
    }
    else return null;
  }

  collapseVerticalTabBar = () => {
    this.props.collapseVerticalTabBar(!this.props.collapsed);
  }

  render(){
    let collapsedClassName = (this.props.collapsed)? "collapsed" : "";
    return(
        <div className="verticalTabLayout">
          <div className={`verticalTabBar ${collapsedClassName}`}>
            {tabs.map(this.renderTabs)}
            <div className="verticalTab" style={{marginTop: 50}} key="99" onClick={this.collapseVerticalTabBar}>
              <span className={(this.props.collapsed)? "pt-icon-menu-open" : "pt-icon-menu-closed" } style={{marginRight: 10, color: "white"}}/>
            </div>
          </div>

          <div className= {`verticalTabPanel ${collapsedClassName}`}>
            {ViewNameBar(tabs[this.props.currentTab].name)}
            {tabPanels.map(this.renderTabPanels)}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab: state.dashboard.currentTab,
    collapsed: state.dashboard.collapsed
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( dashboardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabLayout);
