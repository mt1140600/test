import React, {Component, PureComponent} from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cascadedDisplay from '../actions/cascadedDisplay';
import shallowCompare from 'react-addons-shallow-compare'


// const makeCascadedTab = (WrappedComponent) => {
//
//   return class extends PureComponent{
//
//                 componentWillUnmount(){
//                   this.props.showNext(false);
//                 }
//
//                 collapseTab = () => {
//                   this.props.collapseTab();
//                 }
//
//                 render(){
//                   return(
//                     <div
//                       className= "cascadedTab"
//                       style={{
//                         flex: (this.props.nextVisible)? 1: 2,
//                         minWidth: (this.props.nextVisible)? 500: "auto",
//                         padding: 20,
//                         display: "inline-block",
//                         borderRight: (this.props.nextVisible)? "1px solid #dee5e7" : null,
//                         borderBottom: (this.props.nextVisible)? "2px solid #106ba3" : null,
//                         height: this.props.height,
//                         boxSizing: "border-box",
//                         position: "relative"
//                       }}
//                       // onClick={this.props.showNext.bind(null, false)}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f6f8f8", margin: "0px -20px 0px -20px", padding: "0px 10px 0px 10px", boxShadow: "0 2px 2px rgba(0,0,0,.05), 0 1px 0 rgba(0,0,0,.05)", position: "absolute", top: 0, boxSizing: "border-box", zIndex: 2, width: "100%"}}>
//                         <h2 style={{ color: "#5c7080", fontWeight: "100", fontSize: "x-large" }}>{`Step ${this.props.index} of 3`}</h2>
//                         {
//                           (typeof(this.props.collapseTab) !== "undefined")?
//                             <button className="pt-button pt-icon-cross pt-intent-danger" onClick={this.collapseTab}/>
//                             :
//                             null
//                         }
//                       </div>
//                       <div style={{ marginTop: 20, paddingTop: 10, overflowY: "scroll", height: `calc(${this.props.height} - 50px)`}}>
//                         <WrappedComponent {...this.props} />
//                       </div>
//                     </div>
//                   );
//                 }
//
//               }
// }
//
// export makeCascadedTab;


//TODO: CascadedTab will re-render because we are printing a blue bottomborder and rightborder. Try to eliminate this.
class CascadedTab extends PureComponent{

  componentWillUnmount(){
    this.props.showNext(false);
  }

  collapseTab = () => {
    this.props.collapseTab();
  }

  render(){
    // console.log("Rendering "+ this.props.index);
    return(
      <div
        className= "cascadedTab"
        style={{
          flex: (this.props.nextVisible)? 1: 2,
          minWidth: (this.props.nextVisible)? 500: "auto",
          padding: 20,
          display: "inline-block",
          borderRight: (this.props.nextVisible)? "1px solid #dee5e7" : null,
          borderBottom: (this.props.nextVisible)? "2px solid #106ba3" : null,
          height: this.props.height,
          boxSizing: "border-box",
          position: "relative"
        }}
        // onClick={this.props.showNext.bind(null, false)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f6f8f8", margin: "0px -20px 0px -20px", padding: "0px 10px 0px 10px", boxShadow: "0 2px 2px rgba(0,0,0,.05), 0 1px 0 rgba(0,0,0,.05)", position: "absolute", top: 0, boxSizing: "border-box", zIndex: 2, width: "100%"}}>
          <h2 style={{ color: "#5c7080", fontWeight: "100", fontSize: "x-large" }}>{`Step ${this.props.index} of 3`}</h2>
          {
            (typeof(this.props.collapseTab) !== "undefined")?
              <button className="pt-button pt-icon-cross pt-minimal" onClick={this.collapseTab}/>
              :
              null
          }
        </div>
        <div style={{ marginTop: 20, paddingTop: 10, overflowY: "scroll", height: `calc(${this.props.height} - 50px)`}}>
          {this.props.content}
          {/* <button onClick={this.props.showNext.bind(null, true)}>Open Next</button> */}
        </div>
      </div>
    );
  }

}

CascadedTab.propTypes = {
  index: React.PropTypes.number,
  content: React.PropTypes.node,
  height: React.PropTypes.string,
  collapseTab: React.PropTypes.func,
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

  componentWillReceiveProps(nextProps){

    const isSame = (array1, array2) => {
      return(
        (array1.length == array2.length) && array1.every(function(element, index) {
          return element === array2[index];
        })
      );
    }

    if(!isSame(this.props.tabsVisible, nextProps.tabsVisible)){
      setTimeout(
        () => {
          const container = document.getElementById("app");
          const tab = document.getElementsByClassName("cascadedTab");
          let widthToScroll = 0;
          for(let i=0; i<tab.length-1; i++ ){ //Skipping width of last tab as we need to scroll to begining of last tab
            widthToScroll = widthToScroll + tab[i].offsetWidth
          }
          container.scrollLeft = widthToScroll + 40; //40 is the margin in container
        }, 100)
    }

  }


  dummy = () => {  }

  render(){
    return(
      <div id= "cascadedDisplay" style={ Object.assign({}, { display: "flex", height: "100%", backgroundColor: "white"}, this.props.style) }>
        <CascadedTab
          index ={1}
          content = {this.props.one}
          height = {this.props.style.height}
          showNext = {this.props.cascadedDisplay.bind(null, 1)}
          nextVisible = {this.props.tabsVisible[1]}
        />
        {
          (this.props.tabsVisible[1])?
            <CascadedTab
              index = {2}
              content = {this.props.two}
              height = {this.props.style.height}
              collapseTab = {this.props.cascadedDisplay.bind(null, 1, false)}
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
              height = {this.props.style.height}
              collapseTab = {this.props.cascadedDisplay.bind(null, 2, false)}
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
