import React, {Component} from 'react';
import { Popover, Classes, Position, PopoverInteractionKind, Tag } from '@blueprintjs/core';
import { DateRange, DateRangePicker} from '@blueprintjs/datetime';
import moment from "moment";

export const Moment: React.SFC<{ date: Date, format?: string }> = ({ date, format = "dddd, LL" }) => {
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
    this.state={ isOpen: false,   allowSingleDayRange: false, dateRange: [null, null]};

  }

  handleDateChange = (dateRange) => {
    this.setState({ dateRange });
  }

  togglePopover = () => {
    this.setState( (prevState, props) => { return { isOpen: !prevState.isOpen } } );
  }

  render(){

    const [start, end] = this.state.dateRange;

    let popoverContent = (
      <DateRangePicker
        allowSingleDayRange={false}
        className={Classes.ELEVATION_1}
        onChange={this.handleDateChange} /> );

    return(
      <div className="flexRow">
        <Popover content={popoverContent}
                 isOpen = { this.state.isOpen }
                 interactionKind={PopoverInteractionKind.CLICK}
                 popoverClassName="pt-popover-content-sizing"
                 position={Position.BOTTOM}
                 useSmartPositioning={true}>
          <button className="pt-button" onClick={this.togglePopover} > Date Range  <span className="pt-icon-standard pt-icon-calendar pt-align-right"></span> </button>
        </Popover>
        <div>
          <Moment date={start} />
          <span className={`${Classes.ICON_LARGE} ${Classes.iconClass("arrow-right")}`} />
          <Moment date={end} />
      </div>
      </div>
    );
  }
}

export default DateRangePopover;
