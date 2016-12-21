import React from 'react';
import {connect} from 'react-redux';
import DashboardList from '../views/dashboard-list';
import {getAllDashboards} from '../../api/dashboard-api';
import store from '../../store';
import {loadSearchLayout} from '../../actions/search-layout-actions';

const DashboardListContainer = React.createClass({

    componentDidMount: function () {
        getAllDashboards();
        store.dispatch(loadSearchLayout('dashboards', 'Dashboards Results'));
    },
    subscribeDashboard: function () {
    },
    render: function () {
        debugger;
        return (
            <DashboardList dashboards={this.props.dashboards}
                           moods={this.props.moods}
                           subscribe={this.subscribeDashboard}
            />
        );
    }

});

const mapStateToProps = function (store) {
    return {
        dashboards: store.dashboardState.dashboards,
        moods: store.dashboardState.moods
    };
};

export default connect(mapStateToProps)(DashboardListContainer);
