import React, {Component} from 'react';
// var VelocityComponent = require('velocity-react/velocity-component');
// var VelocityTransitionGroup = require('velocity-react/velocity-transition-group');
import { VelocityTransitionGroup } from 'velocity-react';
import * as firebase from 'firebase';
require('velocity-animate');
require('velocity-animate/velocity.ui');
import { FocusStyleManager } from "@blueprintjs/core";
import {cloudinaryCloudName, cloudinaryChatUploadPreset} from '../constants';

FocusStyleManager.onlyShowFocusOnTabs();

class ChatMessage extends Component{

  constructor(){
      super();
      this.state = {messageType: "plain"};
  }

  checkMessageType = (url) => {
    let messageType = "plain";
    const array1 = url.split("://");
    const array2 = url.split(".");

    if(array1[0] === "http" || array1[0] === "https") messageType = "link";
    if(array2[array2.length - 1] === "png" || array2[array2.length - 1] === "jpg" || array2[array2.length - 1] === "jpeg" || array2[array2.length - 1] === "bmp"){
      if(messageType === "link")
        messageType = "image";
    }
    return messageType;
  }

  componentDidMount(){
    console.log("In component did mount");
    console.log(this.props.children);
      const messageObj = Object.assign({}, this.props);
      this.setState({ messageType: this.checkMessageType(messageObj.children) });

      const chatMessagesContainer = document.getElementById("chatMessagesContainer");
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; //Note this alone might not scroll all the way down if there are any image messages. Since these images are loaed asynchronously, their height is not properly accounted for. Thus we need a hack to fix this.  //We are triggering props in InputArea as a hack
      console.log(chatMessagesContainer.scrollHeight);
  }

  componentDidUpdate(){
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  componentWillReceiveProps(){
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    console.log(chatMessagesContainer.scrollHeight);
  }

  imageLoaded = () =>{ //Callback to scroll all the way down after images are loaded. But, after first load (images are cached?) the problem persists. Therefore, we are triggering props in InputArea as a hack
      console.log("image has been loaded");
      const chatMessagesContainer = document.getElementById("chatMessagesContainer");
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      console.log(chatMessagesContainer.scrollHeight);
  }

  render(){
    let dynamicClassName = (this.props.from === "user")? "messageUser" : "messageAdmin";
    return(
      <div className={"chatMessageWrapper "+dynamicClassName}>
        <div className={"chatMessage "+dynamicClassName} style={{display: "inline-block"}}>
            {(this.state.messageType === "image")?
              <a href={this.props.children} target="_blank"><img src={this.props.children} style={{width: 100}} onLoad={this.imageLoaded}></img></a>
              : (this.state.messageType === "link")?
                  <a href={this.props.children} target="_blank">{this.props.children}</a>
                  : this.props.children}
        </div>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  children: React.PropTypes.string,
  from: React.PropTypes.string,
  timestamp: React.PropTypes.number
}



class InputArea extends Component{

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  handleClick = () => {
      this.props.onSend();
  }

  componentDidMount(){
    setTimeout(this.props.onChange.bind(null), 250); //Hack to scroll to the bottom of the screen to handle images
  }

  handleUpload = () => {
    cloudinary.openUploadWidget({ cloud_name: cloudinaryCloudName, upload_preset: cloudinaryChatUploadPreset},
    (error, result) => {
       console.log(error, result);
       if(error === null){
         console.log("ahkqjwkjfen");
         console.log(result[0]);
          console.log(result[0].secure_url);
          this.props.onChange(result[0].secure_url);
          this.props.onSend();
       }
       else{
         console.log(error);
       }
      }
    );
  }

  render(){
    return(
      <div style={{position:"absolute", left: 0, bottom: 0, width: "100%", backgroundColor: "white", paddingTop: 2}}>
        <button className="pt-button pt-icon-folder-open" onClick={this.handleUpload} style={{width:"15%"}}></button>
        <input className="pt-input" style={{width: "65%"}} onChange={this.handleChange} value={this.props.value}></input>
        <button className="pt-button pt-intent-primary" style={{width: "20%"}} onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}

InputArea.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onSend: React.PropTypes.func
}


class ChatWidget extends Component{

  constructor(){
    super();
    this.state = {active: false, messages:[], newMessage: ""};
  }

  componentDidMount(){
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val();
      if (currentMessages != null){
        this.setState({messages: currentMessages});
        console.log(currentMessages);
      }
    })
  }

  renderMessages = () => {
    console.log("rendering messages");
    let messages = [];
    for(let key in this.state.messages){
      console.log(this.state.messages[key]);
      messages.push (
            <ChatMessage
              key = {this.state.messages[key].id}
              from = {this.state.messages[key].from}>
              {this.state.messages[key].message}
            </ChatMessage>
      );
    }
    return messages;
  }

  updateNewMessage = (value) => {
    this.setState({newMessage: value});
  }

  generateId = () =>{
    return new Date().getTime();
  }

  commitNewMessage = () => {
    if(this.state.newMessage.trim() !== ""){

      const newMessage = {
        id: this.generateId(),
        from: "user",
        message: this.state.newMessage
      }
      this.setState({newMessage: ""});
      firebase.database().ref('messages/'+newMessage.id).set(newMessage);
    }
  }

  render(){
    return(
      <div>
        <div id = "chatWidget" onClick={()=>{console.log(this.state.active);this.setState({active: !this.state.active})}}>
          <div id = "chatNotification">2</div>
          <span className="pt-icon-large pt-icon-chat" style={{color:"white"}}></span>
        </div>
        {this.state.active?
        <VelocityTransitionGroup key={1} enter={{animation: "transition.slideUpBigIn", duration: 300}} leave={{animation: ""}} runOnMount >

          <div id="chatBox">
            <div id="chatMessagesContainer">
              {this.renderMessages()}
            </div>

            <InputArea
              value={this.state.newMessage}
              onChange={this.updateNewMessage}
              onSend={this.commitNewMessage}
            />
          </div>

        </VelocityTransitionGroup>:
        null}
      </div>


    );
  }
}

export default ChatWidget;
