import React, {Component} from 'react';

class LabelledFileUpload extends Component{
  render(){
    return(
      <label className="pt-label pt-inline container">
        {this.props.children}
        <label className="pt-file-upload" style={{float:"right"}}>
          <input type="file" />
          <span className="pt-file-upload-input">Choose file...</span>
        </label>
      </label>
    );
  }
}

export default LabelledFileUpload;
