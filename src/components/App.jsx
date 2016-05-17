import React  from 'react';
import Bar    from './Bar.jsx';
import StupidSort from './StupidSort.jsx';
import BubbleSort from './BubbleSort.jsx';



export default class App extends React.Component {

    render() {
        return (
            <div>
                <StupidSort />
                <BubbleSort />
            </div>
        );
    }
}
