import React  from 'react';
import Bar    from './Bar.jsx';
import Slider from './Slider.jsx';
import Button from 'react-bootstrap/lib/Button';

import asyncIterator    from '../utils/asyncIterator';
import swapArrMembers   from '../utils/swapArrMembers';
import delayFuncPromise from '../utils/delayFuncPromise';


export default class StupidSort extends React.Component {
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

        asyncIterator(
            // number of iteration steps
            this.state.numOfElements - 1,

            // itreration body
            loop => {
                console.log('----====iteration====----');
                const iCurr        = loop.getIteration();
                const iNext        = iCurr + 1;
                const {array}      = this.state;
                const boundPromise = delayFuncPromise.bind(null, this.state.delay);


                boundPromise( () => {
                    console.log(`compare array ind ${iCurr} and ${iNext}`);
                    this.setState({
                        checkInd: [iCurr, iNext],
                        status  : array[iCurr] > array[iNext] ? 'swap' : 'iterate'
                    });
                })
                .then( () => {
                    console.log(`what should be done: ${this.state.status}`);
                    if (this.state.status === 'swap') {
                        return boundPromise( () => {
                            console.log('!!!swapping elements, i = 0!!!');
                            this.setState({ array: swapArrMembers(this.state.array, this.state.checkInd) });
                            loop.reset();
                        });
                    }
                })
                .then(loop.next);
            },

            // iteration is  over
            () => {
                delayFuncPromise(this.state.delay, () => {
                    this.setState({
                        checkInd: [],
                        status  : 'sorted'
                    });
                    console.log('sorted!');
                });
            }
        );
    };

    handleRangeChange = delay => {
        this.setState({delay});
    };

    render() {
        return (
            <div>
                <h3>Stupid sort, delay: {this.state.delay} ms</h3>

                <Slider onRangeChange = {this.handleRangeChange}
                       delay          = {this.state.delay}
                />

                <Button bsStyle="success"
                        onClick={this.handleStart}
                        disabled={!!this.state.status}>Start</Button>

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
