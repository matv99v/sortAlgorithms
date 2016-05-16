import React from 'react';
import Bar   from './Bar.jsx';

import asyncIterator    from '../utils/asyncIterator';
import swapArrMembers   from '../utils/swapArrMembers';
import delayFuncPromise from '../utils/delayFuncPromise';

export default class App extends React.Component {
    state = {
        delay: 1000,
        numOfElements: 25,
        array: [],
        checkInd: [],
        status: null
    };

    componentWillMount = () => { // fill up array with random values
        let i = this.state.numOfElements;
        const array = [];

        while (i) {
            --i;
            const rndNum = Math.floor(Math.random() * 100);
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
                const cInd = loop.getIteration();
                const nInd = cInd + 1;
                const {array} = this.state;

                delayFuncPromise(() => {
                    this.setState({
                        status  : array[cInd] > array[nInd] ? 'swap' : 'iterate',
                        checkInd: [cInd, nInd]
                    });
                }, this.state.delay)
                .then(() => {
                    console.log(`${cInd} - [${array[cInd]}, ${array[nInd]}] ${this.state.status}`);
                })
                .then(loop.next);
            },

            // iteration is  over
            () => {
                console.log('done');
            }

        );
    };

    render() {
        return (
            <div>
                {
                    this.state.array.map( (el, i) => {
                        return <Bar amount = {el}
                                    key    = {i}
                                    color  = {el.color}
                        />;
                    })
                }
            </div>
        );
    }
}
