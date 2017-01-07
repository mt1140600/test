/* global cloudinary*/
import React, {Component} from 'react';
let Immutable = require('immutable');

class MultipleImageUpload extends Component{

  constructor(){
      super();
      this.state = { default: 0, value: Immutable.List(["https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg","https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg","https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg","https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg", "https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg", "https://res.cloudinary.com/dtvfkbdm8/image/upload/v1483769354/fqaq8ucamvlsu3riuw9z.jpg"]) };
  }

  handleClick = () => {
    cloudinary.openUploadWidget({ cloud_name: this.props.cloudinaryCloudName, upload_preset: this.props.cloudinaryUploadPreset},
    (error, result) => {
       console.log(error, result);
       if(error === null){
          let newValue = this.state.value;
          for(let i=0; i<result.length; i++){
            newValue = newValue.push( result[i].secure_url );
          }
          this.setState({ value: newValue});
          // this.props.onChange(result[0].secure_url, true);
       }
       else{
         console.log(error);
         this.props.onChange("", false);
       }
      }
    );
  }

  removeImage = (index, event) => {
    event.stopPropagation(); //to prevent removebutton from bubbling to setDefaultImage
    if(this.state.default === index){
      console.log("resetting default ");
      this.setState({default: 0});
    }
    this.setState({value: this.state.value.delete(index)});
  }

  setDefaultImage = (index) => {
    this.setState({default: index});
  }

  renderImages = (item, index) => {
    let imageStyle = {height: 75, boxSizing: "content-box", borderRadius: 4};
    (this.state.default === index)? Object.assign(imageStyle, {border: "3px solid #48AFF0"}): null;

    return(
      <div key={index} style={{position: "relative", marginRight: 10}} onClick={this.setDefaultImage.bind(this, index)}>
        <img src={item} style={imageStyle}/>
        <button className="pt-button pt-intent-danger pt-icon-small-cross" style={{position: "absolute", top: 0, right: 0}} onClick={this.removeImage.bind(this, index)}/>
      </div>
    )
  }

  render(){
    return(
      <div>
        <div className="flexRow">
          <div style={{flex: 1}}>{this.props.children}</div>
          <div style={{flex: 1}}>
            <button id="upload_widget_opener" className="pt-button pt-icon-upload" style={{maxWidth: "200px", maxHeight: "30px", overflow:"hidden"}} onClick={this.handleClick}>Upload Images</button>
          </div>
        </div>
        {
          (this.state.value.size > 0)?
          <div>
            <br/>
            <p style={{margin: 0}}> <i>Choose default image:</i> </p>
            <div className="flexRow ImagesContainer ">
              {
                this.state.value.map(this.renderImages)
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
  value: React.PropTypes.string,
  defaultImage: React.PropTypes.number,
  onChange: React.PropTypes.func,
  cloudinaryCloudName: React.PropTypes.string,
  cloudinaryUploadPreset: React.PropTypes.string
}

MultipleImageUpload.defaultProps = {
  cloudinaryCloudName: "dtvfkbdm8",
  cloudinaryUploadPreset: "dgfm0gcv"
}

export default MultipleImageUpload;
