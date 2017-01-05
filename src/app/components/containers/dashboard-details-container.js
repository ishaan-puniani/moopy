import React from 'react';
import {connect} from 'react-redux';
import UserProfile from '../views/user-profile';
import DashboardMood from '../views/dashboard-mood';
import * as dashboardApi from '../../api/dashboard-api';
import store from '../../store';
import {
    dashboardMoodDetailsSuccess
} from '../../actions/dashboard-actions';

const DashboardDetailsContainer = React.createClass({
    selected: "-1",
    componentDidMount: function () {
    },
    onDateRangeChanges: function (start, end, old, selected) {
        let dashboardName = this.props.params.name;
        this.selected = selected;
        store.dispatch(dashboardMoodDetailsSuccess([]));
        dashboardApi.getMoodOverDuration(dashboardName, start, end, old);
    },
    componentWillUnmount() {
        store.dispatch(dashboardMoodDetailsSuccess([]));
    },
    render: function () {
        return (
            <div>
                <DashboardMood label={this.props.params.name} onDateRangeChanges={this.onDateRangeChanges}
                               moods={this.props.dashboardMoodDetails} selected={this.selected}
                />
            </div>
        );
    }

});

const mapStateToProps = function (store) {
    return {
        dashboardMoodDetails: store.dashboardState.dashboardMoodDetails
    };
};

export default connect(mapStateToProps)(DashboardDetailsContainer);
