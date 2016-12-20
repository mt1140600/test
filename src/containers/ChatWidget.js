import React, {Component} from 'react';
// var VelocityComponent = require('velocity-react/velocity-component');
// var VelocityTransitionGroup = require('velocity-react/velocity-transition-group');
import { VelocityTransitionGroup } from 'velocity-react';
require('velocity-animate');
require('velocity-animate/velocity.ui');


class ChatMessage extends Component{
  render(){
    let dynamicClassName = (this.props.from === "user")? "messageUser" : "messageAdmin";
    return(
      <div className={"chatMessageWrapper "+dynamicClassName}>
        <div className={"chatMessage "+dynamicClassName} style={{display: "inline-block"}}>
            {this.props.children}
        </div>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  children: React.PropTypes.node,
  from: React.PropTypes.string
}


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
            <ChatMessage
              from="user">
              Hi!
            </ChatMessage>
            <ChatMessage
              from="admin">
              Hey! How can I help you?
            </ChatMessage>

            <div style={{position:"absolute", left: 0, bottom: 0, width: "100%"}}>
              <textarea style={{width: "100%"}}></textarea>
            </div>
          </div>
        </VelocityTransitionGroup>:
        null}
      </div>


    );
  }
}

export default ChatWidget;
