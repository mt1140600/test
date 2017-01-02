import React, {Component} from 'react';
import {Overlay, Button, RadioGroup, Radio} from "@blueprintjs/core";
import {DateInput, TimePicker} from '@blueprintjs/datetime'
import LabelledTextInput from './LabelledTextInput';

class ChangeQuantity extends Component{

  constructor(){
    super();
    this.state= {isOpen: false, reason: "one"};
  }

  toggleOverlay = () => {
      this.setState({isOpen: !this.state.isOpen });
  }

  handleReasonChange = (event) => {
    this.setState({reason: event.target.value});
  }

  handleDateChange = () => {

  }

  render(){
    return(
      <div>
          <Button text="Show overlay" onClick={this.toggleOverlay} />
          <Overlay isOpen={this.state.isOpen} onClose={this.toggleOverlay} hasBackdrop={true}>
            <div className="pt-card pt-elevation-5 docs-overlay-example-transition pt-overlay-content flexCol ordersModal">
                <h3 style={{fontWeight: "lighter"}}>Change Quantity</h3>
                <br/>

                <div className="pt-input-group" style={{width: 150}}>
                  <button className="pt-button pt-intent-danger pt-icon-minus"></button>
                  <input className="pt-input" style={{textAlign: "center"}}/>
                  <button className="pt-button pt-intent-primary pt-icon-plus"></button>
                </div>
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
                      helpText = "Enter a valid amount in rupees">
                      Enter the new price:
                    </LabelledTextInput>
                    :
                    (this.state.reason === "three")?
                      <div className="flexRow">
                        <div style={{flex: 1}}>Next operational from: </div>
                        <div style={{flex: 1, display: "flex", justifyContent: "flex-end", flexWrap:"wrap"}}>
                          <div>
                            <DateInput format="DD-MM-YYYY"/>
                          </div>
                          <div  style={{marginRight: -10, marginTop: 2}}>
                            <TimePicker />
                          </div>
                        </div>
                      </div>
                      :
                      null
                }
                <br/>
                <Button className="pt-intent-primary" onClick={this.toggleOverlay}>Confirm</Button>
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

export default ChangeQuantity;
