import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import PanelHeader from "../components/PanelHeader";
import PlainSelect from '../components/PlainSelect';
import { Intent, Popover, Position, Switch, Tooltip } from "@blueprintjs/core";
import OrderBy from "../components/OrderBy";


class ManageInventoryActiveRow extends Component{
  constructor(){
    super();
  }

  onChange(){
    return null;
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"1", justifyContent:"flex-start"}}>
          <div style={{marginBottom:"-10px"}}>
            <CheckboxWrapper>
            </CheckboxWrapper>
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:6}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            <PlainSelect style={{marginRight:0}}
              options={["10","20","30","40","50"]}
              value={this.props.value.qty}
              onChange={this.onChange}/>
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div className="pt-button-group" style={{paddingRight: "10px", alignSelf:"center"}}>
            <button type="button" className="pt-button pt-intent-primary">Update Price</button>
            <button type="button" className="pt-button pt-intent-warning">Edit Product</button>
          </div>
        </div>

      </div>
    );
  }
}
ManageInventoryActiveRow.propTypes = {
  value: React.PropTypes.object,
}

class ManageInventoryActive extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center"}, {label: "Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center"}, {label: "Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center"}, {label: " ", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{productDetails:"Micromax Q392 IMD Graphic Black Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" },{productDetails:"Curved Tempered glass for Redmi Note 3", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" },{productDetails:"Lenovo Vibe X3 Cover Green", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
  }

  renderTableHeaders = (item,index) => {
    //assigning default values
    let itemObj = Object.assign({label: "<Label>", width: 1, tooltip: null, orderby: true, justify:"center"}, item);

    if(itemObj.tooltip === null)
      return(
        <div style={{flex: itemObj.width, textAlign:"center", display: "flex", alignItems:"center", justifyContent: itemObj.justify}} key={index}>
          <div className="tableHeaderText">
            {itemObj.label}
          </div>
          <OrderBy
            value = {null}
            visible = {itemObj.orderby}
            handleChange = {()=>null}/>
        </div>
      );
    else
    return(
      <div style={{flex: itemObj.width,textAlign:"center", display: "flex", alignItems:"center", justifyContent:"center"}} key={index}>
          <Tooltip
            content={itemObj.tooltip}
            inline={false}
            position={Position.TOP}>
            <div className="cellLabel">
              {itemObj.label}
              <span className="pt-icon-standard pt-icon-help" style={{paddingLeft:"5px", color:"#cccccc"}}></span>
            </div>
          </Tooltip>
        <OrderBy
          value = {null}
          visible = {itemObj.orderby}
          handleChange = {()=>null}/>
      </div>
    );
  }

  renderRows(item, index){
    return(
      <ManageInventoryActiveRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="pt-control-group" style={{display:"flex"}}>
              <div style={{marginTop:10, marginRight: 10}}>
                <CheckboxWrapper>
                  Select All
                </CheckboxWrapper>
              </div>
              <button className="pt-button pt-intent-primary">Update Price</button>
              <button className="pt-button pt-intent-success">Update Quantity</button>
              <button className="pt-button pt-intent-danger">Mark unavailable</button>
            </div>
            <div>
              <LabelledSelect
                options={productCategories}

                validationState={true}
                validate={fieldValidations.noValidation}
                helpText={"Choose a valid state"}>
                Category
              </LabelledSelect>
            </div>
            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
            </div>
          </div>
        <br/>

        <div className="tableHeader">
          {this.tableHeaders.map(this.renderTableHeaders)}
        </div>

        <div className="tableRowCategoryName">
          Back Covers
        </div>

        {this.orders.map(this.renderRows)}

        <div id="react-paginate" className="tableRow">
          <ReactPaginate previousLabel={"previous"}
           nextLabel={"next"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}


class ManageInventoryInactiveRow extends Component{
  constructor(){
    super();
  }

  onChange(){
    return null;
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell" style={{flex:"1", justifyContent:"flex-start"}}>
          <div style={{marginBottom:"-10px"}}>
            <CheckboxWrapper>
            </CheckboxWrapper>
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:6}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            <PlainSelect style={{marginRight:0}}
              options={["10","20","30","40","50"]}
              value={this.props.value.qty}
              onChange={this.onChange}/>
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"2"}}>
          <div>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"6"}}>
          <div className="pt-button-group" style={{paddingRight: "10px", alignSelf:"center"}}>
            <button type="button" className="pt-button pt-intent-primary">Update Price</button>
            <button type="button" className="pt-button pt-intent-warning">Edit</button>
            <button type="button" className="pt-button pt-intent-success">Mark Available</button>
          </div>
        </div>

      </div>
    );
  }
}
ManageInventoryInactiveRow.propTypes = {
  value: React.PropTypes.object,
}


