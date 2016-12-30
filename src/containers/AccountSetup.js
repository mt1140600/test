import React, {Component} from 'react';
import TabLayout from './TabLayout';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';
import ProgressBar from '../components/ProgressBar';
import ChatWidget from  './ChatWidget';

class AccountSetup extends Component{
  render() {
    return(
      <div>
        <Header/>
        <HeaderButtons/>
        <div style={{marginTop: 50}}>
          {ViewNameBar("Account Settings")}
          <ProgressBar/>
          <TabLayout/>
        </div>
        <ChatWidget/>
      </div>
    );
  }
}

export default AccountSetup;
