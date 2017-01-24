import React, {Component} from 'react';
import {Popover, PopoverInteractionKind, Position,} from "@blueprintjs/core";
import ImageThumbnail from "../components/ImageThumbnail";
/* global cloudinary*/

class LabelledUpload extends Component{

  constructor(){
    super();
    this.state = {fileName: "",fileURL: ""};
  }
  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: this.props.cloudinaryCloudName, upload_preset: this.props.cloudinaryUploadPreset, folder:this.props.cloudinaryFolder},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          console.log(result[0].secure_url);
          this.setState({fileName: result[0].original_filename, fileURL: result[0].secure_url});
          this.props.onChange(result[0].secure_url, true);
       }
       else{
         console.log(error);
         this.props.onChange("", false);
       }
      }
    );
  }

  render(){
    return( //If validationState is null, neither helpText nor successText will be shown
      <label className="pt-label pt-inline container">
        {this.props.children}
        <div className="pt-file-upload" style={{float:"right"}}>
          <button id="upload_widget_opener" className="pt-button" style={{maxWidth: "200px", maxHeight: "30px", overflow:"hidden"}} onClick={this.handleClick}>Choose File</button>
        </div>
        {(this.props.validationState === false)?<div className="helpText" >{this.props.helpText}</div>:null}
        {(this.props.validationState === true)?
          //enclosing popover in a div cuz it is a span otherwise
          <div>
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
