import React      from 'react';
import Grid       from 'react-bootstrap/lib/Grid';
import Col        from 'react-bootstrap/lib/Col';
import Row        from 'react-bootstrap/lib/Row';
import Button     from 'react-bootstrap/lib/Button';
import Slider     from './SortInstance/Slider.jsx';
import StupidSort from './StupidSort.jsx';
import BubbleSort from './BubbleSort.jsx';

export default class App extends React.Component {
    state = {
        isSorting    : false,
        delay        : 250,
        numOfElements: 15,
        done         : 0
    };

    handleDelayRangeChange = delay => {
        this.setState({delay});
    };

    handleElementsAmountRangeChange = numOfElements => {
        this.setState({numOfElements});
    };

    handleSortClick = () => {
        this.setState({isSorting: true, done: 0});
    }

    notifyIfSorted = () => {
        this.setState({done: this.state.done + 1});
        if (this.state.done === this.refs.sortInstances.props.children.length) {
            this.setState({isSorting: false});
        }
    };

    render() {
        return (
            <Grid >

                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <Button bsSize   = 'xsmall'
                                disabled = {this.state.isSorting}
                                onClick  = {this.handleSortClick}
                                style    = {{fontSize: '16px'}}>
                            Start
                        </Button>
                    </Col>
                </Row>

                <Row >
                    <Col xs={2} sm={2} md={2}>
                        delay: {this.state.delay}
                    </Col>

                    <Col xs={10} sm={10} md={10}>
                        <Slider onRangeChange = {this.handleDelayRangeChange}
                                value         = {this.state.delay}
                                min           = '1'
                                max           = '1000'
                                disabled      = {false} />
                    </Col>
                </Row>

                <Row >
                    <Col xs={2} sm={2} md={2}>
                        amount: {this.state.numOfElements}
                    </Col>

                    <Col xs={10} sm={10} md={10}>
                        <Slider onRangeChange = {this.handleElementsAmountRangeChange}
                                value         = {this.state.numOfElements}
                                min           = '2'
                                max           = '50'
                                disabled      = {this.state.isSorting} />
                    </Col>
                </Row>

                <Row ref='sortInstances'>
                    {
                        [...Array(1)].map((el, i) => {
                            return <Col xs={12} sm={6} md={4} key={i} style={{marginBottom: '10px'}} >
                                       <StupidSort isActive      = {this.state.isSorting}
                                                   delay         = {this.state.delay}
                                                   ifSorted      = {this.notifyIfSorted}
                                                   numOfElements = {this.state.numOfElements} />
                                   </Col>;
                        })
                    }

                    <Col xs={12} sm={6} md={4} style={{marginBottom: '10px'}} >
                        <BubbleSort isActive      = {this.state.isSorting}
                                    delay         = {this.state.delay}
                                    ifSorted      = {this.notifyIfSorted}
                                    numOfElements = {this.state.numOfElements} />
                    </Col>

                </Row>


            </Grid>
        );
    }
}
