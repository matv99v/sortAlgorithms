import React  from 'react';
import Col    from 'react-bootstrap/lib/Col';
import Row    from 'react-bootstrap/lib/Row';
import Grid    from 'react-bootstrap/lib/Grid';
import './SortFooter.less';

export default class SortFooter extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row style={{fontSize: '11px', textAlign: 'center'}}>
                    <Col xs={6} sm={6} className='SortFooter__Col_compares'>
                        comparisons {this.props.compares}
                    </Col>
                    <Col xs={6} sm={6} className='SortFooter__Col_swaps'>
                        swaps {this.props.swaps}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
