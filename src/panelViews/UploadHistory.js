import React, {Component} from 'react';
import {Tabs, TabList, Tab, TabPanel} from "@blueprintjs/core";
import CheckboxWrapper from '../components/CheckboxWrapper';
import LabelledSelect from '../components/LabelledSelect';
import {productCategories} from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
import ReactPaginate from 'react-paginate';
import PlainSelect from '../components/PlainSelect';
import TableHeaders from '../components/TableHeaders';
import DateRangePopover from '../components/DateRangePopover';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/uploadHistory';
import moment from 'moment';
import deepEqual from 'deep-equal';

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
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: true, justify:"center"}];
    this.uploads=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
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
            <input className="pt-input" type="search" placeholder="Search" dir="auto" />
          </div>
        </div>
        <br/>

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.uploads.map(this.renderRows)}

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
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: true, justify:"center"}];
    this.uploads=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
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
            <input className="pt-input" type="search" placeholder="Search" dir="auto" />
          </div>
        </div>
        <br/>

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.uploads.map(this.renderRows)}

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
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Reason for Rejection", width: 4, tooltip: null, orderby: false, justify:"center"}];
    this.uploads=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30", reason:"Cuz I can" }];
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
            <input className="pt-input" type="search" placeholder="Search" dir="auto" />
          </div>
        </div>
        <br/>

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.uploads.map(this.renderRows)}

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
    this.state = {dateRange: [null, null]};
    this.tableHeaders = [{label: "#", width: 1, tooltip: null, orderby: false, justify:"flex-start"}, {label: "Name", width: 8, tooltip: null, orderby: true, justify:"flex-start"}, {label: "Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Sub Category", width: 4, tooltip: null, orderby: true, justify:"center"}, {label: "Upload Date", width: 4, tooltip: null, orderby: true, justify:"center"}];
    this.uploads=[{name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }, {name:"Micromax Q392 IMD Graphic Black Cover", category:"Back Cover", subCategory:"??", uploadDate:"2017-02-02 20:53:19.722+05:30" }];
  }

  componentDidMount(){
    //                   sellerId, type, orderBy, from, to, category, search_text, page
    this.props.fetchUploads(1, "uploaded", null, null, null, "", "", 1);
  }

  componentWillReceiveProps(nextProps){
    console.log("Uploaded componentWillReceiveProps");
    console.log("uploadHistoryData:", nextProps.uploadHistoryData);
    if(!deepEqual(this.props.uploadHistoryData.searchSpecs, nextProps.uploadHistoryData.searchSpecs)){
      console.log("fetching new data");
      this.props.fetchUploads(1, "uploaded", nextProps.uploadHistoryData.searchSpecs.orderBy, nextProps.uploadHistoryData.searchSpecs.from, nextProps.uploadHistoryData.searchSpecs.to, nextProps.uploadHistoryData.searchSpecs.category, nextProps.uploadHistoryData.searchSpecs.search_text, nextProps.uploadHistoryData.searchSpecs.page);
    }
    else{
      console.log("rendering new rows");
      console.log(nextProps.uploadHistoryDataData.uploads);
      this.uploads = nextProps.uploadHistoryData.uploads.rows.map(this.setRowData);
      if(this.selectedRows > 0 && this.countRows > this.selectedRows) this.setState({ indeterminate: true });
      if(this.countRows === this.selectedRows) this.setState({ selectAll: true });
      // console.log("temp is ", temp);
    }
  }

  setRowData = (item, index) => {
    // this.orders=[{productDetails:"Micromax Q -Pad Cover", qty:"40", marketplacePrice:"40", marketplaceMargin:"10%", sellingPrice:"36" }];
    this.countRows++;
    if(item.selected === true) this.selectedRows++;
    return ({
      id: item.id,
      productDetails: { name: item.Product.name, image: item.Product.image },
      index: index
    });
  }

  renderRows(item, index){
    return(
      <UploadedRow value={item} key={index} index={index}/>
    );
  }

  handleDateSelected = (dateRange) => {
    this.setState({dateRange});
    this.props.setSearchSpecs({
      from: moment.utc(dateRange[0]).format(),
      to: moment.utc(dateRange[1]).format(),
      page: 1
    });
  }

  render(){
    console.log("history props", this.props);
    return(
      <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#f6f8f8", border: "1px solid #DEE5E7"}}>
          <DateRangePopover
            dateRange = {this.state.dateRange}
            onSelect = {this.handleDateSelected} />

          <LabelledSelect
            options={productCategories}
            onChange={this.handleCategory}
            value = {this.state.category}
            validationState={true}
            validate={fieldValidations.noValidation}
            helpText={""}
            style={{marginBottom: 0}}/>

            <div className="pt-input-group .modifier">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Search" dir="auto" value={this.state.searchText} onChange={this.handleSearchText} onKeyUp={this.handleSearch}/>
            </div>
        </div>
        <br/>

        <TableHeaders tableHeaders={this.tableHeaders} />

        {this.uploads.map(this.renderRows)}

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

const mapStatetoProps = (state) => {
  return{
    uploadHistoryData: state.uploadHistoryData,
    userData: state.userData
  }
}

const mapDisptachToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

Uploaded = connect(mapStatetoProps, mapDisptachToProps)(Uploaded);

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
