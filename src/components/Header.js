import React, {Component} from 'react';
import logo from '../images/prokure_logo.png';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handleLogout} from '../actions/login';
import {Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider} from '@blueprintjs/core';
import {Link} from 'react-router';

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
    this.loginMenu = <Menu>
                        <MenuItem
                            iconName="pt-icon-person"
                            text="Profile" />
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

  render(){
    return(
      <nav id="header" className="pt-navbar">
        <div className="pt-navbar-group pt-align-left" style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
          <img id="header-logo" src = {logo} />
          <div id="header-name" className="pt-navbar-heading companyName">Prokure</div>
        </div>
        {
          (localStorage.getItem("user_id") !== null)?
            <div className="pt-navbar-group pt-align-right">
              <span className="pt-navbar-divider"></span>
              <Popover content={this.loginMenu}
                       position={Position.BOTTOM_RIGHT}
                       interactionKind={PopoverInteractionKind.CLICK}
              >
                  <button className="pt-button pt-minimal pt-icon-user"></button>
              </Popover>

              <Popover content= {<NotificationHistory />}
                       position={Position.BOTTOM_RIGHT}
                       interactionKind={PopoverInteractionKind.CLICK}
              >
                <button className="pt-button pt-minimal pt-icon-notifications"></button>
              </Popover>

              <button className="pt-button pt-minimal pt-icon-cog"></button>
            </div>
          :
            null
        }
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({handleLogout}, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);
