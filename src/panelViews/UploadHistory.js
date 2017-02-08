import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import PlainSelect from '../components/PlainSelect';
import TableHeaders from '../components/TableHeaders';


class UnderProcessingRow extends Component{
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
          <div>
            {this.props.index + 1}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:7}}>
            {this.props.value.name}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.category}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.subCategory}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {moment(this.props.value.uploadDate).format("DD-MMM-YYYY")}
          </div>
        </div>

      </div>
    );
  }
}

UnderProcessingRow.propTypes = {
  value: React.PropTypes.object,
  index: React.PropTypes.number
}


class UnderProcessing extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
  }

  renderRows(item, index){
    return(
      <UnderProcessingRow value={item} key={index} index={index}/>
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
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

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.orders.map(this.renderRows)}

        <div id="react-paginate">
          <ReactPaginate previousLabel={"<"}
           nextLabel={">"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={2}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}

//------------------------------------------------------------------------------

class AcceptedRow extends Component{
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
          <div>
            {this.props.index + 1}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:7}}>
            {this.props.value.name}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.category}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.subCategory}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {moment(this.props.value.uploadDate).format("DD-MMM-YYYY")}
          </div>
        </div>

      </div>
    );
  }
}

AcceptedRow.propTypes = {
  value: React.PropTypes.object,
  index: React.PropTypes.number
}


class Accepted extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
  }

  renderRows(item, index){
    return(
      <AcceptedRow value={item} key={index} index={index}/>
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
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

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.orders.map(this.renderRows)}

        <div id="react-paginate">
          <ReactPaginate previousLabel={"<"}
           nextLabel={">"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={2}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}

//------------------------------------------------------------------------------

class RejectedRow extends Component{
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
          <div>
            {this.props.index + 1}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:7}}>
            {this.props.value.name}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.category}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.subCategory}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {moment(this.props.value.uploadDate).format("DD-MMM-YYYY")}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.reason}
          </div>
        </div>

      </div>
    );
  }
}

RejectedRow.propTypes = {
  value: React.PropTypes.object,
  index: React.PropTypes.number
}

class Rejected extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: false, justify:"center"}, {label: "Reason for Rejection", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }];
  }

  renderRows(item, index){
    return(
      <RejectedRow value={item} key={index} index={index}/>
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
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

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.orders.map(this.renderRows)}

        <div id="react-paginate">
          <ReactPaginate previousLabel={"<"}
           nextLabel={">"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={2}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}

//------------------------------------------------------------------------------

class UploadedRow extends Component{
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
          <div>
            {this.props.index + 1}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"8", justifyContent:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{width:"40px", height:"40px", backgroundColor:"#7fdc88", borderRadius:"4px"}}/>
          </div>
          <div  style={{flex:7}}>
            {this.props.value.name}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.category}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {this.props.value.subCategory}
          </div>
        </div>

        <div className="tableRowCell" style={{flex:"4"}}>
          <div>
            {moment(this.props.value.uploadDate).format("DD-MMM-YYYY")}
          </div>
        </div>

      </div>
    );
  }
}

UploadedRow.propTypes = {
  value: React.PropTypes.object,
  index: React.PropTypes.number
}


class Uploaded extends Component{

  constructor(){
    super();
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.orders=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
  }

  renderRows(item, index){
    return(
      <UploadedRow value={item} key={index} index={index}/>
    );
  }

  render(){
    return(
      <div>
        <br/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
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

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.orders.map(this.renderRows)}

        <div id="react-paginate">
          <ReactPaginate previousLabel={"<"}
           nextLabel={">"}
           breakLabel={<a href="">...</a>}
           breakClassName={"break-me"}
           pageCount={10}
           marginPagesDisplayed={2}
           pageRangeDisplayed={2}
           onPageChange={()=>null}
           containerClassName={"pagination"}
           subContainerClassName={"pages pagination"}
           activeClassName={"active"} />
         </div>
       </div>

    );
  }

}


class UploadHistory extends Component{

  constructor(){
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabPanels = this.renderTabPanels.bind(this);
    this.tabs = ["Uploaded", "Accepted", "Rejected", "Under Processing"];
    this.tabPanels = [ Uploaded, Accepted, Rejected, UnderProcessing ];
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
        <Tabs className="tabs" key="horizontal">
          <TabList className="pt-large">
            {this.tabs.map(this.renderTabs)}
          </TabList>
          {this.tabPanels.map(this.renderTabPanels)}
        </Tabs>
      </div>
    );
  }

}

export default UploadHistory;
