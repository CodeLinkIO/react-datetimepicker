import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import Label from './Label'
import DateField from './DateField'
import TimeField from './TimeField'
import Calendar from '../calendar/Calendar'
import ApplyCancelButtons from './ApplyCancelButtons'
import ActiveNotifier from './ActiveNotifier'
import moment from 'moment'
import ShouldUpdate from "../ShouldUpdate";

class DatePicker extends ShouldUpdate {

  render(){
    //If button property present display buttons
    let buttons;
    if(this.props.enableButtons){
      buttons = <ApplyCancelButtons changeVisibleState={this.props.changeVisibleState} applyCallback={this.props.applyCallback} local={this.props.local} maxDate={this.props.maxDate}/>;
    }
    return(
      <div className="fromDateTimeContainer">
        <div className="fromDateHourContainer">
          <Label label={this.props.label}/>
          <DateField
            date={moment(this.props.date)}
            dateTextFieldCallback={this.props.dateTextFieldCallback}
            onChangeDateTextHandlerCallback={this.props.onChangeDateTextHandlerCallback}
            dateLabel={this.props.dateLabel}
            mode={this.props.mode}
            changeSelectingModeCallback={this.props.changeSelectingModeCallback}
          />
          <TimeField
            date={this.props.date}
            timeChangeCallback={this.props.timeChangeCallback}
            mode={this.props.mode}
          />
        </div>
        <Calendar
          date={this.props.date}
          mode={this.props.mode}
          selectedSide={this.props.selectedSide}
          otherDate={this.props.otherDate}
          maxDate={this.props.maxDate}
          dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
          keyboardCellCallback={this.props.keyboardCellCallback}
          focusOnCallback={this.props.focusOnCallback}
          focusDate={this.props.focusDate}
          cellFocusedCallback={this.props.cellFocusedCallback}
          local={this.props.local}
        />
        <ActiveNotifier
          selectingModeFrom={this.props.selectingModeFrom}
          mode={this.props.mode}
        />
        {buttons}
      </div>
    );
  }
}
export default DatePicker
