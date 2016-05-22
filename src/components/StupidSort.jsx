import BaseSort             from './BaseSort.jsx';

import asyncIteratorForward from '../utils/asyncIteratorForward';
import swapArrMembers       from '../utils/swapArrMembers';
import delayFuncPromise     from '../utils/delayFuncPromise';

export default class StupidSort extends BaseSort {
    name = 'Stupid sort';

    handleStartClick = () => {
        // if (this.state.status === 'sorted') this.resetState();

        asyncIteratorForward(
            // number of iteration steps
            this.props.elements.length - 1,

            // itreration body
            loop => {
                const iCurr        = loop.getIteration();
                const iNext        = iCurr + 1;
                const array        = this.state.array;
                const boundPromise = delayFuncPromise.bind(null, this.props.delay);

                boundPromise( () => { // compare two elements
                    // console.log(array[iCurr], array[iNext]);
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
}
