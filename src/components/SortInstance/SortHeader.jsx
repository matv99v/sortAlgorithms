import React  from 'react';
import Slider from './Slider.jsx';
import Button from 'react-bootstrap/lib/Button';
import Col    from 'react-bootstrap/lib/Col';
import Row    from 'react-bootstrap/lib/Row';
import Glyphicon    from 'react-bootstrap/lib/Glyphicon';

export default class SortHeader extends React.Component {
    handleRangeChange = delay => {
        this.props.onChangeRange(delay);
    };

    handleStartClick = () => {
        this.props.onStartClick();
    };

    render() {
        return (
            <div className='text-center' style={{fontSize: '14px', margin: '15px 0 0 0'}}>

                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col xs={12}>
                        {this.props.sortName}
                        <Button bsSize='xsmall'
                                onClick={this.handleStartClick}
                                disabled={!!this.props.status}
                                style={{fontSize: '16px', marginLeft: '10px'}}>
                            <span><Glyphicon glyph="sort-by-attributes"/></span>
                        </Button>
                    </Col>
                </Row>

                <Row style={{padding: '0 15px'}}>
                    <Slider onRangeChange = {this.handleRangeChange}
                            delay         = {this.props.delay} />
                </Row>
            </div>
        );
    }
}
