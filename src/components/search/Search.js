import React, { Component } from 'react';
import './search.css';
import axios from 'axios';
import Suggestions from '../suggestions/Suggestions.js';

const APIURL = `${process.env.REACT_APP_API_URL}/suggest`;

class Search extends Component {

    state = {
        query: '',
        results: []
    }


    componentDidMount() {
        this.search.focus()
    }

    getResults = () => {
        axios.get(`${APIURL}/${this.state.query}`).then(
            (data) => {
                this.setState({ results: data.data });
            }
        )
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getResults()
            }

        })
    }

    render() {
        console.log(APIURL);
        return (
            <React.Fragment>
                <form className="search-form center">
                    <input
                        placeholder="Search artists and topics here..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                </form>
                <div style={{ marginTop: '20px' }}>
                    <Suggestions results={this.state.results} />
                </div>
            </React.Fragment>
        );
    }
}

export default Search;