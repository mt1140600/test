import React from 'react';
import {Button} from "@blueprintjs/core";
import {browserHistory} from 'react-router';

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  browserHistory.push("/");
}

export default function HeaderButtons(){
  return(
    <div id="headerButtons">
      <Button iconName="log-out" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
