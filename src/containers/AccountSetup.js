import React, {Component} from 'react';
import TabBar from './TabBar';
import ViewNameBar from '../components/ViewNameBar';
import Header from '../components/Header';
class AccountSetup extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Header/>
        <ViewNameBar/>
        <TabBar/>
      </div>
    );
  }
}

export default AccountSetup;
