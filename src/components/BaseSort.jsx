import React            from 'react';
import Bar              from './SortInstance/Bar.jsx';
import SortFooter       from './SortInstance/SortFooter.jsx';

import delayFuncPromise from '../utils/delayFuncPromise';

export default class BaseSort extends React.Component {
    state = {
        array    : [], // actual array to be sorted
        checkInd : [], // indexes that are currentrly checked
        status   : null, // [orderedPair, unorderedPair, swap, sorted]
        swaps    : 0, // statistics
        compares : 0 // statistics
    };

    // fill up array with random values in range [1; 100]
    componentWillMount = () => {
        this.setState({ array: [...this.props.elements] });
    };

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.isActive && nextProps.isActive) { // call children's method by parent
            delayFuncPromise(4, () => this.setState({
                swaps    : 0,
                compares : 0,
                array    : [...this.props.elements],
                status   : null
            })).then(() => delayFuncPromise(4, this.handleStartClick));
        }

        if (this.props.elements.length !== nextProps.elements.length) { // recieving new props.elements from parent
            this.setState({
                status   : null,
                array    : [...nextProps.elements],
                swaps    : 0,
                compares : 0
            });
        }
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
                        <div style={{textAlign: 'center'}}>{this.name}</div>
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
