import { ModeEnum, PositionEnum } from '../DateTimeRangePicker'
import moment from 'moment'

export const generateHours = () => {
    let hours = [];
    for(let i = 0; i < 24; i++){
        hours.push(i);
    }
    return hours;
}

export const generateMinutes = () => {
    let minutes = [];
    for(let i = 0; i < 60; i++){
        if(i < 10){
            minutes.push("0" + i.toString());
        }else{
            minutes.push(i.toString());
        }
    }
    return minutes;
}

function workOutMonthYear(date, secondDate, mode, selectedSide = PositionEnum.left){
  let selectedMonth = date.month();
  let otherMonth = secondDate.month();
  if(selectedMonth !== otherMonth){
    return date;
  }
  if (selectedSide === PositionEnum.left && mode === ModeEnum.end) {
    let nextMonth = JSON.parse(JSON.stringify(date));
    nextMonth = moment(nextMonth);
    nextMonth.add(1, "month");
    return nextMonth;
  }
  if (selectedSide === PositionEnum.right && mode === ModeEnum.start) {
    let lastMonth = JSON.parse(JSON.stringify(date));
    lastMonth = moment(lastMonth);
    lastMonth.subtract(1, "month");
    return lastMonth;
  }
  return date;
}

export const getMonth = (date, secondDate, mode, selectedSide) => {
  return workOutMonthYear(date, secondDate, mode, selectedSide).month();
}

export const getYear = (date, secondDate, mode, selectedSide) => {
  return workOutMonthYear(date, secondDate, mode, selectedSide).year();
}

const getDaysBeforeStartMonday= (firstDayOfMonth) => {
    let fourtyTwoDays = []
    let dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month
    // Case whereby day before is a Saturday (6) and we require Saturday back to Monday for that week
    if(dayBeforeFirstDayOfMonth === -1){
        for(let i = 6; i > 0; i--){
            let firstDayOfMonthCopy = firstDayOfMonth.clone();
            firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
            fourtyTwoDays.push(firstDayOfMonthCopy);
        }
    }
    // Case Whereby day before first day is the Sunday (0), therefore we want the entire previous week
    if(dayBeforeFirstDayOfMonth === 0){
        for(let i = 7; i > 0; i--){
            let firstDayOfMonthCopy = firstDayOfMonth.clone();
            firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
            fourtyTwoDays.push(firstDayOfMonthCopy);
        }
    }
    // Every other day
    else{
        for(let i = dayBeforeFirstDayOfMonth; i > 0; i--){
            let firstDayOfMonthCopy = firstDayOfMonth.clone();
            firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
            fourtyTwoDays.push(firstDayOfMonthCopy);
        }
    }
    return fourtyTwoDays;
}

const getDaysBeforeStartSunday= (firstDayOfMonth) => {
    let fourtyTwoDays = []
    let dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month

    // Case whereby we need all previous week days
    if(dayBeforeFirstDayOfMonth === -1){
        for(let i = 7; i > 0; i--){
            let firstDayOfMonthCopy = firstDayOfMonth.clone();
            firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
            fourtyTwoDays.push(firstDayOfMonthCopy);
        }
    }
    // Every other day
    else{
        for(let i = dayBeforeFirstDayOfMonth + 1; i > 0; i--){
            let firstDayOfMonthCopy = firstDayOfMonth.clone();
            firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
            fourtyTwoDays.push(firstDayOfMonthCopy);
        }
    }
    return fourtyTwoDays;
}

const getDaysBeforeStart = (firstDayOfMonth, sundayFirst) => {
    if(!sundayFirst){
        return getDaysBeforeStartMonday(firstDayOfMonth);
    }else{
        return getDaysBeforeStartSunday(firstDayOfMonth);
    }
}

export const getFourtyTwoDays = (initMonth, initYear, sundayFirst) => {
    let fourtyTwoDays = []
    let firstDayOfMonth = moment(new Date(initYear, initMonth, 1));

    fourtyTwoDays = getDaysBeforeStart(firstDayOfMonth, sundayFirst);
    // Add in all days this month
    for(let i = 0; i < firstDayOfMonth.daysInMonth(); i++){
        fourtyTwoDays.push(firstDayOfMonth.clone().add(i,'d'));
    }
    // Add in all days at the end of the month until last day of week seen
    let lastDayOfMonth = moment(new Date(initYear, initMonth, firstDayOfMonth.daysInMonth()));
    let toAdd = 1;
    let gotAllDays = false
    while(!gotAllDays){
        if(fourtyTwoDays.length >= 42){
            gotAllDays = true;
            break;
        }
        fourtyTwoDays.push(lastDayOfMonth.clone().add(toAdd,'d'));
        toAdd++;
    }
    return fourtyTwoDays;
};

export const isInbetweenDates = (isStartDate, dayToFindOut, start, end) => {
    let isInBetweenDates;
    if(isStartDate){
        isInBetweenDates = dayToFindOut.isAfter(start) && dayToFindOut.isBefore(end);
    }else{
        isInBetweenDates = dayToFindOut.isBefore(start) && dayToFindOut.isAfter(end);
    }
    return isInBetweenDates;
};

export const isValidTimeChange = (mode, date, start, end) => {
    let modeStartAndDateSameOrBeforeStart = (mode === "start") && (date.isSameOrBefore(end));
    let modeEndAndDateSameOrAfterEnd = (mode === "end") && (date.isSameOrAfter(start));
    return modeStartAndDateSameOrBeforeStart || modeEndAndDateSameOrAfterEnd;
}

export const startDateStyle = () => {
    return {
        borderRadius:"4px 0 0 4px",
        borderColour:"transparent",
        color:"#fff",
        backgroundColor:"#446ab5",
        cursor:"pointer"
    };
};

export const endDateStyle = () => {
    return {
        borderRadius:"0 4px 4px 0",
        borderColour:"transparent",
        color:"#fff",
        backgroundColor:"#446ab5",
        cursor:"pointer"
    };
};

export const inBetweenStyle = () => {
    return {
        borderRadius:"0",
        borderColour:"transparent",
        color:"#000",
        backgroundColor:"#ebf4f8",
        cursor:"pointer"
    };
};

export const normalCellStyle = () => {
    return {
        borderRadius:"0 0 0 0",
        borderColour:"transparent",
        color:"black",
        backgroundColor:""
    };
};

export const hoverCellStyle = (between) => {
    let borderRadius = "4px 4px 4px 4px";
    if(between){
        borderRadius = "0 0 0 0";
    }
    return {
        borderRadius:borderRadius,
        borderColour:"transparent",
        color:"inherit",
        backgroundColor:"#eee",
        cursor:"pointer"
    };
};

export const greyCellStyle = () => {
    let borderRadius = "4px 4px 4px 4px";
    return {
        borderRadius:borderRadius,
        borderColour:"transparent",
        color:"#999",
        backgroundColor:"#fff",
        cursor:"pointer",
        opacity:"0.25"
    };
};

export const invalidStyle = () => {
    let style = greyCellStyle();
    style.cursor = "not-allowed";
    return style;
};
