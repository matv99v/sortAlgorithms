import React          from 'react';
import Bar            from './SortInstance/Bar.jsx';
import SortFooter     from './SortInstance/SortFooter.jsx';

// import getRandomArray from '../utils/getRandomArray';

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
        if (!this.props.isActive && nextProps.isActive) { // check if isActive changed
            this.setState({
                swaps    : 0,
                compares : 0
            });
            this.handleStartClick();
        }
        if (this.props.elements.length !== nextProps.elements.length) { // check if new elements changed
            this.setState({
                status   : null,
                array    : [...nextProps.elements],
                swaps    : 0,
                compares : 0
            });
        }
    };

    resetState = () => {
        if (this.state.status === 'sorted') this.setState({
            array : [...this.props.elements],
            status: null
        });
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
