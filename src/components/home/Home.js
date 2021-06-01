import React, { Component } from 'react';
import Search from '../search/Search';
import './home.css';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                    <div className="parent">
                        <div className="search-box center">
                            <Search />
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default Home;