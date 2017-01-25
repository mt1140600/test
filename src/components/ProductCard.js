import React, {Component} from 'react';
import {Tag, Classes} from "@blueprintjs/core"

class ProductCard extends Component{

  constructor(){
    super();
    this.image = null;  //Hack with ref. Although ref should be unique, all our refs are this.image. but there can only be one this.image per class in our case. So, this.image refers to the corresponding image in the class
  }

  renderTags = (item, index) => {
    return(
      <div  key={index} style={{marginRight: 10, marginBottom: 5, display: "inline-block"}}>
        <Tag className={`${Classes.MINIMAL} pt-round`}> {item} </Tag>
      </div>
    )
  }

  imageLoaded = () => { //Not resizing image. Maintaining height-width ratio but re-centering image.
    this.image.style.left = `${(75 - this.image.width)/2}px`;
  }

  render(){
    return(
        <div className="pt-card" style={{width: 500, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10}}>
          <div style={{ height: 75, width: 75, overflow: "hidden" }}>
            <img ref={(element) => {this.image = element}} src={this.props.image} style={{ height: 75, position: "relative" }} onLoad= {this.imageLoaded}/>
          </div>
          <div style={{flex: 1, marginLeft: "3.5%", overflow: "auto"}}>
            <h5><a href="#" style={{fontSize: "small"}}>{this.props.name}</a></h5>
            <div>{this.props.desc.map(this.renderTags)}</div>
          </div>
        </div>
    );
  }
}

ProductCard.propTypes = {
  name: React.PropTypes.string,
  image: React.PropTypes.string,
  desc: React.PropTypes.array
}

ProductCard.defaultProps = {
  image: "http://res.cloudinary.com/prokure/image/upload/v1485256188/download_zjfsag.png"
}

export default ProductCard;
