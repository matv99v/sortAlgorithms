import React from 'react';
import './Bar.less';


export default class Bar extends React.Component {
    render() {
        return (
            <div className='Bar__bar'
                 style={{
                     backgroundColor: this.props.color,
                     width          : this.props.amount + '%'
                 }} >
            </div>

        );
    }
}
