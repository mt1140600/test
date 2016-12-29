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


  handleCloseClick = () => {
    this.setState({visible:false});
  }

  render () {
    if (this.state.visible) {
      return (
        <div className="pt-callout pt-intent-danger" style={Object.assign({}, {marginTop:'10px', color: '#a94442'}, this.props.style)}>
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
  style: React.PropTypes.object
};

export default Callout;
