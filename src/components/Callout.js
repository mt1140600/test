import React, {Component} from 'react';

class Callout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible:nextProps.visible});
  }

  componentWillMount(){
    this.setState({visible: this.props.visible})
  }

  handleCloseClick = () => {
    this.setState({visible:false});
  }

  render () {
    if (this.state.visible) {
      return (
        <div className={"pt-callout " +this.props.intent } style={{marginTop:'10px', textAlign: "center", height: 30, lineHeight: "10px", color: "#706f6f"}}>
          {this.props.text}
          <span onClick={this.handleCloseClick} style={{float:'right'}} className="pt-icon-cross"/>
        </div>
      );
    } else {
      return <div/>;
    }
  }
}


Callout.propTypes = {
  visible: React.PropTypes.bool,
  text: React.PropTypes.string,
  intent: React.PropTypes.string
};

Callout.defaultProps = {
    intent: "pt-intent-danger"
}

export default Callout;
