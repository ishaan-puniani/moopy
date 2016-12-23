import React from 'react';
import SearchFormContainer from '../containers/search-form-container';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="search">
            <header className="search-header">
                {props.title}
                <SearchFormContainer searchType={props.searchType}/>
                <div>Showing {props.totalResults} items</div>
            </header>
            <div className="search-results">
                {props.children}
            </div>
            <footer className="search-footer">

            </footer>
        </div>
    );
}
