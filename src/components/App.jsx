import React from 'react';
import Bar from './Bar.jsx';

export default class App extends React.Component {
    state = {
        delay: 25,
        numOfElements: 50,
        array: [],
        checkInd: [],
        status: null
    };

    delayPromise = func => {
        return new Promise(resolve => {
            setTimeout( () => {
                func();
                resolve();
            }, this.state.delay);
        });
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
        this.asyncLoop(
            this.state.numOfElements,
            this.processIteration,
            () => {
                this.setState({status: 'finished', checkInd: [] });
            }
        );
    };

    processIteration = loop => {
        const iterationInd = loop.getIteration();
        const compareInd   = iterationInd - 1;
        this.setState({checkInd: [compareInd, iterationInd]});

        const swapping = () => {
            const array = this.swap(compareInd, iterationInd);
            this.setState({array});
        };

        if (this.state.array[compareInd] > this.state.array[iterationInd]) { // compare elements
            this.setState({status: 'swap'});
            this.delayPromise(swapping).then(loop.reset).then(loop.next);
        } else {
            this.setState({status: 'iterate'});
            this.delayPromise(loop.next);
        }
    }

    asyncLoop = (iterations, mainWorkFunc, callback) => {
        let index = 1;
        let done  = false;

        const loop = {
            next() {
                if (done) {
                    return;
                }
                if (index < iterations) {
                    index++;
                    mainWorkFunc(loop);
                } else {
                    done = true;
                    callback(); // eslint-disable-line
                }
            },
            getIteration() {
                return index - 1;
            },
            break() {
                done = true;
                callback();
            },
            reset() {
                index = 1;
            }
        };

        loop.next();
        return loop;
    };

    swap = (p, c) => {
        const array = [...this.state.array];
        const buffer = array[p];
        array[p] = array[c];
        array[c] = buffer;
        return array;
    };

    getColor = (i) => {
        if (this.state.checkInd.indexOf(i) > -1) {

            switch (this.state.status) {
                case 'iterate':
                    return 'yellow';
                case 'swap':
                    return 'red';
                default:
                    return;
            }

        }
    };

    render() {
        return (
            <div>
                {
                    this.state.array.map( (el, i) => {
                        return <Bar amount = {el}
                                    color  = {this.getColor(i)}
                                    key    = {i}
                        />;
                    })
                }
            </div>
        );
    }
}
