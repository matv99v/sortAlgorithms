import React from 'react';
import Rangeslider from 'react-rangeslider';

import './Slider.less';

export default class Slider extends React.Component {
    state = {value: 10};

    handleChange = (newDelay) => {
        this.props.onRangeChange(newDelay);
    }

    render() {
        return (
            <div>
                <Rangeslider
                    value={this.props.delay}
                    orientation="horizontal"
                    onChange={this.handleChange}
                    min = {25}
                    max = {1000}
                />
            </div>
        );
    }
}
