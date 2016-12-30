/* eslint-disable */
import React, {Component} from 'react';
import { Position, Tooltip } from "@blueprintjs/core";
import OrderBy from "./OrderBy";

class TableHeaders extends Component {
  render() {
    var test = this.props.tableHeaders.map((item, index) => {
      let itemObj = Object.assign({label: "<Label>", width: 1, tooltip: null, orderby: true, justify:"center"}, item);
      return(
        <div style={{flex: itemObj.width, textAlign:"center", display: "flex", alignItems:"center", justifyContent:itemObj.justify}} key={index}>
          {itemObj.tooltip ?
          <Tooltip
            content={itemObj.tooltip}
            inline={false}
            position={Position.TOP}>
            <div className="cellLabel" style={{textDecoration:'underline'}}>
              {itemObj.label}
            </div>
          </Tooltip> :
          <div className="tableHeaderText">
            {itemObj.label}
          </div>
        }
        <OrderBy
          value = {null}
          visible = {itemObj.orderby}
          handleChange = {()=>null}/>
      </div>
      )
    });
    return(
      <div className="tableHeader" style={{fontSize:'11px'}}>
        {test}
      </div>
    )
  }
}

export default TableHeaders;
