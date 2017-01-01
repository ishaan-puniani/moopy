import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../views/dashboard';
import {getDashboard} from '../../api/dashboard-api';

const DashboardContainer = React.createClass({

    componentDidMount: function () {
        let name = this.props.params.name;

        getDashboard(name);
    },

    render: function () {
        return (
            <Dashboard
                dashboard={this.props.dashboard}
                moods={this.props.moods}
            />
        );
    }

});

const mapStateToProps = function (store) {
    return {
        dashboard: store.dashboardState.dashboard,
        moods: store.dashboardState.moods
    };
};

export default connect(mapStateToProps)(DashboardContainer);
