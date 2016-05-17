import React  from 'react';
import Bar    from './Bar.jsx';
import Slider from './Slider.jsx';

import asyncIterator    from '../utils/asyncIterator';
import swapArrMembers   from '../utils/swapArrMembers';
import delayFuncPromise from '../utils/delayFuncPromise';


export default class App extends React.Component {
    state = {
        delay: 250,
        numOfElements: 25,
        array: [],
        checkInd: [],
        status: null
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

    componentDidMount = () => {

        asyncIterator(
            // number of iteration steps
            this.state.numOfElements - 1,

            // itreration body
            loop => {
                const iCurr    = loop.getIteration();
                const iNext    = iCurr + 1;
                const {array} = this.state;

                delayFuncPromise(this.state.delay,
                    () => {
                        this.setState({
                            checkInd: [iCurr, iNext],
                            status  : array[iCurr] > array[iNext] ? 'swap' : 'iterate'
                        });
                    }
                ).then(() => {
                    if (this.state.status === 'swap') {
                        return delayFuncPromise(this.state.delay,
                            () => {
                                this.setState({ array: swapArrMembers(this.state.array, this.state.checkInd) });
                                loop.reset();
                            }
                        );
                    }
                }).then(loop.next);
            },

            // iteration is  over
            () => {
                delayFuncPromise(this.state.delay,
                    () => {
                        this.setState({
                            checkInd: [],
                            status  : 'sorted'
                        });
                    }
                );
            }
        );
    };

    handleRangeChange = delay => {
        this.setState({delay});
    };

    render() {
        return (
            <div>
                <Slider onRangeChange = {this.handleRangeChange}
                        delay         = {this.state.delay}
                />

                <p>Delay: {this.state.delay} ms</p>

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
                                    })()}
                        />;
                    })
                }
            </div>
        );
    }
}
