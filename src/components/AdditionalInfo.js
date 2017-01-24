import React, {Component} from 'react';
import LabelledTextArea from './LabelledTextArea';
import Immutable from 'immutable';

class AdditionalInfo extends Component{

    handleChange = ( index, event ) => {
      let newArray = [...this.props.value];
      newArray[index] = { info: event.target.value };
      this.props.onChange(newArray);
    }

    renderRow = ( item, index ) => {
      return(
        <div className="pt-input-group" key={index} style={{ marginBottom: 5 }}>
          <span className="pt-icon pt-icon-dot"></span>
          <input
            type="text"
            className="pt-input"
            value={item.info}
            style= {{ flex: 1 }}
            onChange = {this.handleChange.bind(null,index)}
            onClick = {this.addRow.bind(null, index)}
            type="text"
            dir="auto"
          />
        </div>
      );
    }

    addRow = (index) => {
      if(this.props.value.length - 1 === index){ //If the last row is clicked, add a row
        let newArray = [...this.props.value];
        newArray.push({ info: ""});
        this.props.onChange(newArray)
      }
    }

    render(){
      return(
        <div style={{marginBottom: 10}}>
          <div style= {{display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center"}}>
            <div>Additonal Info</div>
          </div>
          {this.props.value.map(this.renderRow)}
        </div>
      );
    }
}

AdditionalInfo.propTypes = {
  value: React.PropTypes.array,
  onChange: React.PropTypes.func
}

export default AdditionalInfo;
