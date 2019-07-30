import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import PropTypes from 'prop-types';
import ShouldUpdate from "../ShouldUpdate";

class Label extends ShouldUpdate {
  render(){
    return(
        <div className="dateTimeLabel">
            {this.props.label}
        </div>
    );
  }
}
export default Label

Label.propTypes = {
    label: PropTypes.string.isRequired,
};
