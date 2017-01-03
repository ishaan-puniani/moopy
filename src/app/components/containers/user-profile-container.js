import React from 'react';
import {connect} from 'react-redux';
import UserProfile from '../views/user-profile';
import UserMood from '../views/user-mood';
import * as userApi from '../../api/user-api';

const UserProfileContainer = React.createClass({
    selected: "-1",
    componentDidMount: function () {
        let userId = this.props.params.userId;
        //userApi.getMoodOverDuration(userId, start, end);
        userApi.getUserProfile(userId)
    },
    onDateRangeChanges: function (start, end, old, selected) {
        let userId = this.props.params.userId;
        this.selected = selected;
        userApi.getMoodOverDuration(userId, start, end, old);
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
