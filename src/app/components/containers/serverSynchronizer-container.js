/**
 * Created by ishaan.puniani on 2016-12-04.
 */

import React from 'react';
import {connect} from 'react-redux';
import * as userApi from '../../api/user-api';
import * as dashboardApi from '../../api/dashboard-api';
import store from '../../store';
import {loadSearchLayout} from '../../actions/search-layout-actions';

const SynchronizerContainer = React.createClass({
    syncTriggered: false,
    componentDidMount: function () {
        const me = this;
        if (!me.syncTriggered) {
            setInterval(function () {
                if(me.props.usersForMoodSynch){
                    dashboardApi.getMoods(me.props.usersForMoodSynch);
                }
            }, 5000)
        }
    },

    render: function () {
        return (
            <div></div>
        );
    }

});

const mapStateToProps = function (store) {
    return {
        users: store.userState.users,
        usersForMoodSynch: store.dashboardState.users
    };
};

export default connect(mapStateToProps)(SynchronizerContainer);