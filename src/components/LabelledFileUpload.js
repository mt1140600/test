import React, {Component} from 'react';
// import cloudinary from 'cloudinary';


// cloudinary.config({
//   cloud_name: 'dtvfkbdm8',
//   api_key: '627676656862973',
//   api_secret: 'bFVBCjOqOj3dw1_9N5h8HzITR44'
// });

class LabelledFileUpload extends Component{

  handleChange = (event) =>{
      console.log(event.target.value);
      // cloudinary.uploader.upload(event.target.value, function(result) {
      //   console.log(result)
      // });
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
