import React from 'react';
import './Bar.less';

export default class Bar extends React.Component {
    render() {
        return (
            <div className={this.props.className}
                 style={{
                     backgroundColor: this.props.color,
                     width          : this.props.amount + '%'
                 }} >
            </div>
        );
    }
}
