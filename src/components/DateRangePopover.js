import React, {Component} from 'react';
import { Popover, Classes, Position, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { DateRange, DateRangePicker} from '@blueprintjs/datetime';
import moment from "moment";

const Moment: React.SFC<{ date: Date, format?: string }> = ({ date, format = "dddd, LL" }) => {
    const m = moment(date);
    if (m.isValid()) {
        return <Tag className="pt-large pt-minimal pt-intent-primary">{m.format(format)}</Tag>;
    } else {
        return <Tag className="pt-large pt-minimal">no date</Tag>;
    }
};

class DateRangePopover extends Component{

  constructor(){
    super();
    this.state={ allowSingleDayRange: false, dateRange: [null, null]};
  }

  handleDateChange = (dateRange) => {
    this.setState({ dateRange });
  }

  handleDateSelected = () => {
    this.props.onSelect(this.state.dateRange);
  }

  componentDidMount(){
    this.setState({dateRange: this.props.dateRange});
  }

  componentWillReceiveProps(nextProps){
    this.setState({dateRange: nextProps.dateRange});
  }

  render(){

    const [start, end] = this.state.dateRange;

    let popoverContent = (
      <DateRangePicker
        allowSingleDayRange={false}
        className={Classes.ELEVATION_1}
        onChange={this.handleDateChange} /> );

    return(
      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 15}}>

        <Popover content={popoverContent}
                 popoverClassName="pt-popover-content-sizing"
                 position={Position.BOTTOM_LEFT}
                 useSmartPositioning={true}>
          <button className="pt-button" style={{marginRight: 10}}> Date Range  <span className="pt-icon-standard pt-icon-calendar pt-align-right"></span> </button>
        </Popover>

        <div style={{marginRight: 10}}>
          <Moment date={start} />
          <span className={`${Classes.ICON_LARGE} ${Classes.iconClass("arrow-right")}`} />
          <Moment date={end} />
        </div>

        <button className="pt-intent-success pt-button" onClick={this.handleDateSelected}>Search</button>

      </div>
    );
  }
}

DateRangePopover.propTypes = {
    dateRange: React.PropTypes.array, //[fromDate, toDate]
    onSelect: React.PropTypes.func
}

export default DateRangePopover;
