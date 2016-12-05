import React, {Component} from 'react';
import TabBar from './TabBar';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';

class AccountSetup extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Header/>
        <ViewNameBar/>
        <ProgressBar/>
        <TabBar/>
      </div>
    );
  }
}

export default AccountSetup;
