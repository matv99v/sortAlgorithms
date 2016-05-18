import React  from 'react';
import Bar    from './SortInstance/Bar.jsx';
import SortHeader from './SortInstance/SortHeader.jsx';
import SortFooter from './SortInstance/SortFooter.jsx';

import asyncIterator    from '../utils/asyncIterator';
import swapArrMembers   from '../utils/swapArrMembers';
import delayFuncPromise from '../utils/delayFuncPromise';

export default class StupidSort extends React.Component {
    state = {
        delay        : 250,
        numOfElements: 25,
        array        : [],
        checkInd     : [],
        status       : null,
        swaps        : 0,
        compares     : 0
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

    handleStartClick = () => {

        asyncIterator(
            // number of iteration steps
            this.state.numOfElements - 1,

            // itreration body
            loop => {
                const iCurr        = loop.getIteration();
                const iNext        = iCurr + 1;
                const {array}      = this.state;
                const boundPromise = delayFuncPromise.bind(null, this.state.delay);


                boundPromise( () => { // compare two elements
                    this.setState({
                        checkInd: [iCurr, iNext],
                        status  : array[iCurr] > array[iNext] ? 'swap' : 'iterate',
                        compares: this.state.compares + 1
                    });
                })
                .then( () => { // action based upon comparison
                    if (this.state.status === 'swap') {
                        return boundPromise( () => {
                            this.setState({
                                array: swapArrMembers(this.state.array, this.state.checkInd),
                                swaps: this.state.swaps + 1,
                                status: 'swapping'
                            });
                            loop.reset();
                        });
                    }
                })
                .then(loop.next); // next iteration
            },

            // iteration is  over
            () => {
                delayFuncPromise(this.state.delay, () => {
                    this.setState({
                        checkInd: [],
                        status  : 'sorted'
                    });
                });
            }
        );
    };

    handleRangeChange = delay => {
        this.setState({delay});
    };

    render() {
        return (
            <section style={{border: '1px solid #ccc', borderRadius: '10px'}}>
                <SortHeader sortName      = 'Stupid sort'
                            onChangeRange = {this.handleRangeChange}
                            onStartClick  = {this.handleStartClick}
                            delay         = {this.state.delay}
                            status        = {this.state.status}
                />

                {
                    this.state.array.map( (el, i) => {
                        return <Bar amount = {el}
                                    key    = {i}
                                    color  = {(() => {
                                        if (this.state.status === 'iterate'  && this.state.checkInd.indexOf(i) !== -1) {
                                            return '#f0ad4e';
                                        }
                                        if (this.state.status === 'swap'     && this.state.checkInd.indexOf(i) !== -1) {
                                            return '#c9302c';
                                        }
                                        if (this.state.status === 'swapping' && this.state.checkInd.indexOf(i) !== -1) {
                                            return '#53EA53';
                                        }
                                        if (this.state.status === 'sorted') {
                                            return '#286090';
                                        }
                                    })()}
                        />;
                    })
                }

                <SortFooter delay         = {this.state.delay}
                            compares      = {this.state.compares}
                            swaps         = {this.state.swaps}
                />

            </section>
        );
    }
}
