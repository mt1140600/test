import React, {Component} from 'react';

var select =  null;

class Dummy extends Component{
  handleClick = () => {
    // this.refs.textArea.value="Hello";
    console.log(this.refs);
    select.value="updated";
  }

  render(){
    return(
      <div>
        <textarea ref={(input) => { select = input; }} value="lol">

        </textarea>
        <textarea ref={(input) => { select = input; }} value="rofl">

        </textarea>
        <button onClick={this.handleClick}></button>
        <Sub></Sub>
      </div>
    );
  }
}

export default Dummy;

class Sub extends Component{
  handleClick = () => {
    this.refs.textArea.value="Hello";
  }
  render(){
    return(
      <div>
        <textarea id="sub" ref={(input) => { select = input; }} value="sub">

        </textarea>
        <button onClick={this.handleClick}></button>
      </div>

    );
  }
}
