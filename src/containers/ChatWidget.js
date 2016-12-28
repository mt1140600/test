import React, {Component} from 'react';
// var VelocityComponent = require('velocity-react/velocity-component');
// var VelocityTransitionGroup = require('velocity-react/velocity-transition-group');
import { VelocityTransitionGroup } from 'velocity-react';
import * as firebase from 'firebase';
require('velocity-animate');
require('velocity-animate/velocity.ui');
import { FocusStyleManager } from "@blueprintjs/core";
import {cloudinaryCloudName, cloudinaryChatUploadPreset} from '../constants';
import moment from 'moment';
import logo from '../images/prokure_logo.png';

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
      const messageObj = Object.assign({}, this.props);
      this.setState({ messageType: this.checkMessageType(messageObj.children) });

      const chatMessagesContainer = document.getElementById("chatMessagesContainer");
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; //Note this alone might not scroll all the way down if there are any image messages. Since these images are loaed asynchronously, their height is not properly accounted for. Thus we need a hack to fix this.  //We are triggering props in InputArea as a hack
  }

  componentDidUpdate(){
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  componentWillReceiveProps(){
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  imageLoaded = () =>{ //Callback to scroll all the way down after images are loaded. But, after first load (images are cached?) the problem persists. Therefore, we are triggering props in InputArea as a hack
      const chatMessagesContainer = document.getElementById("chatMessagesContainer");
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  getTime = () => {
    return moment(this.props.timestamp).format("hh:mm a");
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
            <div style={{textAlign: "right", fontSize: 10, color: "grey", fontStyle: "italic", paddingTop: 5}}>{this.getTime()}</div>
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

  handleEnter = (event) => {
      if(event.keyCode === 13) this.handleClick();
  }

  render(){
    return(
        <div className="pt-input-group" style={{position:"absolute", left: 0, bottom: 0, width: "100%", backgroundColor:"#f5f5f5", padding: "10px 0 10px 0"}}>
          <button className="pt-button pt-minimal pt-icon-paperclip" style={{ marginLeft: 10, marginTop: 13 }} onClick={this.handleUpload}></button>
          <input className="pt-input" style={{paddingLeft: 50,boxShadow: "none", backgroundColor:"#f5f5f5"}} placeholder="Type a message"  value={this.props.value} onChange={this.handleChange} onKeyDown={this.handleEnter}/>
          <button className="pt-button pt-minimal pt-icon-arrow-right" style={{ marginTop: 13 }} onClick={this.handleClick}></button>
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
    this.state = {active: false, messages:{}, newMessage: "", countUnread: 0};
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");  //inital date set to 13/05/2014 just like that
  }

  componentDidMount(){
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val();

      if (this.state.active === false){
        this.setState({countUnread: Object.keys(currentMessages).length - Object.keys(this.state.messages).length});
      }

      if (currentMessages != null){
        this.setState({messages: currentMessages});
      }

    })
  }

  componentWillUpdate(){
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
    if(this.state.active == false){
      console.log("new message");
    }
  }

  componentWillReceiveProps(){

  }

  renderDateDiv = (timestamp) => {
    const messageDate = moment(timestamp).format("DD MMM YYYY");
    if(moment(messageDate).isAfter(this.currentDateDiv, 'day')){
      this.currentDateDiv = messageDate;
      return(
        <div key={messageDate} style={{textAlign: "center", color: "grey", fontStyle: "italic", marginBottom: 10, fontSize: 10}}>
          {messageDate}
        </div>
      );
    }
    else return null;
  }

  renderMessages = () => {
    let messages = [];
    for(let key in this.state.messages){
      messages.push (
            this.renderDateDiv(this.state.messages[key].id),
            <ChatMessage
              key = {this.state.messages[key].id}
              from = {this.state.messages[key].from}
              timestamp = {this.state.messages[key].id}>
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
    if(this.state.newMessage !== "" || this.state.newMessage.trim() !== ""){ //adding first part to get rid of warning

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
        <div id = "chatWidget"
          onClick= { () => { this.setState({active: !this.state.active, countUnread: 0}); this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");} }>
          {(this.state.countUnread > 0)?<div id = "chatNotification">{this.state.countUnread}</div>: null}
          <span className="pt-icon-large pt-icon-chat" style={{color:"white"}}></span>
        </div>
        {this.state.active?
        <VelocityTransitionGroup key={1} enter={{animation: "transition.slideUpBigIn", duration: 300}} leave={{animation: ""}} runOnMount >

          <div id="chatBox">
            <div id="chatHeader">
              {/* <img src={logo} style={{height: 50, width: 50}}/> */}
              <div style={{fontSize: 16}}>How can we help?</div>
            </div>

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
