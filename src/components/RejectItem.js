import React, {Component} from 'react';
import {Overlay, Button, RadioGroup, Radio} from "@blueprintjs/core";
import {DateInput} from '@blueprintjs/datetime'
import LabelledTextInput from './LabelledTextInput';
import PlainSelect from '../components/PlainSelect';
import {validatePositiveNumber} from '../utils/fieldValidations';
import {operationalHours2} from '../constants';
import moment from "moment";
// window.moment = require('moment');

class RejectItem extends Component{

  constructor(){
    super();
    this.state= {isOpen: false, reason: "one", newPrice: "", date:"", time:"8:30", ampm:"am", newPriceVState: null};
  }

  componentDidMount(){
    this.setState({ date: moment().toDate() }); //using moment().toDate() instead of Date() because it throws deprecation warning
  }


  toggleOverlay = () => {
      this.setState({isOpen: !this.state.isOpen });
  }

  handleReasonChange = (event) => {
    this.setState({reason: event.target.value});
  }


  handleConfirm = () => {
    //Combining all date components into one
    let date;
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
          this.setState({ newPriceVState: false })
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
  }

  handleNewPriceChange = (newValue, newVState) => {
      this.setState({ newPrice: newValue });
      this.state.newPriceVState = newVState;
  }

  render(){
    return(
      <div>
          <button className="pt-button pt-intent-danger" onClick={this.toggleOverlay}>
            Reject
          </button>
          <Overlay isOpen={this.state.isOpen} onClose={this.toggleOverlay} hasBackdrop={true}>
            <div className="pt-card pt-elevation-5 docs-overlay-example-transition pt-overlay-content flexCol ordersModal">
              <h3 style={{fontWeight: "lighter"}}>Reject Item</h3>
              <br/>

                <RadioGroup
                    label="Reason for unavailability of items:"
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
                <Button className="pt-intent-danger" onClick={this.handleConfirm}>Proceed</Button>
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

export default RejectItem;
