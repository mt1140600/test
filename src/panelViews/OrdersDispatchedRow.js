import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class OrdersDispatchedRow extends Component{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.splitArrayIntoLines = this.splitArrayIntoLines.bind(this);
  }

  onChange(){
    return null;
  }

  splitArrayIntoLines(item, index){
    return(
      <div key={index} style={{paddingBottom:"5px"}}>{index+1}. {item}</div>
    );
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.date}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.dispatchID}
          </div>
        </div>

        <div className="tableRowCell">
          <div style={{width:"110px", display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            {this.props.value.items.map(this.splitArrayIntoLines)}
          </div>
        </div>

        <div className="tableRowCell">
          <div style={{width:"110px", display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            {this.props.value.qty.map(this.splitArrayIntoLines)}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.dispatchPartner}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.status}
          </div>
        </div>

      </div>
    );
  }
}

OrdersDispatchedRow.propTypes = {
  value: React.PropTypes.object,
}

export default OrdersDispatchedRow;
