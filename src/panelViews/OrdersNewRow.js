import React, {Component} from 'react';
import PlainSelect from '../components/PlainSelect';
import CheckboxWrapper from '../components/CheckboxWrapper';

class OrdersNewRow extends Component{
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

        <div className="tableRowCell singleLine">
          <CheckboxWrapper>
          </CheckboxWrapper>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.productDetails}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            <PlainSelect style={{marginRight:0}}
              options={["10","20","30","40","50"]}
              value={this.props.value.qty}
              onChange={this.onChange}/>
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplacePrice}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.marketplaceMargin}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div style={{width:"110px"}}>
            {this.props.value.sellingPrice}
          </div>
        </div>

        <div className="tableRowCell singleLine">
          <div className="pt-button-group pt-vertical" style={{paddingRight: "10px", alignSelf:"center"}}>
            <button type="button" className="pt-button pt-active">Confirm Item</button>
            <button type="button" className="pt-button">Reject Item</button>
          </div>
        </div>

      </div>
    );
  }
}

OrdersNewRow.propTypes = {
  value: React.PropTypes.object,
}

export default OrdersNewRow;
