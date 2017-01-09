/* eslint-disable */
import React, {Component} from 'react';
import { Position, Tooltip } from "@blueprintjs/core";
import OrderByWidget from "./OrderByWidget";

class TableHeader extends Component{

    constructor(){
      super();
      this.state = {order: 0};
    }

    handleClick = () => {
      this.setState((prevState) => {
        if(prevState.order === 0){
          return { order: 1 };
        }
        else if(prevState.order === 1){
          return { order: 2 };
        }
        else if(prevState.order === 2){
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
        <div style={{flex: itemObj.width, textAlign:"center", display: "flex", alignItems:"center", justifyContent:itemObj.justify}} key={index}>
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
              <div className="tableHeaderText" onClick={this.handleClick}>
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

TableHeader.propTypes = {
  itemObj: React.PropTypes.object,
  index: React.PropTypes.number
}



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
      <div className="tableHeader" style={{fontSize:'11px'}}>
        {headers}
      </div>
    )
  }

}

TableHeaders.propTypes = {
    tableHeaders: React.PropTypes.array
}

export default TableHeaders;
