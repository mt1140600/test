import React, {Component} from 'react';

class CascadedDisplay extends Component{

  constructor(){
    super();
    this.state = { twoVisible: false, threeVisible: false};
  }

  showTwo = () => {
    this.setState({twoVisible: true});
  }

  showThree = () => {
    this.setState({threeVisible: true});
  }

  render(){
    return(
      <div style={{ display: "flex", minHeight: 600, backgroundColor: "white"}}>
        <div style={{ flex: 1, boxShadow: "-3px 0 7px -2px rgba(0,0,0,.15)" }}>
          <button onClick={this.showTwo}>Open Two</button>
        </div>
        <div style={{ flex: 1, boxShadow: "-3px 0 7px -2px rgba(0,0,0,.15)", display: (this.state.twoVisible)? "block": "none"}}>
          <button onClick={this.showThree}>Open Three</button>
        </div>
        <div style={{ flex: 1, boxShadow: "-3px 0 7px -2px rgba(0,0,0,.15)", display: (this.state.threeVisible)? "block": "none"}}></div>
      </div>
    );
  }

}

export default CascadedDisplay;
