import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../views/dashboard';
import {getDashboard} from '../../api/dashboard-api';

const DashboardContainer = React.createClass({

    componentDidMount: function () {
        debugger;

        let name = this.props.params.name;

        getDashboard(name);
    },

    render: function () {
        return (
            <Dashboard {...this.props.dashboard} />
        );
    }

});

const mapStateToProps = function (store) {
    return {
        dashboard: store.dashboardState.dashboard
    };
};

export default connect(mapStateToProps)(DashboardContainer);