class ManageInventoryInactive extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Product Details", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Quantity", width: 2, tooltip: null, orderby: true, justify:"center"}, {label: "Price", width: 2, tooltip: "Marketplace Price", orderby: true, justify:"center"}, {label: "Margin", width: 2, tooltip: "Marketplace margin", orderby: true, justify:"center"}, {label: "S Price", width: 2, tooltip: "Selling Price", orderby: true, justify:"center"}, {label: " ", width: 6, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{productDetails:"Micromax Q392 IMD Graphic Black Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" },{productDetails:"Curved Tempered glass for Redmi Note 3", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" },{productDetails:"Lenovo Vibe X3 Cover Green", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
  }

  renderTableHeaders = (item,index) => {
    //assigning default values
    let itemObj = Object.assign({label: "<Label>", width: 1, tooltip: null, orderby: true, justify:"center"}, item);

    if(itemObj.tooltip === null)
      return(
        <div style={{flex: itemObj.width, textAlign:"center", display: "flex", alignItems:"center", justifyContent: itemObj.justify}} key={index}>
          <div className="tableHeaderText">
            {itemObj.label}
          </div>
          <OrderBy
            value = {null}
            visible = {itemObj.orderby}
            handleChange = {()=>null}/>
        </div>
      );
    else
    return(
      <div style={{flex: itemObj.width,textAlign:"center", display: "flex", alignItems:"center", justifyContent:"center"}} key={index}>
          <Tooltip
            content={itemObj.tooltip}
            inline={false}
            position={Position.TOP}>
            <div className="cellLabel">
              {itemObj.label}
              <span className="pt-icon-standard pt-icon-help" style={{paddingLeft:"5px", color:"#cccccc"}}></span>
            </div>
          </Tooltip>
        <OrderBy
          value = {null}
          visible = {itemObj.orderby}
          handleChange = {()=>null}/>
      </div>
    );
  }

  renderRows(item, index){
    return(
      <ManageInventoryInactiveRow value={item} key={index} />
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div className="pt-control-group" style={{display:"flex"}}>
              <div style={{marginTop:10, marginRight: 10}}>
                <CheckboxWrapper>
                  Select All
                </CheckboxWrapper>
              </div>
              <button className="pt-button pt-intent-primary">Update Price</button>
              <button className="pt-button pt-intent-warning">Update Quantity</button>
              <button className="pt-button pt-intent-success">Mark Active</button>
            </div>
            <div>
              <LabelledSelect
                options={productCategories}

                validationState={true}
                validate={fieldValidations.noValidation}
                helpText={"Choose a valid state"}>
                Category
              </LabelledSelect>
            </div>
            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
            </div>
          </div>
        <br/>

        <div className="tableHeader">
          {this.tableHeaders.map(this.renderTableHeaders)}
        </div>

        <div className="tableRowCategoryName">
          Back Covers
        </div>

        {this.orders.map(this.renderRows)}

        <div id="react-paginate" className="tableRow">
          <ReactPaginate previousLabel={"previous"}
           nextLabel={"next"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}

class ManageInventory extends Component{

  constructor(){
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
    this.tabs = ["Active","Inactive"];
    this.tabPanels = [ ManageInventoryActive, ManageInventoryInactive];
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
            {this.tabs.map(this.renderTabs)}
          </TabList>
          {this.tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }
}

export default ManageInventory;
