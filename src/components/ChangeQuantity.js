import React, {Component} from 'react';
import {Overlay, Button, RadioGroup, Radio} from "@blueprintjs/core";
import {DateInput} from '@blueprintjs/datetime'
import LabelledTextInput from './LabelledTextInput';
import PlainSelect from '../components/PlainSelect';
import {validatePositiveNumber} from '../utils/fieldValidations';
import {operationalHours2} from '../constants';
import moment from "moment";
// window.moment = require('moment');

class ChangeQuantity extends Component{

  constructor(){
    super();
    this.state= {isOpen: false, reason: "one", quantity: 0, newPrice: "", date:"", time:"8:30", ampm:"am", newPriceVState: null};
    // this.newPriceVState = null;
  }

  componentDidMount(){
    this.setState({ quantity: this.props.quantity, date: moment().toDate() }); //using moment().toDate() instead of Date() because it throws deprecation warning
  }

  componentWillReceiveProps(nextProps){
    this.setState({ quantity: nextProps.quantity});
  }

  toggleOverlay = () => {
      this.setState({isOpen: !this.state.isOpen });
  }

  handleReasonChange = (event) => {
    this.setState({reason: event.target.value});
  }

  onQuantityChange = (value) => {
    this.setState({ quantity: value });
  }

  getQuantityDropdown = (maxValue) => {
    let values = [];
    for(let i = 1; i <= maxValue; i++){
      values.push(i);
    }
    return values;
  }

  handleConfirm = () => {
    //Combining all date components into one
    let date = null;
    switch (this.state.reason) {
      case "one":
        //Post callwith reason: "Item is not available"
        this.toggleOverlay();
      break;

      case "two":
        if(this.state.newPriceVState){
          //Post call with reason: "Item price has increased"
          this.toggleOverlay();
        }
        else{
          this.setState({ newPriceVState: false });
        }
      break;

      case "three":
        date = moment(this.state.date).format("DD-MM-YYYY h:mm a");
        date = date.split(" ");
        date[1] = this.state.time;
        date[2] = this.state.ampm;
        date = date.join(" ");
        console.log(moment(date, "DD-MM-YYYY h:mm a").toDate());
        this.toggleOverlay();
      break;

      default:
        console.log("Something went wrong!");
      break;
    }

      //TODO: Make post call for confirmed items
      //TODO: Make post call for rejected items
  }

  handleNewPriceChange = (newValue, newVState) => {
      this.setState({ newPrice: newValue, newPriceVState: newVState });
      // this.newPriceVState = newVState;

  }

  render(){
    return(
      <div>
          <button className="pt-button" onClick={this.toggleOverlay}>
            {this.props.quantity}
            <span className="pt-icon-standard pt-icon-edit pt-align-right"></span>
          </button>
          <Overlay isOpen={this.state.isOpen} onClose={this.toggleOverlay} hasBackdrop={true}>
            <div className="pt-card pt-elevation-5 docs-overlay-example-transition pt-overlay-content flexCol ordersModal">
                <h3 style={{fontWeight: "lighter"}}>Change Quantity</h3>
                <br/>

                {/* <div className="pt-input-group" style={{width: 150}}>
                  <button className="pt-button pt-intent-danger pt-icon-minus"></button>
                  <input className="pt-input" style={{textAlign: "center"}}/>
                  <button className="pt-button pt-intent-primary pt-icon-plus"></button>
                </div>
                <br/> */}

                <PlainSelect style={{marginRight:0}}
                  options={this.getQuantityDropdown(this.props.quantity)}
                  value={this.state.quantity}
                  onChange={this.onQuantityChange}
                />
                <br/>

                <RadioGroup
                    label="Reason for change in quantity:"
                    onChange={this.handleReasonChange}
                    selectedValue={this.state.reason}
                >
                    <Radio label="Item is not available" value="one" />
                    <Radio label="Item price has increased" value="two" />
                    <Radio label="Warehouse is closed" value="three" />
                </RadioGroup>

                {
                  (this.state.reason === "two")?
                    <LabelledTextInput
                      value={this.state.newPrice}
                      onChange={this.handleNewPriceChange}
                      validate = {validatePositiveNumber}
                      validationState = {this.state.newPriceVState}
                      helpText = "Value in ₹. Example: 40">
                      Enter the new price:
                    </LabelledTextInput>
                    :
                    (this.state.reason === "three")?
                      <div className="flexRow">
                        <div style={{flex: 1}}>Next operational from: </div>
                        <div style={{flex: 1, display: "flex", justifyContent: "flex-end", flexWrap:"wrap"}}>
                          <div>
                            <DateInput format="DD-MM-YYYY"
                              value = {this.state.date}
                              onChange = { (value) => { console.log(value); this.setState({ date: value}); } }
                            />
                          </div>
                          <div  style={{marginTop: 2, flex: 1, display: "flex", justifyContent: "space-around"}}>

                            {/* TODO: Check blueprint for better TimePicker */}

                            <PlainSelect style={{marginRight:0, backgroundColor: "white"}}
                              options={operationalHours2}
                              value={ this.state.time }
                              onChange = { (value) => { this.setState({time: value }) } }
                            />

                            <PlainSelect style={{marginRight:0,  backgroundColor: "white"}}
                              options={['AM', 'PM']}
                              value={ this.state.ampm }
                              onChange = { (value) => { this.setState({ampm: value}) }  }
                            />

                          </div>
                        </div>
                      </div>
                      :
                      null
                }
                <br/>
                <Button className="pt-intent-primary" onClick={this.handleConfirm}>Confirm</Button>
                <br/>
                <div style={{fontStyle: "italic", fontSize: "small", color: "grey", borderTop: "1px solid grey"}}>
                  <div style={{marginTop: 4}}>Note:</div>
                  <ol>
                    <li>
                      Items that are not available will automatically be marked out of stock. They will have to be marked live again to receive further orders.
                    </li>
                    <li>
                      Items for which price have been updated will automatically be reflected from the next order.
                    </li>
                  </ol>
                </div>
            </div>
          </Overlay>
      </div>
    );
  }

}

ChangeQuantity.propTypes = {
    quantity: React.PropTypes.number,
    // handleChange: React.PropTypes.func
}

export default ChangeQuantity;
