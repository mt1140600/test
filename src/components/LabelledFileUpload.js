import React, {Component} from 'react';

class LabelledFileUpload extends Component{
  handleChange = (event) =>{
      console.log(event.target.value);
  }

  render(){
    return(
      <label className="pt-label pt-inline container">
        {this.props.children}
        <label className="pt-file-upload" style={{float:"right"}}>
          <input type="file" onChange={this.handleChange}/>
          <span className="pt-file-upload-input">Choose file...</span>
        </label>
      </label>
    );
  }
}

LabelledFileUpload.propTypes = {
  children: React.PropTypes.node
};

export default LabelledFileUpload;
