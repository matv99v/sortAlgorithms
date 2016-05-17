import React  from 'react';
import Bar    from './Bar.jsx';
import StupidSort from './StupidSort.jsx';
import StupidSortEugene from './StupidSortEugene.jsx';



export default class App extends React.Component {

    render() {
        return (
            <div>
                <StupidSort />
                <StupidSortEugene />
            </div>
        );
    }
}
