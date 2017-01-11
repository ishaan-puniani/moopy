import React from 'react';
import {connect} from 'react-redux';
import UserProfile from '../views/user-profile';
import UserMood from '../views/user-mood';
import * as userApi from '../../api/user-api';
import store from '../../store';
import {
    userMoodsSuccess
} from '../../actions/user-actions';
import {getDashboardInCallback} from '../../api/dashboard-api';
import {browserHistory} from 'react-router'


const UserProfileContainer = React.createClass({
    selected: "-1",
    componentDidMount: function () {
        let userId = this.props.params.userId;
        //userApi.getMoodOverDuration(userId, start, end);
        userApi.getUserProfile(userId)
        getDashboardInCallback(userId, function (data) {
            if (data._id) {
                var dashboardDetails = "/dashboards/" + data.name;
                browserHistory.push(dashboardDetails);
            }else{
                userApi.getMoodOverDuration(userId, "", "", 30);
            }
        })
    },
    onDateRangeChanges: function (start, end, old, selected) {
        let userId = this.props.params.userId;
        this.selected = selected;
        userApi.getMoodOverDuration(userId, start, end, old);
    },
    componentWillUnmount() {
        store.dispatch(userMoodsSuccess([]));
    },
    render: function () {
        return (
            <div>
                <UserProfile {...this.props.profile} />
                <UserMood label={this.props.params.userId} onDateRangeChanges={this.onDateRangeChanges}
                          moods={this.props.moods} selected={this.selected}
                />
            </div>
        );
    }

});

const mapStateToProps = function (store) {
    return {
        profile: store.userState.userProfile,
        moods: store.userState.userMoods

    };
};

export default connect(mapStateToProps)(UserProfileContainer);
