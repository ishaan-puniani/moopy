import React from 'react';
import {connect} from 'react-redux';
import UserProfile from '../views/user-profile';
import UserMood from '../views/user-mood';
import * as userApi from '../../api/user-api';

const UserProfileContainer = React.createClass({

    componentDidMount: function () {
        let userId = this.props.params.userId
        userApi.getProfile(userId)
    },
    onDateRangeChanges: function (start, end) {
        userApi.getMood(start, end);
    },
    render: function () {
        return (
            <div>
                <UserProfile {...this.props.profile} />
                <UserMood onDateRangeChanges={this.onDateRangeChanges} moods={this.props.moods}/>
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
