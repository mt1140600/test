import React, {Component} from 'react';

class ProgressBar extends Component{
  render(){
    return(
      <div id="progressBar">
        <div className="pt-progress-bar pt-intent-primary">
          <div className="pt-progress-meter" style={{width: "25%"}}/>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
