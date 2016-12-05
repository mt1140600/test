import React from 'react';
import logo from '../images/prokure_logo.png';

function header(){
  return(
    <div id="header">
      <a>
        <img id="header-logo" src = {logo} style={{}} />
      </a>
      <div id="header-name">
        Prokure
      </div>
    </div>
  );
}

export default header;
