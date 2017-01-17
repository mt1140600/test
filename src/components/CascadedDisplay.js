import React, {Component, PureComponent} from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cascadedDisplay from '../actions/cascadedDisplay';

//TODO: CascadedTab will re-render because we are printing a blue bottomborder and rightborder. Try to eliminate this.
class CascadedTab extends PureComponent{

  componentWillUnmount(){
    this.props.showNext(false);
  }

  render(){
    // console.log("Rendering "+ this.props.index);
    return(
      <div
        style={{
          flex: (this.props.nextVisible)? 1: 2,
          minWidth: (this.props.nextVisible)? 400: 800,
          padding: 20,
          borderRight: (this.props.nextVisible)? "1px solid #dee5e7" : null,
          borderBottom: (this.props.nextVisible)? "2px solid #106ba3" : null,
        }}
        // onClick={this.props.showNext.bind(null, false)}
      >
        {this.props.content}
        <button onClick={this.props.showNext.bind(null, true)}>Open Next</button>
      </div>
    );
  }

}

CascadedTab.propTypes = {
  index: React.PropTypes.number,
  content: React.PropTypes.node,
  showNext: React.PropTypes.func,
  nextVisible: React.PropTypes.bool
}




class CascadedDisplay extends Component{

  constructor(){
    super();
    // this.state = { tabsVisible: Immutable.List([true, false, false]) };
    // this.showTwo = this.showTab.bind(this,2);   //TODO: Need to bind these here. We can bind it in the props of CascadedTab because every time the CascadedDisplay component re-renders, the function get curried, there giving a nu\ew function and thus changing the props which results beats the purpose of a purecomponent
    // this.showThree = this.showTab.bind(this,3);
  }

  // showTab = (tabNo, value, event) => {
  //   if(typeof(event) !== 'undefined') event.stopPropagation();
  //   this.setState({ tabsVisible: this.state.tabsVisible.set(tabNo-1, value)});
  // }

  //
  // showThree = (value, event) => {
  //   if(typeof(event) !== 'undefined') event.stopPropagation();
  //   this.setState({threeVisible: value});
  // }

  dummy = () => {  }

  render(){
    return(
      <div style={ Object.assign({}, { display: "flex", height: "100%", backgroundColor: "white"}, this.props.style) }>
        <CascadedTab
          index ={1}
          content = {this.props.one}
          showNext = {this.props.cascadedDisplay.bind(null, 1)}
          nextVisible = {this.props.tabsVisible[1]}
        />
        {
          (this.props.tabsVisible[1])?
            <CascadedTab
              index = {2}
              content = {this.props.two}
              showNext = {this.props.cascadedDisplay.bind(null, 2)}
              nextVisible = {this.props.tabsVisible[2]}
            />
            :
            null
        }
        {
          (this.props.tabsVisible[2])?
            <CascadedTab
              index = {3}
              content = {this.props.three}
              showNext = {this.dummy}
              nextVisible = {false}
            />
            :
            null
        }
        {/* If I just give an anonymous function eg. showNext = { () => {} } here, since everytime the CascadedDisplay receives props, this anonymous function will get hoisted, this tab will re-render (due to change in its props). Therefore we don't use an anonymous function. Another solution could be showNext = {null} */}
      </div>
    );
  }

}

CascadedDisplay.propTypes = {
  one: React.PropTypes.node,
  two: React.PropTypes.node,
  three: React.PropTypes.node,
  style: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return{
    tabsVisible: state.cascadedDisplay
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      cascadedDisplay
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CascadedDisplay);
