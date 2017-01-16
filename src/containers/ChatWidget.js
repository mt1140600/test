/* global cloudinary */
import React, {Component, PureComponent} from 'react';
// var VelocityComponent = require('velocity-react/velocity-component');
// var VelocityTransitionGroup = require('velocity-react/velocity-transition-group');

// import { VelocityTransitionGroup } from 'velocity-react';
import * as firebase from 'firebase';
require('velocity-animate');
require('velocity-animate/velocity.ui');
import { FocusStyleManager } from "@blueprintjs/core";
import {cloudinaryCloudName, cloudinaryImageUploadPreset, cloudinaryChatFolder} from '../constants';
import moment from 'moment';
import logo from '../images/prokure_logo.png';
import {connect} from 'react-redux';
import Callout from '../components/Callout';

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

class ChatMessage extends PureComponent{

  constructor(){
      super();
      this.state = {messageType: "plain"};
  }

  componentDidMount(){ //Move to bottom of screen on initial render of all messages
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; //Note this alone might not scroll all the way down if there are any image messages. Since these images are loaed asynchronously, their height is not properly accounted for. Thus we need a hack to fix this.  //We are triggering props in InputArea as a hack
  }

  // shouldComponentUpdate(nextProps){
  //   return (this.props !== nextProps);     //This doesn't work. We can't compare objects like this. We need to use shallow compare.
                                              //So, we need to use import shallowCompare from 'react-addons-shallow-compare'. But this is legacy code. Thus, using PureComponent
                                              //Implementing this to prevent chat moving to bottom while typing
  // }

  componentDidUpdate(){ //Move to bottom of screen when new message is received (from yourself or admin)
                          //Also called when a message is being types as parent component's state changes and this (child) component's lifecycles methods are called
                          //But since we are using PureComponent instead of Component, it is not called as under the hood, shouldComponentUpdate returns false
    const chatMessagesContainer = document.getElementById("chatMessagesContainer");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; //Note this alone might not scroll all the way down if there are any image messages. Since these images are loaed asynchronously, their height is not properly accounted for. Thus we need a hack to fix this.  //We are triggering props in InputArea as a hack
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
    console.log('test');
    console.log("Focusing on textInput");
    console.log(this.refTextInput);
    //Can combine the two methods below. Just leaving it to show that you can bind (curry) the method instead of putting it in a callback
    setTimeout(()=>{this.refTextInput.focus()}, 250); //Hack to focus input on textbox  http://stackoverflow.com/questions/35522220/react-ref-with-focus-doesnt-work-without-settimeout-my-example
    setTimeout(this.props.onChange.bind(null, {messageText: "", messageType: "", messageUrl: ""}), 250); //Hack to scroll to the bottom of the screen to handle images
    //Binding empty string because binding null or undefined will throw warning React converting controlled component to uncontrolled
  }

  handleUpload = () => {
    cloudinary.openUploadWidget({ cloud_name: cloudinaryCloudName, upload_preset: cloudinaryImageUploadPreset, folder: cloudinaryChatFolder},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          console.log(result[0].secure_url);
          this.props.onChange({messageText: result[0].original_filename, messageType: result[0].format||"unknown", messageUrl: result[0].secure_url });
          this.props.onSend();
       }
       else{
         console.log(error);
         this.props.uploadError();
       }
      }
    );
  }

  handleEnter = (event) => {
      if(event.keyCode === 13){
        this.handleClick();
        event.preventDefault();
      }
  }

  componentWillUnmount(){
    let currentTime = new Date().getTime();
    firebase.database().ref('chatDetails/'+localStorage.getItem('user_id')+"/user").set({lastSeen: currentTime, name: localStorage.getItem("user_name")});
  }

  auto_grow = (element, event) => {   //Not using event, but just showing that event which is automatically passed as a param to the callfunction given in onKeyUp is fed as a second parameter
    console.log("autogrowing",element);
    console.log("event", event);
    element.style.height = "auto"; //To reset size after pressing enter
    element.style.height = (element.scrollHeight)+"px";
  }

  render(){
    return(
        <div className="pt-input-group" style={{ backgroundColor:"#f5f5f5", margin: "0px -5px 0px -5px", boxShadow: "0 -2px 2px rgba(0,0,0,.05), 0 -1px 0 rgba(0,0,0,.05)"}}>
          <button className="pt-button pt-minimal pt-icon-paperclip" style={{ marginLeft: 10, marginTop: 9 }} onClick={this.handleUpload}></button>
          <textArea onKeyUp={this.auto_grow.bind(null, this.refTextInput)} ref={(input) => {this.refTextInput = input;}} className="pt-input" style={{paddingLeft: 50, boxShadow: "none", resize: "none" , backgroundColor:"#f5f5f5", minHeight: "50px", maxHeight: "150px"}} placeholder="Type a message"  value={this.props.newMessage.messageText} onChange={this.handleChange} onKeyDown={this.handleEnter}/>
          <button className="pt-button pt-minimal pt-icon-arrow-right" style={{ marginTop: 9 }} onClick={this.handleClick}></button>
        </div>
    );
  }
}


InputArea.propTypes = {
  newMessage: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSend: React.PropTypes.func,
  uploadError: React.PropTypes.func
}


