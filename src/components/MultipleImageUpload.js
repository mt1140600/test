/* global cloudinary*/
import React, {Component} from 'react';
let Immutable = require('immutable');

class MultipleImageUpload extends Component{

  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: this.props.cloudinaryCloudName, upload_preset: this.props.cloudinaryUploadPreset},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          let newArray = [...this.props.value.images];
          for(let i=0; i<result.length; i++){
            newArray.push( result[i].secure_url );
          }
          // this.setState({ value: newValue});
          this.props.onChange({
            images: newArray,
            defaultImage: this.props.value.defaultImage
          });
       }
       else{
         console.log(error);
       }
      }
    );
  }

  removeImage = (index, event) => {
    event.stopPropagation(); //to prevent removebutton from bubbling to setDefaultImage
    if(this.props.value.defaultImage === index){
      // console.log("resetting default ");
      this.props.onChange({
        images: this.props.value.images,
        defaultImage: 0
      });
    }
    let newArray = [...this.props.value.images];
    newArray.splice(index,1);
    this.props.onChange(Object.assign({}, this.props.value, {images: newArray}));
  }

  setDefaultImage = (index) => {
    this.props.onChange( Object.assign({}, this.props.value, {defaultImage: index}) );
  }

  renderImages = (item, index) => {
    let imageStyle = {height: 75, boxSizing: "content-box", borderRadius: 4};
    (this.props.value.defaultImage === index)? Object.assign(imageStyle, {border: "3px solid #48AFF0"}): null;

    return(
      <div key={index} style={{position: "relative", marginRight: 10}} onClick={this.setDefaultImage.bind(this, index)}>
        <img src={item} style={imageStyle}/>
        <button className="pt-button pt-intent-danger pt-icon-small-cross" style={{position: "absolute", top: 0, right: 0}} onClick={this.removeImage.bind(this, index)}/>
      </div>
    )
  }

  render(){
    return(
      <div style={{marginBottom: 10}}>
        <label className="flexRow">
          <div style={{flex: 1}}>{this.props.children}</div>
          <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
            <button id="upload_widget_opener" className="pt-button pt-icon-upload" style={{maxWidth: "200px", maxHeight: "30px", overflow:"hidden"}} onClick={this.handleClick}>Upload Images</button>
          </div>
        </label>
        {
          (this.props.value.images.length > 0)?
          <div>
            <br/>
            <p style={{margin: 0}}> <i>Choose default image:</i> </p>
            <div className="flexRow ImagesContainer ">
              {
                this.props.value.images.map(this.renderImages)
              }
            </div>
          </div>
          :
          null
        }
      </div>
    );
  }
}

MultipleImageUpload.propTypes = {
  children: React.PropTypes.node,
  // value: React.PropTypes.instanceOf(Immutable.List),
  // defaultImage: React.PropTypes.number,
  value: React.PropTypes.object,
  onChange: React.PropTypes.func,
  // handleChange = (newImages, defaultImage) =>{
  //     this.setState({images: newImages, defaultImage: defaultImage});
  //   }
  cloudinaryCloudName: React.PropTypes.string,
  cloudinaryUploadPreset: React.PropTypes.string
}

MultipleImageUpload.defaultProps = {
  cloudinaryCloudName: "dtvfkbdm8",
  cloudinaryUploadPreset: "dgfm0gcv"
}

export default MultipleImageUpload;
