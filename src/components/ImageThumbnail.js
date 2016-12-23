import React, {Component} from 'react';

class ImageThumbnail extends Component{
  render(){
    return(
      <img src={this.props.source} height={100} />
    );
  }
}

ImageThumbnail.propTypes = {
  source: React.PropTypes.string
}

export default ImageThumbnail;
