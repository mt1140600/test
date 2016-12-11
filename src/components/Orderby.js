import React, {Component} from 'react';

export default class OrderBy extends Component{

  constructor(props){
    super(props);
    this.state = { active: props.value };
  }

  onClick = (value) => {
    if(this.state.active === value) return null;
    else {
      this.setState({ active: value });
      this.props.handleChange(value);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.state.active)
      this.setState({active: nextProps.value});
  }

  render(){
    let defaultStyle = {flex: 1, height:"16px", display:"flex", alignItems:"center"};     //Adding display: flex here as icon gets rendered in a span ::before
    let styleTop = (this.state.active === "top")? Object.assign({}, defaultStyle, {color:"#ffb2b2"}) : defaultStyle;
    let styleBottom = (this.state.active === "bottom")? Object.assign({}, defaultStyle, {color:"#ffb2b2"}) : defaultStyle;
    if(this.props.visible === true)
      return(
        <div style={{display:"flex",flexDirection:"column"}}>
          <div className="pt-icon-standard pt-icon-caret-up" style={styleTop} onClick={this.onClick.bind(this,"top")}/>
          <div className="pt-icon-standard pt-icon-caret-down" style={styleBottom} onClick={this.onClick.bind(this,"bottom")}/>
        </div>
      );
    else
      return null;
  }
}

OrderBy.propTypes = {
  handleChange: React.PropTypes.func,
  visible: React.PropTypes.bool,
  value: React.PropTypes.string
}

OrderBy.defaultProps = {
  visible: true,
  value: null
}
