import BaseSort             from './BaseSort.jsx';
import iterator             from '../utils/iterator';
import swapArrMembers       from '../utils/swapArrMembers';
import delayFuncPromise     from '../utils/delayFuncPromise';

export default class StupidSort extends BaseSort {
    name = 'Stupid sort';

    handleStartClick = () => {

        iterator(
            // init value
            0,

            // final value
            this.props.elements.length - 2,

            // iteration body
            loop => {
                const iCurr        = loop.getIteration();
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
                            loop.resetIndexToInit();
                        });
                    }
                })
                .then(loop.next); // next iteration
            },

            // callback function when iteration finishes
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
    }
}
