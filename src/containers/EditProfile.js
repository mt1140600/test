import React, {Component} from 'react';
import EditTabLayout from './EditTabLayout';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';
import ProgressBar from '../components/ProgressBar';
import ChatWidget from  './ChatWidget';

class EditProfile extends Component{
  render() {
    return(
      <div>
        <Header/>
        <div style={{paddingTop: 50}}>
          {ViewNameBar("Edit Profile")}
          <EditTabLayout/>
        </div>
        {/* <ChatWidget/> */}
      </div>
    );
  }
}

export default EditProfile;
