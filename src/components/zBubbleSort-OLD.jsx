import BaseSort             from './BaseSort.jsx';

import asyncIteratorForward from '../utils/asyncIteratorForward';
import asyncIteratorBack    from '../utils/asyncIteratorBack';
import swapArrMembers       from '../utils/swapArrMembers';
import delayFuncPromise     from '../utils/delayFuncPromise';

export default class BubbleSort extends BaseSort {
    name = 'Bubble sort';

    handleStartClick = () => {
        let i = this.props.elements.length;

        asyncIteratorBack(
            // number of outer iteration steps
            this.props.elements.length - 1,

            // outer itreration body
            loopBack => {
                asyncIteratorForward(
                    // number of inner iteration steps
                    --i,

                    // inner itreration body
                    loopForward => {
                        const iCurr        = loopForward.getIteration();
                        const iNext        = iCurr + 1;
                        const array        = this.state.array;
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
                                });
                            }
                        })
                        .then(loopForward.next); // next inner iteration
                    },

                    loopBack.next // inner iteration is  over, calling next outer iteration
                );
            },

            // outer itreration is over
            () => {
                delayFuncPromise(this.props.delay, () => {
                    this.props.notifyParentIfSorted();
                    this.setState({
                        checkInd : [],
                        status   : 'sorted'
                    });
                });
            }
        );
    };
}
