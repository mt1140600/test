import React, {Component} from 'react';
import {Checkbox} from "@blueprintjs/core";
import CheckboxWrapper from './CheckboxWrapper';

class LabelledCheckboxGroup extends Component{
  constructor(){
    super();
    this.alignCheckboxes = this.alignCheckboxes.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.morphNewToOld = this.morphNewToOld.bind(this);
    this.morphOldToNew = this.morphOldToNew.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.newArr = null;
    this.state={clicked: false}
  }

  handleClick(){
      this.setState({clicked: true});
  }

  componentWillReceiveProps(nextProps){
    this.newArr = this.morphOldToNew(nextProps.options, nextProps.value);
  }

  componentWillMount(){
    this.newArr = this.morphOldToNew(this.props.options, this.props.value);
  }

  morphOldToNew(mainArr, subArr){ //mainArr = [1,2,3]; subArr = [2]; returns [false, true, false]
    let newArr = [];
    for(let i=0; i<mainArr.length; i++){
        if(subArr.indexOf(mainArr[i]) === -1) newArr.push(false);
        else newArr.push(true);
    }
    return newArr;
  }

  morphNewToOld(mainArr, newArr){ //mainArr = [1,2,3]; newArr = [false, true, false]; returns [2]
    let subArr = [];
    for(let i =0; i<newArr.length; i++){
      if(newArr[i]) subArr.push(mainArr[i]);
    }
    return subArr;
  }

  handleCheckboxChange(index){
    this.newArr[index] = !this.newArr[index];
    const updatedValue = this.morphNewToOld(this.props.options, this.newArr);
    let vState = this.props.validate(updatedValue);
    this.props.onChange(updatedValue,vState);
  }

  alignCheckboxes(arr, cols){
   const styleObj = {flexBasis:`${100/cols}%`}; //Dividing the container into required columns
   return arr.map((item,index)=>(
     <CheckboxWrapper
       key={index}
       index={index}
       value={this.newArr[index]}
       onChange={this.handleCheckboxChange}
       style={styleObj}>
       {item}
     </CheckboxWrapper>
    ));
  }

  render(){
    let errorField = !this.props.validationState && this.state.clicked;
    return(
      <div onFocus={this.handleClick}>
        <label className="pt-label pt-inline" style={{display: "flex"}}>
          <div style={{flex:"1"}}>
            Working Days
            {(errorField)?<div className="helpText" >{this.props.helpText}</div>:null}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",flex:"1",justifyContent:"flex-end"}}>
            {this.alignCheckboxes(this.props.options,this.props.groupColumns)}
          </div>
        </label>

     </div>
    );
  }

}

LabelledCheckboxGroup.propTypes = {
  children: React.PropTypes.string,
  options: React.PropTypes.array, //Array of individual checkbox labels
  groupColumns: React.PropTypes.number,
  value: React.PropTypes.array, //Array of selected checkboxes
  onChange: React.PropTypes.func,
  validationState: React.PropTypes.bool,
  validate: React.PropTypes.func,
  helpText: React.PropTypes.string,
}

//option =      ["option1","option2","option3"]
//value =                 ["option2","option3"]
//new value =  [  false,     true,     true]

export default LabelledCheckboxGroup;
