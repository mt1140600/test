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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

FocusStyleManager.onlyShowFocusOnTabs();


class FileChatMessage extends Component{
  handleClick = () => {
    this.refs.file.click();
  }
  render(){
    let extension = (this.props.format === "unknown")? " " : "."+this.props.format;
    return(
      <div onClick={this.handleClick} style={{display: "flex", justifyContent: "space-between", backgroundColor: "#F5F5F5", alignItems:"center", padding: "10px", borderRadius: "4px", border:"1px solid rgba(75,89,97,.1)", cursor: "pointer"}}>
        <span className="pt-icon-arrow-top-right" style={{color: "rgba(75,89,97,.5)"}}></span>
        <a ref="file" href={this.props.url} target="_blank" style={{width: "100%", overflow:"hidden", paddingLeft: 10, color: "#4B5961", textDecoration: "none", fontStyle: "italic"}}>{this.props.filename + extension}</a>
      </div>
    );
  }

}

class ChatMessage extends Component{

  constructor(){
      super();
      this.state = {messageType: "plain"};
  }


  componentDidMount(){
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
    let fileFormat;
    switch(this.props.messageType){
      case 'bmp':
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        fileFormat = "Image";
      break;
      case 'Text':
        fileFormat = "Text";
      break;
      default:
        fileFormat = "Link";
    }
    console.log("file format  is "+ fileFormat);
    return(
      <div className={"chatMessageWrapper "+dynamicClassName}>
        <div className={"chatMessage "+dynamicClassName} style={{display: "inline-block"}}>
            {(fileFormat === "Image")?
              <a href={this.props.messageUrl} target="_blank"><img src={this.props.messageUrl} style={{maxWidth: 300}} onLoad={this.imageLoaded}></img></a>
              : (fileFormat === "Link")?
                  <FileChatMessage
                    filename={this.props.children}
                    url={this.props.messageUrl}
                    format={this.props.messageType}/>
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
  timestamp: React.PropTypes.number,
  messageType: React.PropTypes.string,
  messageUrl: React.PropTypes.string
}



class InputArea extends Component{

  handleChange = (event) => {
    this.props.onChange({messageText: event.target.value, messageType: "Text", messageUrl: "" });
  }

  handleClick = () => {
      this.props.onSend();
  }

  componentDidMount(){
    setTimeout(this.props.onChange.bind(null, {messageText: "", messageType: "", messageUrl: ""}), 250); //Hack to scroll to the bottom of the screen to handle images
    //Binding empty string because binding null or undefined will throw warning React converting controlled component to uncontrolled
  }

  handleUpload = () => {
    cloudinary.openUploadWidget({ cloud_name: cloudinaryCloudName, upload_preset: cloudinaryChatUploadPreset},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          console.log(result[0].secure_url);
          this.props.onChange({messageText: result[0].original_filename, messageType: result[0].format||"unknown", messageUrl: result[0].secure_url });
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
          <input className="pt-input" style={{paddingLeft: 50,boxShadow: "none", backgroundColor:"#f5f5f5"}} placeholder="Type a message"  value={this.props.newMessage.messageText} onChange={this.handleChange} onKeyDown={this.handleEnter}/>
          <button className="pt-button pt-minimal pt-icon-arrow-right" style={{ marginTop: 13 }} onClick={this.handleClick}></button>
        </div>
    );
  }
}


InputArea.propTypes = {
  newMessage: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSend: React.PropTypes.func
}


class ChatWidget extends Component{

  constructor(){
    super();
    this.state = {active: false, messages:{}, newMessage: {messageText: "", messageType: "", messageUrl: ""}, countUnread: 0}; //For a controlled component, if initial value is null or undefined, React will throw warning "Changing Controlled component to uncontrolled"
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");  //inital date set to 13/05/2014 just like that
    this.lastSeen = 0;
  }

  componentDidMount(){
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
    firebase.database().ref('chatMessages/'+localStorage.getItem('user_id')).on('value', (snapshot) => {
      const currentMessages = snapshot.val();
      console.log("on load: ", currentMessages);
      if (currentMessages !== null){
        this.setState({messages: currentMessages});
      }

      let countUnread  = 0;
      for(let key in currentMessages){
        if(key > this.lastSeen) countUnread++;
      }

      if (this.state.active === false){
        this.setState({countUnread: countUnread});
      }
    })
  }

  componentWillUpdate(){
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
    if(this.state.active == false){
      console.log("new message");
    }
  }

  renderDateDiv = (timestamp) => {
    const messageDate = moment(timestamp).format("DD MMM YYYY");
    if(moment(messageDate).isAfter(this.currentDateDiv, 'day')){
      this.currentDateDiv = messageDate;
      return(
        <div key={messageDate} style={{textAlign: "center", color: "grey", fontStyle: "italic", marginBottom: 10, paddingTop: 5, fontSize: 10}}>
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
            this.renderDateDiv(Number(key)),
            <ChatMessage
              key = {key}
              from = {this.state.messages[key].from}
              timestamp = {Number(key)}
              messageType = {this.state.messages[key].message.messageType}
              messageUrl = {this.state.messages[key].message.messageUrl}>
              {this.state.messages[key].message.messageText}
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
    if(this.state.newMessage.messageText !== "" || this.state.newMessage.messageText.trim() !== ""){ //adding first part to get rid of warning

      const newMessage = {
        from: "user",
        message: this.state.newMessage
      }

      this.setState({newMessage: {messageText:"", messageType:"", messageUrl:""} });

      const commitTime = this.generateId();
      this.lastSeen = commitTime;
      //chatMetadata
      firebase.database().ref('chatDetails/'+localStorage.getItem('user_id')+"/user_lastSeen").set(commitTime);
      firebase.database().ref('chatDetails/'+localStorage.getItem('user_id')+"/user_name").set(localStorage.getItem("user_name"));
      //chatMessages
      firebase.database().ref('chatMessages/'+localStorage.getItem('user_id')+"/"+commitTime).set(newMessage);
    }
  }

  toggleChat = () => {
    this.setState({active: !this.state.active, countUnread: 0});
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
  }

  render(){
    return(
      <div>
        <div id = "chatWidget"
          onClick= {this.toggleChat}>
          {(this.state.countUnread > 0)?<div id = "chatNotification">{this.state.countUnread}</div>: null}
          <span className="pt-icon-large pt-icon-chat" style={{color:"white"}}></span>
        </div>
        {this.state.active?
        <VelocityTransitionGroup key={1} enter={{animation: "transition.slideUpBigIn", duration: 300}} leave={{animation: ""}} runOnMount >

          <div id="chatBox">
            <div id="chatHeader">
              <div style={{fontSize: 16}}>How can we help?</div>
              <button className="pt-button pt-minimal pt-icon-cross" style={{ position:"absolute", top:10, right:10 }} onClick={this.toggleChat}></button>
            </div>

            <div id="chatMessagesContainer">
              {this.renderMessages()}
            </div>

            <InputArea
              newMessage={this.state.newMessage}
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

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, null)(ChatWidget);
