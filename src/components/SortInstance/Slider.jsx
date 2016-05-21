import React from 'react';
import './Slider.less';

export default class Slider extends React.Component {
    handleChange = (e) => {
        this.props.onRangeChange(e.target.value);
    }

    render() {
        return (
                <input type     = 'range'
                       min      = {this.props.min}
                       max      = {this.props.max}
                       step     = '1'
                       value    = {this.props.value}
                       onChange = {this.handleChange}
                       disabled = {this.props.disabled}
                       className ='Slider__slider_hoverState'
                />
        );
    }
}