class ChatWidget extends Component{

  constructor(){
    super();
    this.state = {active: false, chatDetails: {admin:{name: "Prokure Admin", photo: logo, position:"", phone_no: "", email_id: ""}}, messages:{}, newMessage: {messageText: "", messageType: "", messageUrl: ""}, countUnread: 0, isCalloutActive: false, isDetailsActive: false}; //For a controlled component, if initial value is null or undefined, React will throw warning "Changing Controlled component to uncontrolled"
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");  //inital date set to 13/05/2014 just like that
    this.lastSeen = 0;
  }

  componentDidMount(){
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
    firebase.database().ref('chatDetails/'+localStorage.getItem('user_id')).on('value', (snapshot) => {
      const chatDetails = snapshot.val();
      console.log("on load: ", chatDetails);
      if(chatDetails !== null){
        this.setState({chatDetails: Object.assign({}, this.state.chatDetails, chatDetails)});
      }
    })
    firebase.database().ref('chatMessages/'+localStorage.getItem('user_id')).on('value', (snapshot) => {
      const currentMessages = snapshot.val();
      console.log("on load: ", currentMessages);
      if (currentMessages !== null){
        this.setState({messages: currentMessages});
      }

      let countUnread  = 0;
      for(let key in currentMessages){
        if(Number(key) > Number(this.state.chatDetails.user.lastSeen)) countUnread++;
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
    if(this.state.newMessage.messageText.trim() !== ""){

      const newMessage = {
        from: "user",
        message: this.state.newMessage
      }

      this.setState({newMessage: {messageText:"", messageType:"", messageUrl:""} });

      const commitTime = this.generateId();
      this.lastSeen = commitTime;
      //chatMetadata
      firebase.database().ref('chatDetails/'+localStorage.getItem('user_id')+"/user").set({lastSeen: commitTime, name: localStorage.getItem("user_name")});
      //chatMessages
      firebase.database().ref('chatMessages/'+localStorage.getItem('user_id')+"/"+commitTime).set(newMessage);
    }
  }

  toggleChat = () => {
    this.setState({active: !this.state.active, countUnread: 0});
    this.currentDateDiv = moment(1400000000000).format("DD MMM YYYY");
  }

  showDetails = () => {
    this.setState({isDetailsActive: !this.state.isDetailsActive});
  }

  showCallout = () => {
      this.setState({isCalloutActive: true});
      setTimeout(
        () => {this.setState({isCalloutActive: false})}, 3000
      );
  }

  render(){
    let buttonActiveClass = (this.state.isDetailsActive)?"pt-active ":"";
    return(
      <div>
        <div id = "chatWidget"
          onClick= {this.toggleChat}>
          {(this.state.countUnread > 0)?<div id = "chatNotification" className="flexRow">{this.state.countUnread}</div>: null}
          <span className="pt-icon-large pt-icon-chat" style={{color:"white"}}></span>
        </div>
        {this.state.active?
        // <VelocityTransitionGroup key={1} enter={{animation: "transition.slideUpBigIn", duration: 300}} leave={{animation: ""}} runOnMount >

          <div id="chatBox">
            <div id="chatHeader" className="flexRow" style={{justifyContent: "space-between"}}>

              <div id="chatHeaderPicWrapper"> {/* Wrapping the image in a div, because setting a littlborder against a dark image would cause a lot of pixelation so, we reduce border width on img element*/}
                <img id ="chatHeaderPic" src={this.state.chatDetails.admin.photo} />
              </div>

              <div style={{fontSize: 16}}>{this.state.chatDetails.admin.name}</div>

              <div style={{marginRight: 10}}>
                <button className={"pt-button pt-minimal pt-icon-more "+ buttonActiveClass} style={{  top:10, right:50 }} onClick={this.showDetails}></button>
                <button className="pt-button pt-minimal pt-icon-cross" style={{  top:10, right:10 }} onClick={this.toggleChat}></button>
              </div>

            </div>

            {
              (this.state.isDetailsActive)?
              <div className="flexRow" style={{ textAlign: "center", padding: "0px 10px 10px 10px", backgroundColor: "#f5f5f5", width: "100%", position: "absolute", left: 0, boxShadow: "0 2px 2px rgba(0,0,0,.05), 0 1px 0 rgba(0,0,0,.05)"}}>
                <div style={{color: "grey"}}>
                  <p>{this.state.chatDetails.admin.position}</p>
                  <p>{this.state.chatDetails.admin.phone_no}</p>
                  <p>{this.state.chatDetails.admin.email_id}</p>
                </div>
              </div>
              :null
            }

            <Callout
              visible = {this.state.isCalloutActive}
              text = "File upload failed. Allowed file formats: png, bmp, jpg, pdf"
              style = {{position: "absolute", backgroundColor: "#ffb2b2", left: 0, width: "100%", fontSize: "smaller"}}/>

            <div id="chatMessagesContainer">
              {this.renderMessages()}
            </div>

            <InputArea
              newMessage={this.state.newMessage}
              onChange={this.updateNewMessage}
              onSend={this.commitNewMessage}
              uploadError={this.showCallout}
            />
          </div>

        // </VelocityTransitionGroup>
        :null}
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
