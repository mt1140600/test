import React, {Component} from 'react';
import PanelHeader from "../components/PanelHeader";

class Orders extends Component{

  constructor(){
    super();
  }

  render(){
    return(
        <div>
          <PanelHeader/>
          Orders
        </div>
    );
  }
}

export default Orders;
