import React, {Component} from 'react';
import LabelledUploadMultiple from '../components/LabelledUploadMultiple';
import * as constants from '../constants';
import * as fieldValidations from '../utils/fieldValidations';
/* global cloudinary*/

//Files uploaded get stored in productUploadDumb/user_id folder
class UploadProductDumb extends Component{
  constructor(){
    super();
    this.state={status: 0};
  }

  handleUpload = (value) => {
    cloudinary.openUploadWidget({ cloud_name: constants.cloudinaryCloudName, upload_preset: constants.cloudinaryProductUploadDumbPreset, folder: `productUploadDumb/${localStorage.getItem("user_id")}` },
    (error, result) => {
       console.log(error, result);
       if(error === null){
        this.setState({status: 1});
       }
       else{
         this.setState({status: 2});
       }
      }
    );
  }

  render(){
    return(
      <div className="tabs flexRow">
         {
            (this.state.status === 0)?
             <div className="xxlargeThin pseudoLink" onClick={this.handleUpload}>
               <span className="pt-icon-cloud-upload" style={{marginRight: 10}}/>
               Upload products?
             </div>
            :
              (this.state.status === 1)?
                <div style={{color: "green"}} className="xxlargeThin">
                  <span className="pt-icon-tick" style={{marginRight: 10}}/>
                  File has been uploaded
                  <div className="smallLink" onClick={this.handleUpload}>Upload more?</div>
                </div>
                :
                <div style={{color: "red"}} className="xxlargeThin">
                  <span className="pt-icon-warning-sign" style={{marginRight: 10}}/>
                  Error uploading file!
                  <div className="smallLink" onClick={this.handleUpload}>Try Again?</div>
                </div>
         }
      </div>
    );
  }
}

export default UploadProductDumb;
