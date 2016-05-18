import React      from 'react';
import StupidSort from './StupidSort.jsx';
import BubbleSort from './BubbleSort.jsx';
import Col        from 'react-bootstrap/lib/Col';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Col xs={6}>
                    <StupidSort />
                </Col>
                <Col xs={6}>
                    <BubbleSort />
                </Col>
            </div>
        );
    }
}
