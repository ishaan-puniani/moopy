import React from 'react';
import {connect} from 'react-redux';
import SearchLayout from '../layouts/search-layout';

const mapStateToProps = function (store) {

    let searchType = store.searchLayoutState.searchType;
    let totalResults = 0;

    switch (searchType) {
        case 'users': {
            totalResults = store.userState.users.length;
            break
        }
        case 'widgets': {
            totalResults = store.widgetState.widgets.length;
            break
        }
        case 'dashboards': {
            totalResults = store.dashboardState.dashboards.length;
            break
        }
    }
    return {
        searchType,
        title: store.searchLayoutState.title,
        totalResults
    };

};

export default connect(mapStateToProps)(SearchLayout);
