import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../fieldValidations';
import ReactPaginate from 'react-paginate';
import PanelHeader from "../components/PanelHeader";
import PlainSelect from '../components/PlainSelect';


class ManageInventoryActiveRow extends Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(){
    return null;
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell singleLine">
          <CheckboxWrapper>
            Select All
          </CheckboxWrapper>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <PlainSelect
            options={["10","20","30","40","50"]}
            value={this.props.value.qty}
            onChange={this.onChange}/>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div className="pt-button-group pt-vertical" style={{paddingRight: "10px"}}>
            <button type="button" className="pt-button pt-active">Update Price</button>
            <button type="button" className="pt-button">Edit Product Details</button>
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
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["#","Product Details", "Qty", "Marketplace Price", "Marketplace Margin", "Selling Price",""];
    this.orders=[{productDetails:"Micromax Q114928102 erkgkerg", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
  }

  renderCellLabels(item,index){
    return(
      <div style={{flex:1,textAlign:"center"}} key={index}>
        <div className="cellLabel">
          {item}
        </div>
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
        <div style={{display:"flex", justifyContent:"space-around"}}>
            <div className="pt-control-group" style={{display:"flex"}}>
              <div style={{marginTop:10, marginRight: 10}}>
                <CheckboxWrapper>
                  Select All
                </CheckboxWrapper>
              </div>
              <button className="pt-button">Update Price</button>
              <button className="pt-button">Update Quantity</button>
              <button className="pt-button">Mark unavailable</button>
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
            <div>
              <div className="pt-input-group .modifier">
                <span className="pt-icon pt-icon-search"></span>
                <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
              </div>
            </div>
          </div>
        <br/>
        <br/>
        <div style={{display:"flex"}}>
          {this.cellLabels.map(this.renderCellLabels)}
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
      this.onChange = this.onChange.bind(this);
    }

    onChange(){
      return null;
    }

    render(){
      return(
        <div className="tableRow" style={{display:"flex"}}>

          <div className="tableRowCell singleLine">
            <CheckboxWrapper>
              Select All
            </CheckboxWrapper>
          </div>

          <div className="tableRowCell singleLine">
            <div style={{width:"110px"}}>
              {this.props.value.productDetails}
            </div>
          </div>

          <div className="tableRowCell singleLine">
            <PlainSelect
              options={["10","20","30","40","50"]}
              value={this.props.value.qty}
              onChange={this.onChange}/>
          </div>

          <div className="tableRowCell singleLine">
            <div style={{width:"110px"}}>
              {this.props.value.marketplacePrice}
            </div>
          </div>

          <div className="tableRowCell singleLine">
            <div style={{width:"110px"}}>
              {this.props.value.marketplaceMargin}
            </div>
          </div>

          <div className="tableRowCell singleLine">
            <div style={{width:"110px"}}>
              {this.props.value.sellingPrice}
            </div>
          </div>

          <div className="tableRowCell singleLine">
            <div className="pt-button-group pt-vertical" style={{paddingRight: "10px"}}>
              <button type="button" className="pt-button pt-active">Update Price</button>
              <button type="button" className="pt-button">Mark Active</button>
            </div>
          </div>

        </div>
      );
    }
}


class ManageInventoryInactive extends Component{
  constructor(){
    super();
    this.renderCellLabels = this.renderCellLabels.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.cellLabels = ["#","Product Details", "Qty", "Marketplace Price", "Marketplace Margin", "Selling Price",""];
    this.orders=[{productDetails:"Micromax Q114928102 erkgkerg", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
  }

  renderCellLabels(item,index){
    return(
      <div style={{flex:1,textAlign:"center"}} key={index}>
        <div className="cellLabel">
          {item}
        </div>
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
        <div style={{display:"flex", justifyContent:"space-around"}}>
          <div className="pt-control-group" style={{display:"flex"}}>
            <div style={{marginTop:10, marginRight: 10}}>
              <CheckboxWrapper>
                Select All
              </CheckboxWrapper>
            </div>
            <button className="pt-button">Update Price</button>
            <button className="pt-button">Update Quantity</button>
            <button className="pt-button">Mark Active</button>
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
          <div>
            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search input" dir="auto" />
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <div style={{display:"flex"}}>
          {this.cellLabels.map(this.renderCellLabels)}
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
        <PanelHeader />
        <Tabs className="tabs " key="horizontal">
          <TabList className="tabsBar">
            {this.tabs.map(this.renderTabs)}
          </TabList>
          {this.tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }
}

export default ManageInventory;
