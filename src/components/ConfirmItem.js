import React, {Component} from 'react';
import {Overlay, Button, Intent} from "@blueprintjs/core";
import CheckboxWrapper from './CheckboxWrapper';

class ConfirmItem extends Component{
  constructor(){
    super();
    this.state= {isOpen: false};
  }

  toggleOverlay = () => {
      this.setState({isOpen: !this.state.isOpen });
  }

  render(){
    return(
      <div>
          <Button text="Confirm" intent={0} onClick={this.toggleOverlay} />

          <Overlay isOpen={this.state.isOpen} onClose={this.toggleOverlay} hasBackdrop={true}>
            <div className="pt-card pt-elevation-5 docs-overlay-example-transition pt-overlay-content flexCol ordersModal" style={{alignItems: "flex-start"}}>
              <br/>
              <div style={{textAlign: "justify"}}>
                Once Items are confirmed, cancelling them may incur a penalty. Please check the availability of the items before confirming it.
              </div>
              <br/>
              <CheckboxWrapper>
                Do not show this again
              </CheckboxWrapper>
              <br/>
              <Button className="pt-intent-primary" style={{ alignSelf: "center"}} onClick={this.toggleOverlay} >Confirm</Button>
            </div>
          </Overlay>
    </div>
    );
  }
}

export default ConfirmItem;
