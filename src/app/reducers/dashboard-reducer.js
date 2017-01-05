import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    dashboards: [],
    dashboard: {
        children: []
    },
    users: undefined,
    moods: {},
    dashboardMoodDetails: []
};

const dashboardReducer = function (state = initialState, action) {
    switch (action.type) {

        case types.GET_ALL_DASHBOARDS:
            return Object.assign({}, state, {dashboards: action.dashboards});

        case types.GET_DASHBOARD:
            return Object.assign({}, state, {dashboard: action.dashboard});

        case types.SET_DASHBOARD_USERS_FOR_MOOD_SYNC:
            const mergedUsers = _.union(state.users, action.users);
            return Object.assign({}, state, {users: mergedUsers});

        case types.GET_DASHBOARD_USERS_FOR_MOOD_SYNC:
            let userMoods = action.moods;
            return Object.assign({}, state, {moods: userMoods});


        case types.GET_DASHBOARD_MOOD_DETAILS:
            let usersMoods = action.moods;
            return Object.assign({}, state, {dashboardMoodDetails: usersMoods});


        case types.DELETE_WIDGET_SUCCESS:

            // Use lodash to create a new widget array without the widget we want to remove
            const newWidgets = _.filter(state.widgets, widget => widget.id != action.widgetId);
            return Object.assign({}, state, {widgets: newWidgets})


    }

    return state;

}

export default dashboardReducer;
