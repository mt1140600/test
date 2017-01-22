import React, {Component} from 'react';

class SampleHOC extends Component{
  render(){
    return(
      <div>
        <PersonOne/>
        <br/>
        <br/>
        <PersonTwo/>
      </div>
    );
  }

}

export default SampleHOC;


const inductMember = (WrappedComponent) => {
  return(
    class extends Component{
      constructor(){
        super();
        this.secret = "Anand rocks";
      }

      componentDidMount(){
          console.log("mounting ");
      }

      render(){
        return(
          <WrappedComponent secret={this.secret}/>
        );
      }
    }
  )
}

class PersonOne extends Component{
  render(){
    return(
      <button onClick={() => console.log(this.props.secret)}>Greetings</button>
    )
  }
}

class PersonTwo extends Component{
  render(){
    return(
      <button onClick={ () => console.log("hola")}>Greetings</button>
    )
  }
}

PersonOne = inductMember(PersonOne);
