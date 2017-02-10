import React, {Component} from 'react';
import logo from '../images/prokure_logo.png';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handleLogout} from '../actions/login';
import {Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider} from '@blueprintjs/core';
import {Link} from 'react-router';
import { push } from 'react-router-redux'

class NotificationHistory extends Component{
  renderNotification = (item, index) => {
    return(
      <Link to={item.route} style={{ textDecoration: "none", width: "100%", height: 60, padding: 10, borderLeft: (item.new)? "2px solid #349ef3" : "none", borderTop: "1px solid whitesmoke", display: "flex", alignItems: "center" }} key={index}>
        <img style={{width:"40px", height:"40px", display: "inline-block"}} src={(item.image)? item.image: logo} />
        <div style={{display: "inline-block"}}>
          <div>{item.content}</div>
          <div style={{textAlign: "right", fontSize: 10, color: "grey", fontStyle: "italic", paddingTop: 5}}>{item.time}</div>
        </div>
      </Link>
    )
  }
   render(){
    return(
      <div style={{width: 400, minHeight: 50, maxHeight: 600}} className="flexCol">
        <div style={{width: "100%", display: "flex", justifyContent:"space-between", alignItems:"center", height: 30, padding: "0px 20px", backgroundColor: "whitesmoke", color: "#5c7080"}}>
          <div>
            Notifications
          </div>
          <a>Mark all as read</a>
        </div>
        {
          (this.props.notificationsLog.length > 0)?
            this.props.notificationsLog.map(this.renderNotification)
          :
          <div>
            You have not received any notifications yet
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notificationsLog: state.notificationsLog
  }
}

NotificationHistory = connect(mapStateToProps)(NotificationHistory);



class Header extends Component{

  constructor(){
    super();
    // this.state = {isFullScreen: false};
    this.loginMenu = <Menu>
                        <MenuItem
                            iconName="pt-icon-person"
                            onClick={this.handleProfile}
                            text="Edit Profile" />
                        <MenuDivider />
                        <MenuItem
                            iconName="pt-icon-log-out"
                            onClick={this.handleLogout}
                            text="Logout" />
                    </Menu>
  }

  handleLogout = () => {
    this.props.handleLogout();
  }

  handleProfile = () => {
    this.props.dispatch(push('/profile'));
  }

  openDashboard  = () => {
    this.props.dispatch(push('/dashboard'));
  }

  isFullScreen = () =>
  {
    return (document.fullScreenElement && document.fullScreenElement !== null)
         || document.mozFullScreen
         || document.webkitIsFullScreen;
  }

  exitFullScreen = () =>
  {
      if (document.exitFullscreen)
          document.exitFullscreen();
      else if (document.msExitFullscreen)
          document.msExitFullscreen();
      else if (document.mozCancelFullScreen)
          document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen)
          document.webkitExitFullscreen();
  }

  toggleFullscreen = () => {
    if(this.isFullScreen()){
      // this.setState({isFullScreen: true});
      this.exitFullScreen();
    }
    else{
      // this.setState({isFullScreen: false});
      let el = document.documentElement;
      let rfs = el.requestFullscreen
          || el.webkitRequestFullScreen
          || el.mozRequestFullScreen
          || el.msRequestFullscreen
      ;
      rfs.call(el);
    }
  }

  render(){
    return(
      <nav id="header" className="pt-navbar">
        <div className="pt-navbar-group pt-align-left" style={{display: "flex", justifyContent: "center", alignItems:"center", cursor: "pointer"}} onClick={this.openDashboard}>
          <img id="header-logo" src = {logo} />
          <div id="header-name" className="pt-navbar-heading companyName">Prokure</div>
        </div>
        {
          (localStorage.getItem("user_id") !== null)?
            <div className="pt-navbar-group pt-align-right" >

              <button className="pt-button pt-minimal pt-icon-control" onClick={this.openDashboard}/>
              <span className="pt-navbar-divider"></span>

              <button className="pt-button pt-minimal pt-icon-fullscreen" onClick={this.toggleFullscreen}/>
              <span className="pt-navbar-divider"></span>

              <Popover content= {<NotificationHistory />}
                       position={Position.BOTTOM_RIGHT}
                       interactionKind={PopoverInteractionKind.CLICK}
              >
                <button className="pt-button pt-minimal pt-icon-notifications"></button>
              </Popover>

              <Popover content={this.loginMenu}
                       position={Position.BOTTOM_RIGHT}
                       interactionKind={PopoverInteractionKind.CLICK}
              >
                  <button className="pt-button pt-minimal pt-icon-user"></button>
              </Popover>

            </div>
          :
            null
        }
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { ...bindActionCreators({handleLogout}, dispatch), dispatch };
}

export default connect(null, mapDispatchToProps)(Header);
