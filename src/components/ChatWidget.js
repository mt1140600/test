import React, {Component} from 'react';
// var VelocityComponent = require('velocity-react/velocity-component');
// var VelocityTransitionGroup = require('velocity-react/velocity-transition-group');
import { VelocityTransitionGroup } from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');

class ChatWidget extends Component{
  constructor(){
    super();
    this.state = {active: false};
  }
  render(){
    return(
      <div>
        <div id = "chatWidget" onClick={()=>{console.log(this.state.active);this.setState({active: !this.state.active})}}>
          <span className="pt-icon-large pt-icon-chat" style={{color:"white"}}></span>
        </div>
        {this.state.active?
        <VelocityTransitionGroup key={1} enter={{animation: "transition.slideUpBigIn", duration: 300}} leave={{animation: ""}} runOnMount >
          <div id="chatBox">
            This is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat boxThis is dummy text that will appear in the chat box
          </div>
        </VelocityTransitionGroup>:
        null}
      </div>


    );
  }
}

export default ChatWidget;
