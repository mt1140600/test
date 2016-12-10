import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class PaymentOverviewRow extends Component{
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
      <div key={index} style={{}}>{index}. {item}</div>
    );
  }

  render(){
    return(
      <div className="tableRow" style={{display:"flex"}}>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.paymentType}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.amount}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <button type="button" className="pt-button">Details</button>
        </div>

      </div>
    );
  }
}

PaymentOverviewRow.propTypes = {
  value: React.PropTypes.object,
}

export default PaymentOverviewRow;
