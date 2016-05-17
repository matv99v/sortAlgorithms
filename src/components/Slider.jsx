import React from 'react';
import Rangeslider from 'react-rangeslider';

import './Slider.less';

export default class Slider extends React.Component {
    handleChange = (newDelay) => {
        this.props.onRangeChange(newDelay);
    }

    render() {
        return (
            <Rangeslider
                value={this.props.delay}
                orientation='horizontal'
                onChange={this.handleChange}
                min = {5}
                max = {2000}
            />
        );
    }
}
