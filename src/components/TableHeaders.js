/* eslint-disable */
import React, {Component} from 'react';
import { Position, Tooltip } from "@blueprintjs/core";
import OrderByWidget from "./OrderByWidget";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/orderManagement';

class TableHeader extends Component{

    constructor(){
      super();
      this.state = {order: 0};
    }

    handleClick = () => {
      this.setState((prevState) => {
        if(prevState.order === 0){
          this.props.setSearchSpecs({
            orderBy:  `${this.props.itemObj.filter_name} DESC`
          });
          return { order: 1 };
        }
        else if(prevState.order === 1){
          this.props.setSearchSpecs({
            orderBy:  `${this.props.itemObj.filter_name} ASC`
          });
          return { order: 2 };
        }
        else if(prevState.order === 2){
          this.props.setSearchSpecs({
            orderBy:  `${this.props.itemObj.filter_name} DESC`
          });
          return { order: 1 };
        }
        else {
          return { order : 0 };
        }
      });
    }

    render(){
      let itemObj = this.props.itemObj;
      let index = this.props.index;
      return(
        <div style={{flex: itemObj.width, cursor: "pointer", textAlign:"center", display: "flex", alignItems:"center", justifyContent:itemObj.justify}} key={index}>
          {
            itemObj.tooltip ?
              <Tooltip
                content={itemObj.tooltip}
                inline={false}
                position={Position.TOP}>
                <div className="cellLabel" style={{textDecoration:'underline'}} onClick={this.handleClick}>
                  {itemObj.label}
                </div>
              </Tooltip>
              :
              <div className="tableHeaderText noSelect" onClick={this.handleClick}>
                {itemObj.label}
              </div>
          }
          <OrderByWidget
            value = {this.state.order}
            visible = {itemObj.orderby}
            handleChange = {this.handleClick}/>
        </div>
      );
    }
}

const mapDisptachToProps = (dispatch) => {
  return bindActionCreators({
    setSearchSpecs: actions.setSearchSpecs
  }, dispatch);
}

TableHeader.propTypes = {
  itemObj: React.PropTypes.object,
  index: React.PropTypes.number
}

TableHeader = connect(null, mapDisptachToProps)(TableHeader);



class TableHeaders extends Component {

  render() {
    var headers = this.props.tableHeaders.map((item, index) => {
      let itemObj = Object.assign({label: "<Label>", width: 1, tooltip: null, orderby: true, justify:"center"}, item);
      return(
        <TableHeader
          itemObj={itemObj}
          index={index}
          key={index} />
      )
    });
    return(
      <div className="tableHeader" style={{fontSize:'11px', backgroundColor: "whitesmoke" }}>
        {headers}
      </div>
    )
  }

}

TableHeaders.propTypes = {
    tableHeaders: React.PropTypes.array
}

export default TableHeaders;
