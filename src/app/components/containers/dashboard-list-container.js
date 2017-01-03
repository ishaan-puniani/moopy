import React from 'react';
import {connect} from 'react-redux';
import DashboardList from '../views/dashboard-list';
import {getAllDashboards} from '../../api/dashboard-api';
import store from '../../store';
import {loadSearchLayout} from '../../actions/search-layout-actions';
import {Link} from 'react-router';

const DashboardListContainer = React.createClass({

    componentDidMount: function () {
        getAllDashboards();
        store.dispatch(loadSearchLayout('dashboards', 'Dashboards Results'));
    },
    subscribeDashboard: function () {
    },
    render: function () {
        return (
            <div>
                <div><a className="btn btn-primary btn-block"  href="/dashboards/create">Create New Dashboard</a></div>
                <br /><br />

                <DashboardList dashboards={this.props.dashboards}
                               moods={this.props.moods}
                               subscribe={this.subscribeDashboard}
                />
            </div>
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
