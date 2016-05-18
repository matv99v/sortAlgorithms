import React  from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col    from 'react-bootstrap/lib/Col';
import Row    from 'react-bootstrap/lib/Row';
import Glyphicon    from 'react-bootstrap/lib/Glyphicon';

export default class SortFooter extends React.Component {

    render() {
        return (
            <Row style={{fontSize: '11px', textAlign: 'center'}}>
                <Col xs={4}>delay {this.props.delay}</Col>
                <Col xs={4}>compares {this.props.compares}</Col>
                <Col xs={4}>swaps {this.props.swaps}</Col>
            </Row>
        );
    }
}
