import React, {Component} from 'react';
import {connect} from 'react-redux';

class ProgressBar extends Component{
  render(){
    let width = ((this.props.currentTab+1)/ 7)*100;   //as indices start from 0
    return(
      <div id="progressBar">
        <div className="pt-progress-bar pt-no-animation pt-intent-primary">
          <div className="pt-progress-meter" style={{width: `${width}%`}}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTab : state.registrationCurrentTab
  }
}

export default connect(mapStateToProps, null)(ProgressBar);
