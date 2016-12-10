import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class CompletedOrdersRow extends Component{
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
            {this.props.value.date}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.numberItems}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.totalAmount}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplaceMarginAvg}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplaceMarginRS}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.finalPayment}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <button type="button" className="pt-button">Default button</button>
        </div>

      </div>
    );
  }
}

CompletedOrdersRow.propTypes = {
  value: React.PropTypes.object,
}

export default CompletedOrdersRow;
