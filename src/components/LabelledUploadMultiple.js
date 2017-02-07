/* global cloudinary*/
import React, {Component} from 'react';
let Immutable = require('immutable');
import {Popover, PopoverInteractionKind, Position,} from "@blueprintjs/core";
import ImageThumbnail from "../components/ImageThumbnail";

class LabelledUploadMultiple extends Component{

  constructor(){
    super();
    this.state= { fileNames: [], showHelpText: false};
  }

  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: this.props.cloudinaryCloudName, upload_preset: this.props.cloudinaryUploadPreset},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          let newArray = [...this.props.value];
          for(let i=0; i<result.length; i++){
            newArray.push( result[i].secure_url );
          }
          this.props.onChange( newArray, newArray.length >= this.props.minImages);  //validation true minImage criteria is satisfied

          newArray = [...this.state.fileNames];
          for(let i=0; i<result.length; i++){
            newArray.push( result[i].original_filename );
          }
          this.setState({fileNames: newArray, showHelpText: false});
       }
       else{
         console.log(error);
         this.setState({ showHelpText: true });
       }
    });
  }

  removeImage = (index, event) => {
    let newArray = [...this.props.value];
    newArray.splice(index,1);
    this.props.onChange(newArray, newArray.length >= this.props.minImages);

    newArray = this.state.fileNames;
    newArray.splice(index,1);
    this.setState({fileNames: newArray, showHelpText: false});
  }

  renderImages = (item, index) => {
    let fileName = (this.state.fileNames.length > index)? this.state.fileNames[index] : "";
    return(
      <Popover content={<ImageThumbnail source={item}/>}
        interactionKind={PopoverInteractionKind.HOVER}
        popoverClassName="pt-popover-content-sizing"
        position={Position.LEFT}
        key={index}
      >
        <div>
          <div className="successText" style={{marginRight: "30px", overflow: "hidden"}}>{`${fileName} Uploaded`}</div>
          <button className="pt-button pt-intent-danger pt-minimal pt-icon-small-cross" style={{position: "absolute", top: -5, right: 0}} onClick={this.removeImage.bind(this, index)}/>
        </div>
      </Popover>
    );
  }

  render(){
    return(
      <div style={{marginBottom: 10}}>
        <label className="flexRow">
          <div style={{flex: 1}}>{this.props.children}</div>
          <button id="upload_widget_opener" className="pt-button pt-icon-upload" style={{maxWidth: "130px", maxHeight: "30px", overflow:"hidden"}} onClick={this.handleClick}>Choose Files</button>
        </label>
        <br/>
        {
          (this.props.value.length > 0)?
          <div style={{display: "flex", flexDirection: "column"}}>
              {
                this.props.value.map(this.renderImages)
              }
          </div>
          :
          null
        }
        {
          (!this.props.validationState || this.state.showHelpText) &&
          <div className="helpText">{this.props.helpText}</div>
        }
      </div>
    );
  }
}

LabelledUploadMultiple.propTypes = {
  children: React.PropTypes.node,
  value: React.PropTypes.array,
  validationState: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  minImages: React.PropTypes.number,
  helpText: React.PropTypes.string,
  cloudinaryCloudName: React.PropTypes.string,
  cloudinaryUploadPreset: React.PropTypes.string
}

LabelledUploadMultiple.defaultProps = {
  cloudinaryCloudName: "dtvfkbdm8",
  cloudinaryUploadPreset: "dgfm0gcv"
}

export default LabelledUploadMultiple;
