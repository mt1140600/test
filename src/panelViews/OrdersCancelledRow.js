import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class OrdersCancelledRow extends Component{
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

        <div  className="tableRowCell singleLine">
          <CheckboxWrapper>
            Select All
          </CheckboxWrapper>
        </div>

        <div  className="tableRowCell singleLine">
          <div   style={{width:"110px" }}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div  className="tableRowCell singleLine">
          <PlainSelect
            options={["10","20","30","40","50"]}
            value={this.props.value.qty}
            onChange={this.onChange}/>
        </div>

        <div  className="tableRowCell singleLine">
          <div   style={{width:"110px" }}>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div  className="tableRowCell singleLine">
          <div   style={{width:"110px" }}>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div  className="tableRowCell singleLine">
          <div   style={{width:"110px" }}>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div  className="tableRowCell singleLine">
          <div   style={{width:"110px" }}>
            {this.props.value.reasonForCancellation}
          </div>
        </div>

      </div>
    );
  }
}

OrdersCancelledRow.propTypes = {
  value: React.PropTypes.object,
}

export default OrdersCancelledRow;
