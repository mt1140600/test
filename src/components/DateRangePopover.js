import React, {Component} from 'react';
import { InputGroup, Popover, Classes, Position, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { DateRange, DateRangePicker} from '@blueprintjs/datetime';
import moment from "moment";

class DateRangePopover extends Component{

  constructor(){
    super();
    this.state={ allowSingleDayRange: false, dateRange: [null, null]};
  }

  handleDateChange = (dateRange) => {
    // console.log(moment.utc(dateRange[0]).format());
    this.setState({ dateRange });
  }

  handleDateSelected = () => {
    console.log("searching ", this.state.dateRange);
    this.props.onSelect(this.state.dateRange);
  }

  componentDidMount(){
    this.setState({dateRange: this.props.dateRange});
  }

  componentWillReceiveProps(nextProps){
    this.setState({dateRange: nextProps.dateRange});
  }

  clearDate = (event) => {
    event.stopPropagation();
    this.setState({ dateRange: [null, null]});
    this.props.onSelect([null, null]);
  }

  getText = (value) => {
    let returnValue = (value[0])? moment(value[0]).format("DD/MM/YY") : "";
    returnValue = (value[1])? returnValue + " to " + moment(value[1]).format("DD/MM/YY") : returnValue;
    return returnValue;
  }

  render(){
    let textValue = this.getText(this.state.dateRange);
    const [start, end] = this.state.dateRange;


    let popoverContent = (
      <DateRangePicker
        allowSingleDayRange={true}
        className={Classes.ELEVATION_1}
        onChange={this.handleDateChange} /> );

    return(
      <Popover
        content={popoverContent}
        popoverClassName="pt-popover-content-sizing"
        position={Position.BOTTOM_LEFT}
        useSmartPositioning={true}
        onClose={this.handleDateSelected}
      >
        <div className="pt-input-group" style={this.props.style}>
          <span className="pt-icon pt-icon-calendar"></span>
          <input style={{width: 200}}className="pt-input" value={textValue} />
          {
            (this.state.dateRange[0])?
              <span className="pt-icon pt-icon-small-cross" onClick={this.clearDate}></span>
            :
              null
          }

        </div>

      </Popover>
    );
  }
}

DateRangePopover.propTypes = {
    dateRange: React.PropTypes.array, //[fromDate, toDate]
    onSelect: React.PropTypes.func,
    style: React.PropTypes.object
}

export default DateRangePopover;
