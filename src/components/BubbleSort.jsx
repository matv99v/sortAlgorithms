import React  from 'react';
import Bar    from './SortInstance/Bar.jsx';
import Slider from './SortInstance/Slider.jsx';

import Button from 'react-bootstrap/lib/Button';
import Col    from 'react-bootstrap/lib/Col';
import Row    from 'react-bootstrap/lib/Row';

export default class BubbleSort extends React.Component {
    state = {
        delay        : 2000,
        numOfElements: 25,
        array        : [],
        checkInd     : [],
        status       : null
    };

    // fill up array with random values in range [1; 100]
    componentWillMount = () => {
        let i = this.state.numOfElements;
        const array = [];

        while (i) {
            --i;
            const rndNum = Math.floor(Math.random() * 100) + 1;
            array.push(rndNum);
        }

        this.setState({ array });
    };

    handleStart = () => {

        const bubbleSort = a => { // eslint-disable-line
            let _id, temp, flag = false, i = 0, length = a.length - 1;
            const step = () => {
                if (length > 1) {
                    this.setState({checkInd: [i - 1, i], status: 'iterate'});
                    if (i === length) {
                        length--;
                        i = 1;
                        flag = false;
                    } else {
                        i++;
                    }


                    if (a[i - 1] > a[i]) {
                        // this.setState({status: 'swap'});
                        temp = a[i];
                        a[i] = a[i - 1];
                        a[i - 1] = temp;
                        flag = true;

                        console.log(a);
                        this.setState({array: a});
                        setTimeout(step, this.state.delay);
                    } else {
                        this.setState({status: 'iterate'});
                        step();
                    }
                }
            };
            step();
        };

        bubbleSort(this.state.array);

    };

    handleRangeChange = delay => {
        this.setState({delay});
    };

    render() {
        return (
            <div>
                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col xs={8}>
                        <h5>Stupid sort, delay: {this.state.delay} ms</h5>
                    </Col>

                    <Col xs={4}>
                        <Button bsSize='xsmall'
                                onClick={this.handleStart}
                                disabled={!!this.state.status}
                                block
                                >
                        Start
                        </Button>
                    </Col>
                </Row>

                <Row style={{padding: '0 15px'}}>
                    <Slider onRangeChange = {this.handleRangeChange}
                            delay          = {this.state.delay}

                    />
                </Row>
                {
                    this.state.array.map( (el, i) => {
                        return <Bar amount = {el}
                                    key    = {i}
                                    color  = {(() => {
                                        if (this.state.status === 'iterate' && this.state.checkInd.indexOf(i) !== -1) {
                                            return 'yellow';
                                        }
                                        if (this.state.status === 'swap'    && this.state.checkInd.indexOf(i) !== -1) {
                                            return 'red';
                                        }
                                        if (this.state.status === 'sorted') {
                                            return 'aqua';
                                        }
                                    })()}
                        />;
                    })
                }
            </div>
        );
    }
}
