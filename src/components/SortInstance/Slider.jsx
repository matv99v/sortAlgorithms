import React from 'react';

export default class Slider extends React.Component {
    handleChange = (e) => {
        this.props.onRangeChange(e.target.value);
    }

    render() {
        return (
            <div>
                <input type     = 'range'
                       name     = 'points'
                       min      = '1'
                       max      = '1000'
                       step     = '1'
                       value    = {this.props.delay}
                       onChange = {this.handleChange}
                />
            </div>
        );
    }
}
