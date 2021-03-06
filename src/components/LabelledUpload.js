import React, {Component} from 'react';
import {Popover, PopoverInteractionKind, Position,} from "@blueprintjs/core";
import ImageThumbnail from "../components/ImageThumbnail";
/* global cloudinary*/

class LabelledUpload extends Component{

  constructor(){
    super();
    this.state = {fileName: "",fileURL: "", showHelpText: false};
  }
  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: this.props.cloudinaryCloudName, upload_preset: this.props.cloudinaryUploadPreset, folder:this.props.cloudinaryFolder},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          console.log(result[0].secure_url);
          this.setState({fileName: result[0].original_filename, fileURL: result[0].secure_url, showHelpText: false});
          this.props.onChange(result[0].secure_url, true);
       }
       else{
         console.log(error);
         if(this.props.validationState){ //If there is a valid image already uploaded or it's validation state is true by default, retain it but show helpText saying that new image couldnt be uploaded
          this.setState({showHelpText: true});
         }
         else { //If there is no image already uploaded, then make validation state as false
          this.props.onChange("", false);
         }
       }
      }
    );
  }
  preventClick = (event) => {
    console.log("prevent event");
    event.preventDefault();
  }
  render(){
    let length = 0;
    if(typeof(this.props.value) !== "undefined")  length = this.props.value.length;
    return( //If validationState is null, neither helpText nor successText will be shown
      <label className="pt-label pt-inline container">
        <div  style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            {this.props.children}
          </div>
          <div className="pt-file-upload">
            <button id="upload_widget_opener" className="pt-button pt-icon-upload" style={{minWidth: "120px", maxHeight: "30px", overflow:"hidden"}} onClick={this.handleClick}>Choose File</button>
          </div>
        </div>
        {(this.props.validationState === false || this.state.showHelpText)?<div className="helpText" >{this.props.helpText}</div>:null}
        {(this.props.validationState === true && length > 0)?
          //enclosing popover in a div cuz it is a span otherwise
          <div onClick={this.preventClick}>
            <Popover content={<ImageThumbnail source={this.props.value}/>}
               interactionKind={PopoverInteractionKind.HOVER}
               popoverClassName="pt-popover-content-sizing"
               position={Position.LEFT}
               useSmartPositioning={false}>
               <div href={`${this.state.fileURL}`} className="successText" >{`${this.state.fileName} Uploaded`}</div>
             </Popover>
          </div>
          :null}
      </label>
    );
  }
}

const dummy = () => {};

LabelledUpload.propTypes = {
    children: React.PropTypes.node,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    validationState: React.PropTypes.bool,
    validate: React.PropTypes.func,
    helpText: React.PropTypes.string,
    cloudinaryCloudName: React.PropTypes.string,
    cloudinaryUploadPreset: React.PropTypes.string,
    cloudinaryFolder: React.PropTypes.string
};

LabelledUpload.defaultProps = {
  cloudinaryCloudName: "dtvfkbdm8",
  cloudinaryUploadPreset: "dgfm0gcv",
  validationState: false,
  helpText: "",
  validate: dummy
}

export default LabelledUpload;
