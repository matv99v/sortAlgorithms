import React      from 'react';
import Bar        from './SortInstance/Bar.jsx';
import SortFooter from './SortInstance/SortFooter.jsx';

import asyncIteratorForward from '../utils/asyncIteratorForward';
import swapArrMembers       from '../utils/swapArrMembers';
import delayFuncPromise     from '../utils/delayFuncPromise';
import getRandomArray       from '../utils/getRandomArray';


export default class StupidSort extends React.Component {
    state = {
        delay           : 500,  // delay of iteration in ms
        array           : [],   // actual array to be sorted
        checkInd        : [],   // indexes that are currentrly checked
        status          : null, // [orderedPair, unorderedPair, swap, sorted]
        swaps           : 0,    // statistics
        compares        : 0     // statistics
    };

    // fill up array with random values in range [1; 100]
    componentWillMount = () => {
        this.setState({ array: getRandomArray(this.props.numOfElements) });
    };

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.isActive && nextProps.isActive) { // check if isActive changed
            this.setState({
                swaps    : 0,
                compares : 0
            });
            this.handleStartClick();
        }
        if (this.props.numOfElements !== nextProps.numOfElements) { // check if numOfElements changed
            this.setState({
                status   : null,
                array    : getRandomArray(nextProps.numOfElements),
                swaps    : 0,
                compares : 0
            });
        }
    };

    handleStartClick = () => {
        if (this.state.status === 'sorted') this.setState({ array: getRandomArray(this.props.numOfElements) });

        asyncIteratorForward(
            // number of iteration steps
            this.props.numOfElements - 1,

            // itreration body
            loop => {
                const iCurr        = loop.getIteration();
                const iNext        = iCurr + 1;
                const {array}      = this.state;
                const boundPromise = delayFuncPromise.bind(null, this.props.delay);

                boundPromise( () => { // compare two elements
                    this.setState({
                        checkInd : [iCurr, iNext],
                        status   : array[iCurr] > array[iNext] ? 'unorderedPair' : 'orderedPair',
                        compares : this.state.compares + 1
                    });
                })
                .then( () => { // action based upon comparison
                    if (this.state.status === 'unorderedPair') {
                        return boundPromise( () => {
                            this.setState({
                                array : swapArrMembers(this.state.array, this.state.checkInd),
                                swaps : this.state.swaps + 1,
                                status: 'swap'
                            });
                            loop.reset();
                        });
                    }
                })
                .then(loop.next); // next iteration
            },

            // iteration is  over
            () => {
                delayFuncPromise(this.props.delay, () => {
                    this.props.ifSorted();
                    this.setState({
                        checkInd : [],
                        status   : 'sorted'
                    });
                });
            }
        );
    };

    resolveBarColor = (i) => {
        if (this.state.checkInd.indexOf(i) !== -1) { // if i is present in this.state.checkInd
            switch (this.state.status) {
                case 'orderedPair'  : return '#53EA53';
                case 'unorderedPair': return '#f0ad4e';
                case 'swap'         : return '#c9302c';
                default             : return;
            }
        }
    };

    render() {
        return (
            <div style={{border: '1px solid #ccc'}}>
                        <div style={{textAlign: 'center'}}>Stupid sort</div>
                        {
                            this.state.array.map( (el, i) => <Bar amount    = {el}
                                                                  key       = {i}
                                                                  color     = {this.resolveBarColor(i)}
                                                                  className = {this.state.status === 'sorted'
                                                                      ? 'Bar__bar_sorted'
                                                                      : 'Bar__bar_unsorted'
                                                                  } />
                            )
                        }

                        <SortFooter delay    = {this.props.delay}
                                    compares = {this.state.compares}
                                    swaps    = {this.state.swaps}
                        />
            </div>
        );
    }
}
